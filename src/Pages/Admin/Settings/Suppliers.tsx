import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import Table, { ColumnsType } from 'antd/lib/table';
import { Suppliers as DummyData } from '../../../DummyData';
import { HomeFilled, PlusOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon, AtIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { Space, Row, Col, Button, Input, Popconfirm } from 'antd';
import Title from 'antd/lib/typography/Title';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Supplier } from '../../../models/Supplier';
import TextArea from 'antd/lib/input/TextArea';

const Suppliers = () => {
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Suppliers',
    },
  ];
  const [tableColumns] = useState<ColumnsType<Supplier>>([
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      sorter: (a: Supplier, b: Supplier) => (a.Name > b.Name ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'Phone',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any, row: Supplier) => (
        <Space size="large">
          <EditIcon
            title={`Edit Supplier`}
            className="row-edit"
            onClick={() => {
              editType(row);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete this supplier"
            onConfirm={() => {
              deleteType(row);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon title={`Delete Supplier`} className="row-delete"></TrashIcon>
          </Popconfirm>
        </Space>
      ),
    },
  ]);

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>({ ID: -1, Name: '', Email: '', Phone: '', Address: '' });

  let editType = (type: Supplier) => {
    setSelectedSupplier(type);
    setShowEditModal(true);

    //alert(JSON.stringify(tax));
  };

  let deleteType = (type: Supplier) => {
    let index = DummyData.findIndex((x: Supplier) => x.ID === type.ID);
    let _types = DummyData.map((x: Supplier) => x);
    _types.splice(index, 1);
    setSuppliers(_types);
  };

  let addType = () => {};
  let updateType = () => {};
  let handleCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };
  let onModalClose = () => {};

  useEffect(() => {
    let _types: Supplier[] = DummyData.map((type: any) => type);
    setSuppliers(_types);
    return () => {};
  }, []);

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Title level={4} className="page-title">
            Suppliers
          </Title>
          <Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              Add Expense Type
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table scroll={{ x: true, scrollToFirstRowOnChange: true }} className="iatros-table" columns={tableColumns} dataSource={suppliers} rowKey={(record: Supplier) => record.ID}></Table>
        </Col>
      </Row>
      <Modal title="Add Supplier" visible={showAddModal} onOk={addType} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText="Add">
        <Form layout="vertical">
          <FormItem name="Name" label="Name" required={true}>
            <Input
              size="large"
              placeholder="Supplier Name"
              prefix={<UserOutlined />}
              onChange={(e) => {
                setSelectedSupplier({ ...selectedSupplier, Name: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Email" label="Email" required={false}>
            <Input
              size="large"
              placeholder="Email"
              prefix={<AtIcon />}
              type="email"
              onChange={(e) => {
                setSelectedSupplier({ ...selectedSupplier, Email: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Phone" label="Contact Number" required={false}>
            <Input
              size="large"
              placeholder="ContactNumber"
              prefix={<PhoneOutlined />}
              onChange={(e) => {
                setSelectedSupplier({ ...selectedSupplier, Phone: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Address" label="Address" required={false}>
            <TextArea
              rows={5}
              onChange={(e) => {
                setSelectedSupplier({ ...selectedSupplier, Address: e.target.value });
              }}
            ></TextArea>
          </FormItem>
        </Form>
      </Modal>

      <Modal title="Edit Expense Type" visible={showEditModal} onOk={updateType} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText="Update">
        <Form layout="vertical">
          <FormItem name="Name" label="Name" required={true}>
            <Input
              placeholder="Supplier Name"
              prefix={<UserOutlined />}
              defaultValue={selectedSupplier.Name}
              onChange={(e) => {
                setSelectedSupplier({ ...selectedSupplier, Name: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Email" label="Email" required={false}>
            <Input
              placeholder="Email"
              prefix={<AtIcon />}
              defaultValue={selectedSupplier.Email}
              onChange={(e) => {
                setSelectedSupplier({ ...selectedSupplier, Email: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Phone" label="Contact Number" required={false}>
            <Input
              placeholder="ContactNumber"
              prefix={<PhoneOutlined />}
              defaultValue={selectedSupplier.Phone}
              onChange={(e) => {
                setSelectedSupplier({ ...selectedSupplier, Phone: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Address" label="Address" required={false}>
            <TextArea
              defaultValue={selectedSupplier.Address}
              rows={5}
              onChange={(e) => {
                setSelectedSupplier({ ...selectedSupplier, Address: e.target.value });
              }}
            ></TextArea>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default Suppliers;
