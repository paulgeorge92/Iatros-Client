import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Modal, PageHeader, Row, Select, Space, Typography } from 'antd';
import { HomeFilled, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import Breadcrumb, { BreadcrumbItem } from '../../../../components/Breadcrumb';
import { AdminMenuItems, AdminPath } from '../../../../constants';
import { Medicine } from '../../../../models/Medicine';
import { MedicinePurchase } from '../../../../models/MedicinePurchase';
import { Supplier } from '../../../../models/Supplier';
import { Tax } from '../../../../models/Tax';
import { MedicineRepository } from '../../../../repository/MedicineRepository';
import { PurchaseRepository } from '../../../../repository/PurchaseRepository';
import { SuppliersRepository } from '../../../../repository/SuppliersRepository';
import { TaxRepository } from '../../../../repository/TaxRepository';
import TextArea from 'antd/lib/input/TextArea';
import { MedicineBatch } from '../../../../models/Batch';
import moment from 'moment';
import { AdminContext } from '../../../../contexts/AdminContext';
import './style.css';

const FormItem = Form.Item;
const { Title, Text } = Typography;
const { Option } = Select;

interface props {
  id?: number;
  location?: any;
}

const PurchaseForm = (props: props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const history = useHistory();
  const dummyPurchase: MedicinePurchase = {
    Amount: 0,
    DiscountAmount: 0,
    DiscountType: '%',
    ID: -1,
    Note: '',
    PurchaseDate: new Date(),
    TaxAmount: 0,
    Total: 0,
    Batch: [],
  };

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [purchase, setPurchase] = useState<MedicinePurchase>(dummyPurchase);
  const [formType, setFormType] = useState<'Add' | 'Update'>('Add');
  const [subTotal, setSubTotal] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [breadcrumbItems, setbreadcrumbItems] = useState<BreadcrumbItem[]>([
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Purchases',
      link: AdminPath + '/' + AdminMenuItems.getMenu('Purchases')?.path,
    },
    {
      title: 'Update Purchase',
    },
  ]);

  const supplierDB = new SuppliersRepository();
  const taxDB = new TaxRepository();
  const medicineDB = new MedicineRepository();
  const purchaseDB = new PurchaseRepository();

  const appSettings = useContext(AdminContext).context.settings;

  async function loadDependencies() {
    try {
      setSuppliers(await supplierDB.getAll());
      setMedicines(await medicineDB.getAll());
      setTaxes(await taxDB.getAll());
    } catch (error) {}
  }

  function goBack() {
    history.push(AdminPath + '/' + AdminMenuItems.getMenu('Purchases')?.path);
  }

  async function getPurchase(id: number) {
    try {
      id = parseInt(id.toString());
      let _purchase = await purchaseDB.get(id);
      setPurchase({ ..._purchase });
      let batches: any = [..._purchase.Batch];
      if (batches.length) {
        batches.forEach((batch: any) => {
          batch.Expiry = moment(batch.Expiry);
        });
      }
      setFinalAmount(_purchase.Amount);
      setTotalTax(_purchase.TaxAmount);
      setSubTotal(computeSubTotal(_purchase.Batch));
      form.setFieldsValue({ ..._purchase, PurchaseDate: moment(_purchase.PurchaseDate), Batch: batches });
    } catch (err) {
      Modal.error({
        title: 'Error',
        content: err.toString(),
      });
      goBack();
    }
  }

  function computeTaxAndPrice(batchKey: number): number {
    let tax = 0;

    let batches: MedicineBatch[] = form.getFieldValue('Batch');
    if (batches && batches.length) {
      let batch = batches[batchKey];
      let purchasePrice = computePrice(batchKey);
      batch.Price = purchasePrice;
      if (batch && batch.TaxID) {
        let Tax = taxes.find((x) => x.ID === batch.TaxID);
        tax = (purchasePrice * (Tax?.Rate || 0)) / 100;
        batch.TaxPrice = tax;
      }
    }
    computeSubTotal(batches);
    computeTotalTax(batches);
    computeFinalAmount(batches);
    form.setFieldsValue({ Batch: [...batches], Amount: finalAmount, TaxAmount: totalTax });
    return tax;
  }

  function computePrice(batchKey: number): number {
    let price = 0;
    let batches: MedicineBatch[] = form.getFieldValue('Batch');
    let batch = batches[batchKey];
    if (batch) {
      let { Quantity, PurchasePrice } = batch;
      Quantity = Quantity || 0;
      PurchasePrice = PurchasePrice || 0;
      price = PurchasePrice * Quantity;
    }
    return price;
  }

  function computeSubTotal(batches?: MedicineBatch[]) {
    let price = 0;
    batches = batches || form.getFieldValue('Batch');
    if (batches && batches.length) {
      price = batches.reduce((a, b) => a + (b.Price || 0), price);
    }
    setSubTotal(price);
    return price;
  }

  function computeTotalTax(batches?: MedicineBatch[]) {
    let tax = 0;
    batches = batches || form.getFieldValue('Batch');
    if (batches && batches.length) {
      tax = batches.reduce((a, b) => a + (b.TaxPrice || 0), tax);
    }
    setTotalTax(tax);
    return tax;
  }

  function computeFinalAmount(batches?: MedicineBatch[]) {
    let totalAmount = computeSubTotal(batches);
    let TotalTax = computeTotalTax(batches);
    let finalAmount = totalAmount + TotalTax;
    let discountType = form.getFieldValue('DiscountType');
    let discountAmount = form.getFieldValue('DiscountAmount') || 0;
    if (discountType === '%') {
      finalAmount = finalAmount - (finalAmount * discountAmount) / 100;
    } else if (discountType === 'Flat') {
      finalAmount = finalAmount - discountAmount;
    }
    setFinalAmount(finalAmount);
    form.setFieldsValue({ Amount: finalAmount });
    return finalAmount;
  }

  async function onFormSubmit() {
    try {
      await form.validateFields();
      try {
        let formData = form.getFieldsValue();
        if (!formData.Batch || formData.Batch.length === 0) {
          Modal.error({
            title: 'Error',
            content: 'Please enter medicine details',
          });
        } else {
          var batches: MedicineBatch[] = [...formData.Batch];
          let supplierName = suppliers.find((x) => x.ID === formData.Supplier)?.Name;
          batches.forEach((batch: any) => {
            batch.Expiry = batch.Expiry.toDate();
            batch.PackageQuantity = parseFloat(batch.PackageQuantity);
            batch.Quantity = parseFloat(batch.Quantity);
            batch.PurchasePrice = parseFloat(batch.PurchasePrice);
            batch.SalePrice = parseFloat(batch.SalePrice);
          });
          let purchaseData: MedicinePurchase = { ...formData, DiscountAmount: parseFloat(formData.DiscountAmount), Amount: finalAmount, TaxAmount: totalTax, Batch: batches, PurchaseDate: formData.PurchaseDate.toDate(), SupplierName: supplierName, Total: subTotal };
          if (formType === 'Add') {
            await purchaseDB.add(purchaseData);
          } else {
            await purchaseDB.update(purchaseData, purchase.ID);
          }
          goBack();
        }
      } catch (err) {
        Modal.error({
          title: 'Error',
          content: err.toString(),
        });
      }
    } catch (err) {
      console.log(err);
      Modal.error({
        title: 'Error',
        content: 'Please fill all mandatory fields',
      });
    }
  }

  useEffect(() => {
    loadDependencies();
    if (props && props.id) {
      setFormType('Update');
      getPurchase(props.id);
    } else if (props && props.location?.state?.id) {
      setFormType('Update');
      getPurchase(props.location?.state?.id);
    } else if (id) {
      setFormType('Update');
      getPurchase(id);
    } else {
      let _breadcrumbItems = [...breadcrumbItems];
      _breadcrumbItems[2].title = 'New Purchase';
      setbreadcrumbItems([..._breadcrumbItems]);

      setFormType('Add');
      setTimeout(() => {
        form.setFieldsValue({ ...purchase, PurchaseDate: moment(purchase.PurchaseDate) });
      }, 500);
    }
    /* eslint-disable-next-line */
  }, []);

  return (
    <>
      <PageHeader className="page-title no-print" title={`${formType} Purchase`} subTitle={<Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>}></PageHeader>

      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Card className="card-container">
            <Form layout="vertical" scrollToFirstError={true} form={form}>
              <Space size="large" direction="vertical" style={{ width: '100%' }}>
                <Row gutter={[24, 0]}>
                  <Col xs={24} md={12}>
                    <FormItem name="Supplier" label="Supplier" rules={[{ required: true, message: 'Please select a supplier' }]}>
                      <Select placeholder="Select Supplier" size="large">
                        {suppliers.map((supplier) => (
                          <Option value={supplier.ID} key={supplier.ID}>
                            {supplier.Name}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <FormItem name="PurchaseDate" label="Purchase Date" rules={[{ required: true, message: 'Please Select a valide date' }]}>
                      <DatePicker
                        size="large"
                        format="DD MMMM YYYY"
                        onChange={(date, dateString) => {
                          setPurchase({ ...purchase, PurchaseDate: date?.toDate() || new Date() });
                        }}
                      ></DatePicker>
                    </FormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <FormItem name="Note" label="Notes">
                      <TextArea
                        rows={6}
                        onChange={(e) => {
                          setPurchase({ ...purchase, Note: e.target.value });
                        }}
                      ></TextArea>
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={[0, 16]}>
                  <Col xs={24}>
                    <Title level={4}>Medicines</Title>
                  </Col>
                  <Form.List name="Batch">
                    {(batches, { add, remove }) => (
                      <Col xs={24}>
                        {batches.map((batch, index) => (
                          <Card style={{ marginBottom: 30 }} key={batch.key}>
                            <CloseCircleOutlined
                              className="delete-item-icon"
                              onClick={() => {
                                remove(batch.key);
                                computeFinalAmount();
                              }}
                            ></CloseCircleOutlined>
                            <Row gutter={[12, 16]} key={batch.key}>
                              <Col xs={24} md={12}>
                                <FormItem label="Medicine" name={[batch.name, 'MedicineID']} fieldKey={[batch.fieldKey, 'MedicineID']} rules={[{ required: true, message: 'Please select a medicine' }]}>
                                  <Select size="large">
                                    {medicines.map((medicine) => (
                                      <Option value={medicine.ID} key={`${batch.key}-${medicine.ID}`}>
                                        {medicine.Name}
                                      </Option>
                                    ))}
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col xs={24} md={12}>
                                <Row gutter={[12, 0]}>
                                  <Col xs={24} md={12}>
                                    <FormItem label="Batch No" name={[batch.name, 'Batch']} fieldKey={[batch.fieldKey, 'Batch']} rules={[{ required: true, message: 'Please enter the batch number' }]}>
                                      <Input type="text" size="large" placeholder="Batch Number"></Input>
                                    </FormItem>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <FormItem label="Expiry Date" name={[batch.name, 'Expiry']} fieldKey={[batch.fieldKey, 'Expiry']} rules={[{ required: true, message: 'Please select an expiry date' }]}>
                                      <DatePicker
                                        size="large"
                                        picker="month"
                                        format="MMMM YYYY"
                                        disabledDate={(currentDate) => {
                                          return moment().month() > currentDate.month() && moment().year() >= currentDate.year();
                                        }}
                                      ></DatePicker>
                                    </FormItem>
                                  </Col>
                                </Row>
                              </Col>
                              <Col xs={24} lg={12}>
                                <Row gutter={[12, 0]}>
                                  <Col xs={24} md={12} lg={6}>
                                    <FormItem label="Package Quantity" name={[batch.name, 'PackageQuantity']} fieldKey={[batch.fieldKey, 'PackageQuantity']}>
                                      <Input type="number" size="large" placeholder="Package Quantity" min={0}></Input>
                                    </FormItem>
                                  </Col>
                                  <Col xs={24} md={12} lg={6}>
                                    <FormItem label="Quantity" name={[batch.name, 'Quantity']} fieldKey={[batch.fieldKey, 'Quantity']} rules={[{ required: true, message: 'Please enter the quantity' }]}>
                                      <Input
                                        type="number"
                                        size="large"
                                        placeholder="Quantity"
                                        min={0}
                                        onChange={() => {
                                          computeTaxAndPrice(batch.key);
                                        }}
                                      ></Input>
                                    </FormItem>
                                  </Col>
                                  <Col xs={24} md={12} lg={6}>
                                    <FormItem label="Buying Price" name={[batch.name, 'PurchasePrice']} fieldKey={[batch.fieldKey, 'PurchasePrice']} rules={[{ required: true, message: 'Please enter the buying price' }]}>
                                      <Input
                                        type="number"
                                        size="large"
                                        placeholder="Buying Price"
                                        min={0}
                                        prefix={<Text>{appSettings.Currency}</Text>}
                                        onChange={() => {
                                          computeTaxAndPrice(batch.key);
                                        }}
                                      ></Input>
                                    </FormItem>
                                  </Col>
                                  <Col xs={24} md={12} lg={6}>
                                    <FormItem label="Sale Price" name={[batch.name, 'SalePrice']} fieldKey={[batch.fieldKey, 'SalePrice']} rules={[{ required: true, message: 'Please enter the selling price' }]}>
                                      <Input type="number" size="large" placeholder="Sale Price" min={0} prefix={<Text>{appSettings.Currency}</Text>}></Input>
                                    </FormItem>
                                  </Col>
                                </Row>
                              </Col>
                              <Col xs={24} lg={12}>
                                <Row gutter={[12, 0]}>
                                  <Col xs={24} md={12}>
                                    <FormItem label="Tax" name={[batch.name, 'TaxID']} fieldKey={[batch.fieldKey, 'TaxID']}>
                                      <Select
                                        size="large"
                                        placeholder="Select Tax"
                                        onChange={() => {
                                          computeTaxAndPrice(batch.key);
                                        }}
                                      >
                                        {taxes.map((tax) => (
                                          <Option value={tax.ID} key={`${batch.key}-${tax.ID}`}>{`${tax.Name} (${tax.Rate})`}</Option>
                                        ))}
                                      </Select>
                                    </FormItem>
                                  </Col>
                                  <Col xs={24} md={6}>
                                    <FormItem label="Tax Amount" name={[batch.name, 'TaxPrice']} fieldKey={[batch.fieldKey, 'TaxPrice']}>
                                      <Input type="number" size="large" placeholder="0" disabled={true} min={0} prefix={<Text>{appSettings.Currency}</Text>}></Input>
                                    </FormItem>
                                  </Col>
                                  <Col xs={24} md={6}>
                                    <FormItem label="Price" name={[batch.name, 'Price']} fieldKey={[batch.fieldKey, 'Price']}>
                                      <Input type="number" size="large" placeholder="0" disabled={true} min={0} prefix={<Text>{appSettings.Currency}</Text>}></Input>
                                    </FormItem>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Card>
                        ))}
                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                          Add Item
                        </Button>
                      </Col>
                    )}
                  </Form.List>
                </Row>
              </Space>
              <Row gutter={[24, 12]} align="middle" justify="end" className="purchase-summary">
                <Col xs={12} md={6} lg={3}>
                  <Text>Sub Total</Text>
                </Col>
                <Col xs={12} md={6}>
                  <Text strong={true}>
                    {appSettings.Currency} {subTotal.toFixed(2)}
                  </Text>
                </Col>
              </Row>
              <Row gutter={[24, 12]} align="middle" justify="end" className="purchase-summary">
                <Col xs={12} md={6} lg={3}>
                  <Text>Total Tax</Text>
                </Col>
                <Col xs={12} md={6}>
                  <Text strong={true}>
                    {appSettings.Currency} {totalTax.toFixed(2)}
                  </Text>
                </Col>
              </Row>
              <Row gutter={[24, 12]} align="middle" justify="end" className="purchase-summary">
                <Col xs={12} md={6} lg={3}>
                  <Text>Discount </Text>
                  <FormItem name="DiscountType" noStyle>
                    <Select
                      size="small"
                      onChange={() => {
                        computeFinalAmount();
                      }}
                    >
                      <Option value="%">%</Option>
                      <Option value="Flat">Flat</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col xs={12} md={6}>
                  <FormItem name="DiscountAmount" noStyle>
                    <Input
                      size="small"
                      onChange={() => {
                        computeFinalAmount();
                      }}
                      prefix={<Text>{appSettings.Currency}</Text>}
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={[24, 12]} align="middle" justify="end" className="purchase-summary">
                <Col xs={12} md={6} lg={3}>
                  <Text>Total Amount</Text>
                </Col>
                <Col xs={12} md={6}>
                  <Text strong={true}>
                    {appSettings.Currency} {finalAmount.toFixed(2)}
                  </Text>
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                <Button type="primary" onClick={onFormSubmit}>
                  {formType} Purchase
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PurchaseForm;
