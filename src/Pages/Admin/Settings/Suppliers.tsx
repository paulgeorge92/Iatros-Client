import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { ColumnsType } from 'antd/lib/table';
import { HomeFilled, PlusOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon, AtIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { Space, Row, Col, Button, Input, Popconfirm, Form, Modal, Table, Typography } from 'antd';
import { Supplier } from '../../../models/Supplier';
import { SuppliersRepository } from '../../../repository/SuppliersRepository';

const FormItem = Form.Item;
const { Title } = Typography;
const { TextArea } = Input;

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
              onEditSupplierClick(row);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete this supplier"
            onConfirm={() => {
              onDeleteSupplierClick(row);
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

  const [form] = Form.useForm();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [modalType, setModalType] = useState<'Add' | 'Update'>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>({ ID: -1, Name: '', Email: '', Phone: '', Address: '' });

  const supplierDB = new SuppliersRepository();

  function onAddSupplierClick() {
    setModalType('Add');
    setSelectedSupplier({ ID: -1, Name: '', Email: '', Phone: '', Address: '' });
    form.setFieldsValue({ ID: -1, Name: '', Email: '', Phone: '', Address: '' });
    setShowModal(true);
  }

  function onEditSupplierClick(supplier: Supplier) {
    setModalType('Update');
    setSelectedSupplier({ ...supplier });
    form.setFieldsValue({ ...supplier });
    setShowModal(true);
  }

  function onDeleteSupplierClick(supplier: Supplier) {
    deleteSupplier(supplier.ID);
    getSuppliers();
  }

  async function onFormSubmit() {
    try {
      await form.validateFields();
      if (modalType === 'Add') {
        addSupplier(selectedSupplier);
      } else {
        updateSupplier(selectedSupplier);
      }
      getSuppliers();
      setShowModal(false);
    } catch (error) {}
  }

  async function addSupplier(supplier: Supplier) {
    await supplierDB.add(supplier);
  }
  async function getSuppliers() {
    setSuppliers(await supplierDB.getAll());
  }
  async function updateSupplier(supplier: Supplier) {
    await supplierDB.update(supplier);
  }
  async function deleteSupplier(id: number) {
    await supplierDB.delete(id);
  }

  let handleCancel = () => {
    setShowModal(false);
    setShowModal(false);
  };
  let onModalClose = () => {};

  useEffect(() => {
    getSuppliers();
    return () => {};
  });

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
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddSupplierClick}>
              Add Supplier
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table scroll={{ x: true, scrollToFirstRowOnChange: true }} className="iatros-table" columns={tableColumns} dataSource={suppliers} rowKey={(record: Supplier) => record.ID}></Table>
        </Col>
      </Row>
      <Modal title={`${modalType} Supplier`} visible={showModal} onOk={onFormSubmit} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText={modalType}>
        <Form form={form} layout="vertical">
          <FormItem name="Name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
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
          <FormItem name="Phone" label="Contact Number" rules={[{ required: true, message: 'Please enter contact number' }]}>
            <Input
              placeholder="ContactNumber"
              prefix={<PhoneOutlined />}
              defaultValue={selectedSupplier.Phone}
              onChange={(e) => {
                setSelectedSupplier({ ...selectedSupplier, Phone: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Address" label="Address" rules={[{ required: true, message: 'Please enter address' }]}>
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
