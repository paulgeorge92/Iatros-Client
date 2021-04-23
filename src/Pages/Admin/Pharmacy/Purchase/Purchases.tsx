import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../../components/Breadcrumb';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, EyeIcon, TrashIcon } from '../../../../CustomIcons';
import { AdminMenuItems, AdminPath } from '../../../../constants';
import { ColumnsType } from 'antd/lib/table';
import { Button, Col, Row, Space, Typography, Table, Popconfirm, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import { MedicinePurchase } from '../../../../models/MedicinePurchase';
import { PurchaseRepository } from '../../../../repository/PurchaseRepository';
import moment from 'moment';
const { Text } = Typography;

const Purchases = () => {
  const [purchases, setPurchases] = useState<MedicinePurchase[]>([]);

  const breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Purchases',
    },
  ];
  const columns: ColumnsType<MedicinePurchase> = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      sorter: (a: MedicinePurchase, b: MedicinePurchase) => a.ID - b.ID,
      sortDirections: ['ascend', 'descend'],
      width: '5%',
    },
    {
      title: 'Supplier',
      dataIndex: 'SupplierName',
      key: 'SupplierName',
      sorter: (a: MedicinePurchase, b: MedicinePurchase) => ((a.SupplierName || '') < (b.SupplierName || '') ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '25%',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
      sorter: (a: MedicinePurchase, b: MedicinePurchase) => (a.Amount < b.Amount ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
    {
      title: 'Tax',
      dataIndex: 'TaxAmount',
      key: 'TaxAmount',
      sorter: (a: MedicinePurchase, b: MedicinePurchase) => (a.TaxAmount < b.TaxAmount ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
    {
      title: 'Discount',
      dataIndex: 'DiscountAmount',
      key: 'DiscountAmount',
      render: (discount: number, row: MedicinePurchase) => (!discount ? '0.00' : parseFloat(discount.toString()).toFixed(2)),
      sorter: (a: MedicinePurchase, b: MedicinePurchase) => (a.DiscountAmount < b.DiscountAmount ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'PurchaseDate',
      key: 'PurchaseDate',
      render: (date: Date) => <>{date ? moment(date).format('DD MMMM YYYY') : ''}</>,
      sorter: (a: MedicinePurchase, b: MedicinePurchase) => ((a.PurchaseDate || new Date()) < (b.PurchaseDate || new Date()) ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '20%',
    },

    {
      title: 'Action',
      key: 'Action',
      render: (text: any, row: MedicinePurchase) => (
        <Space size="large">
          <Link to={AdminPath + '/' + AdminMenuItems.getMenu('View Purchase')?.path.replace(':id', row.ID)}>
            <EyeIcon title={`View`} className="row-view"></EyeIcon>
          </Link>
          <Link to={AdminPath + '/' + AdminMenuItems.getMenu('Edit Purchase')?.path.replace(':id', row.ID)}>
            <EditIcon title={`Edit Purchase`} className="row-edit"></EditIcon>
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this purchase?"
            onConfirm={() => {
              onDeletePurchaseClick(row.ID);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon title={`Delete Purchase`} className="row-delete"></TrashIcon>
          </Popconfirm>
        </Space>
      ),
      width: '10%',
    },
  ];

  const purchaseDB = new PurchaseRepository();

  function onDeletePurchaseClick(id: number) {
    deletePurchase(id);
    getPurchases();
  }

  async function getPurchases() {
    let data = await purchaseDB.getAll();
    setPurchases([...data]);
  }

  async function deletePurchase(id: number) {
    try {
      await purchaseDB.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPurchases();
    return () => {};
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <PageHeader
        className="page-title no-print"
        title={`Purchases`}
        subTitle={<Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>}
        extra={[
          <Link to={`${AdminPath}/${AdminMenuItems.getMenu('New Purchase')?.path}`}>
            <Button type="primary" icon={<PlusOutlined />}>
              New Purchase
            </Button>
          </Link>,
        ]}
      ></PageHeader>

      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table
            scroll={{ x: true, scrollToFirstRowOnChange: true }}
            sticky={true}
            className="iatros-table"
            columns={columns}
            dataSource={purchases}
            summary={(pageData: MedicinePurchase[]) => {
              let totalAmount = 0;
              let totalTax = 0;
              let totalDiscount = 0;
              pageData.forEach(({ Amount, DiscountAmount, TaxAmount }) => {
                totalAmount += Amount;
                totalDiscount += DiscountAmount;
                totalTax += TaxAmount;
              });
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text type="danger">{totalAmount}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <Text type="danger">{totalTax}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                      <Text type="danger">{totalDiscount}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          ></Table>
        </Col>
      </Row>
    </>
  );
};
export default Purchases;
