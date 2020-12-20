import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { ColumnsType } from 'antd/lib/table';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { Space, Row, Col, Button, Input, Popconfirm, Typography, Form, Modal, Table } from 'antd';
import { Tax } from '../../../models/Tax';
import { TaxRepository } from '../../../repository/TaxRepository';

const FormItem = Form.Item;
const { Title } = Typography;

const Taxes = () => {
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Taxes',
    },
  ];
  const [tableColumns] = useState<ColumnsType<Tax>>([
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      sorter: (a: Tax, b: Tax) => (a.Name > b.Name ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
      width: '60%',
    },
    {
      title: 'Rate(%)',
      dataIndex: 'Rate',
      key: 'Rate',
      sorter: (a: Tax, b: Tax) => a.Rate - b.Rate,
      sortDirections: ['ascend', 'descend'],
      width: '30%',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any, row: Tax) => (
        <Space size="large">
          <EditIcon
            title={`Edit Tax`}
            className="row-edit"
            onClick={() => {
              onEditTaxClick(row);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete the tax"
            onConfirm={() => {
              onDeleteTaxClick(row);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon title={`Delete Tax`} className="row-delete"></TrashIcon>
          </Popconfirm>
        </Space>
      ),
    },
  ]);

  const taxDB = new TaxRepository();
  const [form] = Form.useForm();
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [modalType, setModalType] = useState<'Add' | 'Update'>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTax, setSelectedTax] = useState<Tax>({ ID: -1, Name: '', Rate: 0 });

  function onAddTaxClick() {
    setModalType('Add');
    setSelectedTax({ ID: -1, Name: '', Rate: 0 });
    form.setFieldsValue({ ID: -1, Name: '', Rate: 0 });
    setShowModal(true);
  }

  function onEditTaxClick(tax: Tax) {
    setModalType('Update');
    setSelectedTax({ ...tax });
    form.setFieldsValue({ ...tax });
    setShowModal(true);
  }

  function onDeleteTaxClick(tax: Tax) {
    deleteTax(tax.ID);
    getTaxes();
  }

  async function onFormSubmit() {
    try {
      await form.validateFields();
      if (modalType === 'Add') addTax(selectedTax);
      else updateTax(selectedTax);
      getTaxes();
      setShowModal(false);
    } catch (error) {}
  }

  async function addTax(tax: Tax) {
    await taxDB.add(tax);
  }
  async function getTaxes() {
    setTaxes(await taxDB.getAll());
  }
  async function updateTax(tax: Tax) {
    await taxDB.update(tax);
  }
  async function deleteTax(id: number) {
    await taxDB.delete(id);
  }

  let handleCancel = () => {
    setShowModal(false);
    setShowModal(false);
  };
  let onModalClose = () => {};

  useEffect(() => {
    getTaxes();
    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Title level={4} className="page-title">
            Taxes
          </Title>
          <Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddTaxClick}>
              Add Tax
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table className="iatros-table" columns={tableColumns} dataSource={taxes} rowKey={(record: Tax) => record.ID}></Table>
        </Col>
      </Row>
      <Modal title={`${modalType} Tax`} visible={showModal} onOk={onFormSubmit} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText={modalType}>
        <Form form={form} layout="vertical">
          <FormItem name="Name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
            <Input
              size="large"
              placeholder="Tax Name"
              defaultValue={selectedTax.Name}
              onChange={(e) => {
                setSelectedTax({ ...selectedTax, Name: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Rate" label="Tax Rate (%)" rules={[{ required: true, message: 'Please enter rate' }]}>
            <Input
              size="large"
              type="number"
              placeholder="Tax Rate in %"
              defaultValue={selectedTax.Rate}
              onChange={(e) => {
                setSelectedTax({ ...selectedTax, Rate: parseFloat(e.target.value) });
              }}
            ></Input>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default Taxes;
