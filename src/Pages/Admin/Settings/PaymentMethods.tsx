import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import Table, { ColumnsType } from 'antd/lib/table';
import { PaymentMethods as DummyData } from '../../../DummyData';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { Space, Row, Col, Button, Input, Popconfirm, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import PaymentMethod from '../../../models/PaymentMethod';

const { Option } = Select;

const PaymentMethods = () => {
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Payment Methods',
    },
  ];
  const [tableColumns] = useState<ColumnsType<PaymentMethod>>([
    {
      title: 'Name',
      dataIndex: 'Method',
      key: 'Method',
      sorter: (a: PaymentMethod, b: PaymentMethod) => (a.Method > b.Method ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
      width: '60%',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      sorter: (a: PaymentMethod, b: PaymentMethod) => (a.Status > b.Status ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
      width: '30%',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any, row: PaymentMethod) => (
        <Space size="large">
          <EditIcon
            title={`Edit Method`}
            className="row-edit"
            onClick={() => {
              editMethod(row);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete the method"
            onConfirm={() => {
              deleteMethod(row);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon title={`Delete Method`} className="row-delete"></TrashIcon>
          </Popconfirm>
        </Space>
      ),
    },
  ]);

  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>({ ID: -1, Method: '', Status: 'Active' });

  let editMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setShowEditModal(true);
  };

  let deleteMethod = (method: PaymentMethod) => {
    let index = DummyData.findIndex((x: any) => x.ID === method.ID);
    let _methods = DummyData.map((x: any) => x);
    _methods.splice(index, 1);
    setMethods(_methods);
  };

  let addMethod = () => {};
  let updateMethod = () => {};
  let handleCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };
  let onModalClose = () => {};

  useEffect(() => {
    let _methods: PaymentMethod[] = DummyData.map((method: any) => method);
    setMethods(_methods);
    return () => {};
  }, []);

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Title level={4} className="page-title">
            Payment Methods
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
              Add Method
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table className="iatros-table" columns={tableColumns} dataSource={methods} rowKey={(record: PaymentMethod) => record.ID}></Table>
        </Col>
      </Row>
      <Modal title="Add Method" visible={showAddModal} onOk={addMethod} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText="Add">
        <Form layout="vertical">
          <FormItem name="Name" label="Name" required={true}>
            <Input
              size="large"
              placeholder="Payement Method Name"
              onChange={(e) => {
                setSelectedMethod({ ...selectedMethod, Method: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Status" label="Name" required={true}>
            <Select
              size="large"
              defaultValue={'Active'}
              onSelect={(value) => {
                setSelectedMethod({ ...selectedMethod, Status: value.toString() });
              }}
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>

      <Modal title="Edit Method" visible={showEditModal} onOk={updateMethod} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText="Update">
        <Form layout="vertical">
          <FormItem name="Name" label="Name" required={true}>
            <Input
              size="large"
              placeholder="Payement Method Name"
              defaultValue={selectedMethod.Method}
              onChange={(e) => {
                setSelectedMethod({ ...selectedMethod, Method: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Status" label="Name" required={true}>
            <Select
              size="large"
              defaultValue={selectedMethod.Status}
              onSelect={(value) => {
                setSelectedMethod({ ...selectedMethod, Status: value.toString() });
              }}
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default PaymentMethods;
