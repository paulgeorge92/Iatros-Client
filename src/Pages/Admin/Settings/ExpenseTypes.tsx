import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import Table, { ColumnsType } from 'antd/lib/table';
import { ExpenseTypes as DummyData } from '../../../DummyData';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { Space, Row, Col, Button, Input, Popconfirm, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { ExpenseType } from '../../../models/ExpenseTypes';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const ExpenseTypes = () => {
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Expense Types',
    },
  ];
  const [tableColumns] = useState<ColumnsType<ExpenseType>>([
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      sorter: (a: ExpenseType, b: ExpenseType) => (a.Name > b.Name ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
      width: '30%',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',

      width: '40%',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      sorter: (a: ExpenseType, b: ExpenseType) => (a.Status > b.Status ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
      width: '20%',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any, row: ExpenseType) => (
        <Space size="large">
          <EditIcon
            title={`Edit Type`}
            className="row-edit"
            onClick={() => {
              editType(row);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete this type"
            onConfirm={() => {
              deleteType(row);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon title={`Delete Type`} className="row-delete"></TrashIcon>
          </Popconfirm>
        </Space>
      ),
    },
  ]);

  const [expenseTypes, setExpenseTyes] = useState<ExpenseType[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<ExpenseType>({ ID: -1, Name: '', Description: '', Status: 'Active' });

  let editType = (type: ExpenseType) => {
    setSelectedType(type);
    setShowEditModal(true);

    //alert(JSON.stringify(tax));
  };

  let deleteType = (type: ExpenseType) => {
    let index = DummyData.findIndex((x: ExpenseType) => x.ID === type.ID);
    let _types = DummyData.map((x: ExpenseType) => x);
    _types.splice(index, 1);
    setExpenseTyes(_types);
  };

  let addType = () => {};
  let updateType = () => {};
  let handleCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };
  let onModalClose = () => {};

  useEffect(() => {
    let _types: ExpenseType[] = DummyData.map((type: any) => type);
    setExpenseTyes(_types);
    return () => {};
  }, []);

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Title level={4} className="page-title">
            Expense types
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
          <Table scroll={{ x: true, scrollToFirstRowOnChange: true }} className="iatros-table" columns={tableColumns} dataSource={expenseTypes} rowKey={(record: ExpenseType) => record.ID}></Table>
        </Col>
      </Row>
      <Modal title="Add Expense type" visible={showAddModal} onOk={addType} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText="Add">
        <Form layout="vertical">
          <FormItem name="Name" label="Name" required={true}>
            <Input
              size="large"
              placeholder="Type Name"
              onChange={(e) => {
                setSelectedType({ ...selectedType, Name: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Description" label="Description" required={false}>
            <TextArea
              rows={5}
              onChange={(e) => {
                setSelectedType({ ...selectedType, Description: e.target.value });
              }}
            ></TextArea>
          </FormItem>
          <FormItem name="Status" label="Status" required={true}>
            <Select
              size="large"
              onSelect={(value) => {
                setSelectedType({ ...selectedType, Status: value.toString() });
              }}
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>

      <Modal title="Edit Expense Type" visible={showEditModal} onOk={updateType} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText="Update">
        <Form layout="vertical">
          <FormItem name="Name" label="Name" required={true}>
            <Input
              size="large"
              placeholder="Type Name"
              defaultValue={selectedType.Name}
              onChange={(e) => {
                setSelectedType({ ...selectedType, Name: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Description" label="Description" required={false}>
            <TextArea
              defaultValue={selectedType.Description}
              rows={5}
              onChange={(e) => {
                setSelectedType({ ...selectedType, Description: e.target.value });
              }}
            ></TextArea>
          </FormItem>
          <FormItem name="Status" label="Status" required={true}>
            <Select
              defaultActiveFirstOption={true}
              defaultValue={selectedType.Status}
              size="large"
              onSelect={(value) => {
                setSelectedType({ ...selectedType, Status: value.toString() });
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

export default ExpenseTypes;
