import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { ColumnsType } from 'antd/lib/table';
import { PaymentMethods as DummyData } from '../../../DummyData';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { Space, Row, Col, Button, Input, Popconfirm, Select, Form, Modal, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import PaymentMethod from '../../../models/PaymentMethod';
import { PaymentMethodRepository } from '../../../repository/PaymentMethodRepository';
const FormItem = Form.Item;
const { Option } = Select;

const PaymentMethods = () => {
  const breadcrumbItems: Array<BreadcrumbItem> = [
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
              onEditMethodClick(row);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete the method"
            onConfirm={() => {
              onDeleteMethodClick(row);
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
  const [form] = Form.useForm();
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>({ ID: -1, Method: '', Status: 'Active' });
  const [modalType, setModalType] = useState<'Add' | 'Update'>('Add');

  const methodDB = new PaymentMethodRepository(); // Database repository

  /**
   * Edit the selected payment method
   * @param method {PaymentMethod} method to edit
   */
  let onEditMethodClick = (method: PaymentMethod) => {
    setSelectedMethod({ ...method });
    form.setFieldsValue({ ...method });
    setModalType('Update');
    setShowModal(true);
  };

  /**
   * Opens the modal popup with form
   */
  let onAddMethodClick = () => {
    setModalType('Add');
    form.setFieldsValue({ ID: -1, Method: '', Status: 'Active' });
    setSelectedMethod({ ID: -1, Method: '', Status: 'Active' });
    setShowModal(true);
  };

  /**
   * Deletes the selected payment method
   * @param method {PaymentMethod} payment method to delete
   */
  async function onDeleteMethodClick(method: PaymentMethod) {
    try {
      await methodDB.delete(method.ID);
      getMethods();
    } catch (error) {}
  }

  /**
   * Fetched all payemnt methods from database
   */
  async function getMethods() {
    setMethods(await methodDB.getAll());
  }

  /**
   * add the payment method to database
   */
  async function addMethod() {
    try {
      await form.validateFields();
      await methodDB.add(selectedMethod);
      getMethods();
      setShowModal(false);
    } catch (error) {}
  }

  /**
   * update the payment method
   */
  async function updateMethod() {
    try {
      await form.validateFields();
      try {
        await methodDB.update(selectedMethod);
        getMethods();
        setShowModal(false);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    } catch (error) {}
  }

  /**
   * Event triggered on modal close button click
   */
  let handleCancel = () => {
    setShowModal(false);
  };

  /**
   * Event triggered after modal is closed
   */
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
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddMethodClick}>
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

      <Modal title={`${modalType} Payment Method`} visible={showModal} onOk={modalType == 'Add' ? addMethod : updateMethod} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText={modalType}>
        <Form form={form} layout="vertical">
          <FormItem name="Method" label="Name" rules={[{ required: true, message: 'Please input a name for payment method' }]}>
            <Input
              size="large"
              placeholder="Payement Method Name"
              defaultValue={selectedMethod.Method}
              onChange={(e) => {
                setSelectedMethod({ ...selectedMethod, Method: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Status" label="Status" rules={[{ required: true, message: 'Plese select the status' }]}>
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
