import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Input, Form, Select, Typography, Modal, Button, Space } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import Breadcrumb, { BreadcrumbItem } from '../../../../components/Breadcrumb';
import { useParams, useHistory } from 'react-router-dom';
import { Medicine } from '../../../../models/Medicine';
import { MedicineCategory } from '../../../../models/MedicineCategory';
import { MedicineRepository } from '../../../../repository/MedicineRepository';
import { MedicineCategoryRepository } from '../../../../repository/MedicineCategoryRepository';
import { AdminMenuItems, AdminPath } from '../../../../constants';
import { BuildingIcon, CapsulesIcon } from '../../../../CustomIcons';
import TextArea from 'antd/lib/input/TextArea';

const { Title } = Typography;
const FormItem = Form.Item;
const { Option } = Select;

interface props {
  id?: number;
  location?: any;
}
const MedicineForm = (props: props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const history = useHistory();

  const _dummyMedicine: Medicine = {
    CategoryID: 1,
    Company: '',
    Genreic: '',
    Group: '',
    ID: -1,
    MinLevel: 0,
    Name: '',
    Note: '',
    ReOrderLevel: 0,
    StroeBox: '',
    Unit: '',
    UnitPerPacking: 0,
  };

  const medicineDB = new MedicineRepository();
  const categoryDB = new MedicineCategoryRepository();
  const [medicine, setMedicine] = useState<Medicine>(_dummyMedicine);
  const [categories, setCategories] = useState<MedicineCategory[]>([]);
  const [formType, setFormType] = useState<'Add' | 'Update'>('Add');

  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Medinces',
      link: AdminPath + '/' + AdminMenuItems.getMenu('Medicines')?.path,
    },
    {
      title: 'New Medicine',
    },
  ];

  async function getCategories() {
    setCategories(await categoryDB.getAll());
  }

  async function loadMedicine(id: number) {
    try {
      let _medicine = await medicineDB.get(id);
      setMedicine(_medicine as Medicine);
      form.setFieldsValue({ ..._medicine });
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: error.toString(),
        onOk: () => {
          history.push({
            pathname: AdminPath + '/' + AdminMenuItems.getMenu('Medicines')?.path,
          });
        },
        onCancel: () => {
          history.push({
            pathname: AdminPath + '/' + AdminMenuItems.getMenu('Medicines')?.path,
          });
        },
      });
    }
  }

  async function onFormSubmit() {
    try {
      await form.validateFields();
      if (formType === 'Add') addMedicine();
      else updateMedicine();
    } catch (ex) {
      Modal.error({
        title: 'Error',
        content: 'Please fill all mandatory fields',
      });
    }
  }

  async function addMedicine() {
    try {
      await medicineDB.add(medicine);
      history.push(AdminPath + '/' + AdminMenuItems.getMenu('Medicines')?.path);
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: error.toString(),
      });
    }
  }

  async function updateMedicine() {
    try {
      await medicineDB.update(medicine);
      history.push(AdminPath + '/' + AdminMenuItems.getMenu('Medicines')?.path);
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: error.toString(),
      });
    }
  }

  useEffect(() => {
    getCategories();
    if (props && props.id) {
      setFormType('Update');
      loadMedicine(props.id);
    } else if (props && props.location?.state?.id) {
      setFormType('Update');
      loadMedicine(parseInt(props.location?.this.state?.id));
    } else if (id) {
      setFormType('Update');
      loadMedicine(parseInt(id));
    } else {
      setMedicine(_dummyMedicine);
      setFormType('Add');
      setTimeout(function () {
        form.setFieldsValue({ ...medicine });
      }, 500);
    }

    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Title level={4} className="page-title">
            {formType} Medicine
          </Title>
          <Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Card className="card-container">
            <Form layout="vertical" scrollToFirstError={true} form={form}>
              <Space size="large" direction="vertical">
                <Row gutter={[24, 0]}>
                  <Col xs={24} md={12}>
                    <FormItem name="Name" label="Medicine Name" required={true} initialValue={medicine.Name} rules={[{ required: true, message: 'Please enter Medicine Name' }]}>
                      <Input
                        size="large"
                        placeholder="Medicine Name"
                        prefix={<CapsulesIcon />}
                        onChange={(e) => {
                          setMedicine({ ...medicine, Name: e.target.value });
                        }}
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <FormItem name="Category" label="Medicine Category" rules={[{ required: true, message: 'Please select a Category' }]}>
                      <Select
                        placeholder="Medicine Category"
                        size="large"
                        onChange={(e) => {
                          setMedicine({ ...medicine, CategoryID: parseInt(e.toString()) });
                        }}
                      >
                        {categories.map((category) => (
                          <Option value={category.ID} key={category.ID}>
                            {category.Name}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <FormItem name="Company" label="Medicine Company" required={true} initialValue={medicine.Company} rules={[{ required: true, message: 'Please enter Company Name' }]}>
                      <Input
                        size="large"
                        placeholder="Medicine Company"
                        prefix={<BuildingIcon />}
                        onChange={(e) => {
                          setMedicine({ ...medicine, Company: e.target.value });
                        }}
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <FormItem name="Genreic" label="Genric Name" required={true} initialValue={medicine.Genreic} rules={[{ required: true, message: 'Please enter Genric Name' }]}>
                      <Input
                        size="large"
                        placeholder="Generic Name"
                        prefix={<CapsulesIcon />}
                        onChange={(e) => {
                          setMedicine({ ...medicine, Genreic: e.target.value });
                        }}
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <FormItem name="Group" label="Medicine Group" required={true} initialValue={medicine.Group}>
                      <Input
                        size="large"
                        placeholder="Medicine Group"
                        onChange={(e) => {
                          setMedicine({ ...medicine, Group: e.target.value });
                        }}
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <Row gutter={[24, 0]}>
                      <Col xs={24} md={12}>
                        <FormItem name="Unit" label="Medicine Unit" initialValue={medicine.Unit} rules={[{ required: true, message: 'Please enter Medicince Unit' }]}>
                          <Input
                            size="large"
                            placeholder="Medicine Unit"
                            onChange={(e) => {
                              setMedicine({ ...medicine, Unit: e.target.value });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                      <Col xs={24} md={12}>
                        <FormItem name="UnitPerPacking" label="Unites/Packing" initialValue={medicine.Unit}>
                          <Input
                            size="large"
                            placeholder="Unites/Packing"
                            type="number"
                            onChange={(e) => {
                              setMedicine({ ...medicine, UnitPerPacking: parseInt(e.target.value) });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} md={12}>
                    <FormItem name="StroeBox" label="Stroe Box" initialValue={medicine.StroeBox}>
                      <Input
                        size="large"
                        placeholder="Stroe Box"
                        onChange={(e) => {
                          setMedicine({ ...medicine, StroeBox: e.target.value });
                        }}
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <Row gutter={[24, 0]}>
                      <Col xs={24} md={12}>
                        <FormItem name="MinLevel" label="Min Level" initialValue={medicine.MinLevel}>
                          <Input
                            size="large"
                            placeholder="Min Level"
                            type="number"
                            onChange={(e) => {
                              setMedicine({ ...medicine, MinLevel: parseInt(e.target.value) });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                      <Col xs={24} md={12}>
                        <FormItem name="ReOrderLevel" label="Re-Order Level" initialValue={medicine.Unit}>
                          <Input
                            size="large"
                            placeholder="Re-Order Level"
                            type="number"
                            onChange={(e) => {
                              setMedicine({ ...medicine, ReOrderLevel: parseInt(e.target.value) });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} md={12}>
                    <FormItem name="Note" label="Note" initialValue={medicine.Unit}>
                      <TextArea
                        placeholder="Note"
                        rows={6}
                        onChange={(e) => {
                          setMedicine({ ...medicine, Note: e.target.value });
                        }}
                      ></TextArea>
                    </FormItem>
                  </Col>
                </Row>
                <Button type="primary" onClick={onFormSubmit}>
                  {formType} Medicine
                </Button>
              </Space>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MedicineForm;
