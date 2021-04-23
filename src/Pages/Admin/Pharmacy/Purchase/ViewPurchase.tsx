import { Card, Col, Modal, Row, Typography, Grid, PageHeader, Table, Button } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import React, { useState, useEffect, useContext } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../../components/Breadcrumb';
import { AdminMenuItems, AdminPath } from '../../../../constants';
import { MedicinePurchase } from '../../../../models/MedicinePurchase';
import { AdminContext } from '../../../../contexts/AdminContext';
import { PurchaseRepository } from '../../../../repository/PurchaseRepository';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { MedicineBatch } from '../../../../models/Batch';
import ImportScript from '../../../../customHooks/importScript';
import './style.css';
import { EditIcon } from '../../../../CustomIcons';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;
interface props {
  id?: number;
  location?: any;
}

const ViewPurchase = (props: props) => {
  ImportScript('');

  const { id } = useParams();

  const screens = useBreakpoint();

  const breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Purchases',
      link: AdminPath + '/' + AdminMenuItems.getMenu('Purchases')?.path,
    },
    {
      title: 'View Purchase',
    },
  ];
  const columns: ColumnsType<MedicineBatch> = [
    {
      title: 'Name',
      dataIndex: 'MedicineName',
      key: 'MedicineName',
      width: '20%',
    },
    {
      title: 'Batch No.',
      dataIndex: 'Batch',
      key: 'Batch',
      width: '10%',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'Expiry',
      key: 'Expiry',
      width: '10%',
      render: (expiry) => moment(expiry).format('MMM YYYY'),
    },
    {
      title: 'Packing Qty',
      dataIndex: 'PackageQuantity',
      key: 'PackageQuantity',
      width: '10%',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
      width: '10%',
    },
    {
      title: 'Purchase Price',
      dataIndex: 'PurchasePrice',
      key: 'PurchasePrice',
      width: '10%',
      render: (amount) => `${appSettings.Currency} ${parseFloat(amount).toFixed(2)}`,
    },
    {
      title: 'Sale Price',
      dataIndex: 'SalePrice',
      key: 'SalePrice',
      width: '10%',
      render: (amount) => `${appSettings.Currency} ${parseFloat(amount).toFixed(2)}`,
    },
    {
      title: 'Tax',
      dataIndex: 'TaxPrice',
      key: 'TaxPrice',
      width: '10%',
      render: (amount) => `${appSettings.Currency} ${parseFloat(amount).toFixed(2)}`,
    },
    {
      title: 'Total Price',
      dataIndex: 'Price',
      key: 'Price',
      width: '10%',
      render: (amount) => `${appSettings.Currency} ${parseFloat(amount).toFixed(2)}`,
    },
  ];

  const purchaseDB = new PurchaseRepository();

  const blankPurchase: MedicinePurchase = {
    Amount: 100,
    Batch: [
      {
        ID: 1,
        Batch: 'sfsdf',
        Expiry: new Date(),
        MedicineID: 1,
        Name: 'ashgsj',
        MedicineName: 'ashgsj',
        PackageQuantity: 100,
        PurchaseID: 1,
        Price: 98564,
        PurchasePrice: 100,
        SalePrice: 12000,
        Quantity: 10,
        Sold: 1,
        Status: true,
        TaxID: 1,
        TaxPrice: 0,
      },
    ],
    DiscountAmount: 0,
    DiscountType: '',
    ID: 1,
    TaxAmount: 100,
    Total: 200,
    Supplier: 1,
    SupplierEmail: 'supplier@suplier.com',
    SupplierPhone: '+911234567890',
    SupplierName: 'Vaidyarathnam',
    PurchaseDate: new Date(),
    ReferenceID: 'PO-2021/01',
  };
  const [purchase, setPurchase] = useState<MedicinePurchase>(blankPurchase);

  const appSettings = useContext(AdminContext).context.settings;

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
    } catch (err) {
      Modal.error({
        title: 'Error',
        content: err.toString(),
      });
    }
  }

  useEffect(() => {
    if (props && props.id) {
      getPurchase(props.id);
    } else if (props && props.location?.state?.id) {
      getPurchase(props.location?.state?.id);
    } else if (id) {
      getPurchase(id);
    }
    /* eslint-disable-next-line */
  }, []);

  return (
    <>
      <PageHeader
        className="page-title no-print"
        title="Purchase Bill"
        subTitle={<Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>}
        extra={[
          <Link to={`${AdminPath}/${AdminMenuItems.getMenu('Edit Purchase')?.path?.replace(':id', purchase.ID)}`}>
            <Button type="primary" icon={<EditIcon />}>
              Edit Purchase
            </Button>
          </Link>,
        ]}
      ></PageHeader>

      <Row>
        <Col xs={24}>
          <Card className="card-container print-no-padding">
            <Row align="middle" gutter={[24, 24]}>
              <Col xs={24} sm={12}>
                <Text>Supplier</Text>
                <Title level={5}>{purchase.SupplierName}</Title>
                <Paragraph>
                  <Text>{purchase.SupplierEmail}</Text>
                  <br />
                  <Text>{purchase.SupplierPhone}</Text>
                </Paragraph>
              </Col>
              <Col xs={24} sm={12} style={{ textAlign: screens.sm ? 'right' : 'left' }}>
                <Paragraph>
                  <Text>Purchase ID: {purchase.ReferenceID}</Text>
                  <br />
                  <Text>Purchase Date: {moment(purchase.PurchaseDate).format('DD MMM YYYY')}</Text>
                  <br />
                </Paragraph>
              </Col>
            </Row>
            <Row>
              <Col xs={24} className="no-print">
                <Table sticky={true} scroll={{ x: true, scrollToFirstRowOnChange: true }} className="iatros-table" columns={columns} dataSource={purchase.Batch} rowKey={(row) => row.ID}></Table>
              </Col>
              <Col xs={24} className="px-0 only-print">
                <table className="print-table">
                  <thead>
                    <tr>
                      <th style={{ width: '20%' }}>Name</th>
                      <th style={{ width: '10%' }}>Batch No</th>
                      <th style={{ width: '10%' }}>Expiry Date</th>
                      <th style={{ width: '10%' }}>Packing Qty</th>
                      <th style={{ width: '10%' }}>Qty</th>
                      <th style={{ width: '10%' }}>Purchase Price</th>
                      <th style={{ width: '10%' }}>Sale Price</th>
                      <th style={{ width: '10%' }}>Tax</th>
                      <th style={{ width: '10%' }}>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchase.Batch.map((batch) => (
                      <tr key={batch.ID}>
                        <td>{batch.MedicineName}</td>
                        <td>{batch.Batch}</td>
                        <td>{moment(batch.Expiry).format('MM/YY')}</td>
                        <td>{batch.PackageQuantity}</td>
                        <td>{batch.Quantity}</td>
                        <td>{`${parseFloat(batch.PurchasePrice?.toString() || '0').toFixed(2)}`}</td>
                        <td>{`${parseFloat(batch.SalePrice?.toString() || '0').toFixed(2)}`}</td>
                        <td>{`${parseFloat(batch.TaxPrice?.toString() || '0').toFixed(2)}`}</td>
                        <td>{`${parseFloat(batch.Price?.toString() || '0').toFixed(2)}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row gutter={[24, 12]} align="middle" justify="end" className="purchase-summary">
              <Col xs={12} sm={4} className="text-right">
                <Text>Sub Total</Text>
              </Col>
              <Col xs={12} sm={4}>
                <Text strong={true}>
                  {appSettings.Currency} {purchase.Total}
                </Text>
              </Col>
            </Row>
            <Row gutter={[24, 12]} align="middle" justify="end" className="purchase-summary">
              <Col xs={12} sm={4} className="text-right">
                <Text>Total Tax</Text>
              </Col>
              <Col xs={12} sm={4}>
                <Text strong={true}>
                  {appSettings.Currency} {purchase.TaxAmount}
                </Text>
              </Col>
            </Row>
            <Row gutter={[24, 12]} align="middle" justify="end" className="purchase-summary">
              <Col xs={12} sm={4} className="text-right">
                <Text>Discount </Text>
              </Col>
              <Col xs={12} sm={4}>
                <Text strong={true}>
                  {appSettings.Currency} {purchase.DiscountAmount}
                </Text>
              </Col>
            </Row>
            <Row gutter={[24, 12]} align="middle" justify="end" className="purchase-summary">
              <Col xs={12} sm={4} className="text-right">
                <Text>Total Amount</Text>
              </Col>
              <Col xs={12} sm={4}>
                <Text strong={true}>
                  {appSettings.Currency} {purchase.Amount}
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewPurchase;
