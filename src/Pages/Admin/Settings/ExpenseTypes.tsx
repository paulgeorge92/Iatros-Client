import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { ColumnsType } from 'antd/lib/table';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { Space, Row, Col, Button, Input, Popconfirm, Select, Form, Modal, Table, PageHeader } from 'antd';
import { ExpenseType } from '../../../models/ExpenseTypes';
import { ExpenseTypeRepository } from '../../../repository/ExpenseTypeRepository';
import { Status } from '../../../models/Enums';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const ExpenseTypes = () => {
  const breadcrumbItems: Array<BreadcrumbItem> = [
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
              onEditTypeClick(row);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete this type"
            onConfirm={() => {
              onDeleteTypeClick(row);
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
  const [form] = Form.useForm();
  const [expenseTypes, setExpenseTyes] = useState<ExpenseType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<ExpenseType>({ ID: -1, Name: '', Description: '', Status: 'Active' });
  const [modalType, setModalType] = useState<'Add' | 'Update'>('Add');

  const expenseTypeDB = new ExpenseTypeRepository(); //Expense Type databse repository

  /**
   * Open the modal popup with edit form
   * @param type expense type to edit
   */
  let onEditTypeClick = (type: ExpenseType) => {
    form.setFieldsValue(type);
    setSelectedType(type);
    setModalType('Update');
    setShowModal(true);
  };

  /**
   * Open the modal popup with new form
   */
  let onAddTypeClick = () => {
    setModalType('Add');
    form.setFieldsValue({ Name: '', Description: '', Status: 'Active' });
    setSelectedType({ ID: -1, Name: '', Description: '', Status: 'Active' });
    setShowModal(true);
  };

  /**
   * Fetch all expense method from databse
   */
  async function getExpenseTypes() {
    setExpenseTyes(await expenseTypeDB.getAll());
  }

  /**
   * Delete selected expense type
   * @param type Expense type to delete
   */
  async function onDeleteTypeClick(type: ExpenseType) {
    await expenseTypeDB.delete(type.ID);
    getExpenseTypes();
  }

  /**
   * Add the expense type to database
   */
  async function addType() {
    try {
      let val = (await form.validateFields()) as ExpenseType;
      if (val.Name && val.Description) {
        await expenseTypeDB.add(selectedType);
        getExpenseTypes();
        setShowModal(false);
      } else {
      }
    } catch (error) {}
  }

  /**
   * Updates the expense type in database
   */
  async function updateType() {
    try {
      await form.validateFields();
      await expenseTypeDB.update(selectedType);
      getExpenseTypes();
      setShowModal(false);
    } catch (error) {}
  }

  /**
   * Modal Cancel click event
   */
  let onModalCancelClick = () => {
    setShowModal(false);
    setShowModal(false);
  };

  /**
   * Modal on close event
   */
  let onModalClose = () => {};

  useEffect(() => {
    getExpenseTypes();
    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PageHeader
        className="page-title no-print"
        title={`Expense types`}
        subTitle={<Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>}
        extra={[
          <Button type="primary" icon={<PlusOutlined />} onClick={onAddTypeClick}>
            Add Expense Type
          </Button>,
        ]}
      ></PageHeader>

      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table scroll={{ x: true, scrollToFirstRowOnChange: true }} className="iatros-table" columns={tableColumns} dataSource={expenseTypes} rowKey={(record: ExpenseType) => record.ID}></Table>
        </Col>
      </Row>
      <Modal title={`${modalType} Expense type`} visible={showModal} onOk={modalType === 'Add' ? addType : updateType} onCancel={onModalCancelClick} destroyOnClose={true} afterClose={onModalClose} okText={`${modalType}`}>
        <Form form={form} layout="vertical">
          <FormItem name="Name" label="Name" rules={[{ required: true, message: 'Please input a name for expense type' }]}>
            <Input
              size="large"
              placeholder="Type Name"
              defaultValue={selectedType.Name}
              value={selectedType.Name}
              onChange={(e) => {
                setSelectedType({ ...selectedType, Name: e.target.value });
              }}
            ></Input>
          </FormItem>
          <FormItem name="Description" label="Description">
            <TextArea
              rows={5}
              defaultValue={selectedType.Description}
              value={selectedType.Description}
              onChange={(e) => {
                setSelectedType({ ...selectedType, Description: e.target.value });
              }}
            ></TextArea>
          </FormItem>
          <FormItem name="Status" label="Status">
            <Select
              size="large"
              defaultValue={selectedType.Status}
              value={selectedType.Status}
              onSelect={(value) => {
                setSelectedType({ ...selectedType, Status: value.toString() as Status });
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
