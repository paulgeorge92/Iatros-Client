import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { Space, Row, Col, Button, Popconfirm, Form, Modal, Table, Typography, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { MedicineCategory } from '../../../models/MedicineCategory';
import { MedicineCategoryRepository } from '../../../repository/MedicineCategoryRepository';
const FormItem = Form.Item;
const { Title } = Typography;

const MedicineCategories = () => {
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Medicine Categories',
    },
  ];
  const tableColumns: ColumnsType<MedicineCategory> = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      sorter: (a: MedicineCategory, b: MedicineCategory) => (a.Name > b.Name ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
      width: '90%',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any, row: MedicineCategory) => (
        <Space size="large">
          <EditIcon
            title={`Edit Category`}
            className="row-edit"
            onClick={() => {
              onEditCategoryClick(row);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete the category"
            onConfirm={() => {
              deleteCategory(row);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon title={`Delete Category`} className="row-delete"></TrashIcon>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<MedicineCategory[]>([]);
  const [modalType, setModalType] = useState<'Add' | 'Update'>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<MedicineCategory>({ ID: -1, Name: '' });

  const categoryDB = new MedicineCategoryRepository(); //Medicine Category Repository

  let errorHandler = (error: any) => {
    alert(JSON.stringify(error));
  };

  /**
   * Fetches all categories from database
   */
  async function getCatgories() {
    setCategories(await categoryDB.getAll());
  }

  /**
   * Add a category to database
   */
  async function addCategory() {
    try {
      await form.validateFields();
      try {
        await categoryDB.add(selectedCategory);
        getCatgories();
        setShowModal(false);
      } catch (error) {
        errorHandler(error);
      }
    } catch (error) {}
  }

  /**
   * Update a category in database
   */
  async function updateCategory() {
    try {
      await form.validateFields();
      try {
        await categoryDB.update(selectedCategory);
        getCatgories();
        setShowModal(false);
      } catch (error) {
        errorHandler(error);
      }
    } catch (error) {}
  }

  /**
   * Delete a category from database
   * @param {MedicineCategory} category Category to delete
   */
  async function deleteCategory(category: MedicineCategory) {
    try {
      await categoryDB.delete(category.ID);
      getCatgories();
    } catch (error) {
      errorHandler(error);
    }
  }

  /**
   * Open the modal popup with edit form
   * @param category category to edit
   */
  function onEditCategoryClick(category: MedicineCategory) {
    form.setFieldsValue(category);
    setSelectedCategory(category);
    setModalType('Update');
    setShowModal(true);
  }

  /**
   * Opens the modal popup withnew form
   */
  function onAddCategoryClick() {
    setModalType('Add');
    form.setFieldsValue({ ID: -1, Name: '' });
    setSelectedCategory({ ID: -1, Name: '' });
    setShowModal(true);
  }

  /**
   * Modal cancel button click event
   */
  let onCancelClick = () => {
    setShowModal(false);
    setShowModal(false);
  };

  let onModalClose = () => {};

  useEffect(() => {
    getCatgories();
    return () => {};
  });

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Title level={4} className="page-title">
            Medicine Categories
          </Title>
          <Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddCategoryClick}>
              Add Category
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table className="iatros-table" columns={tableColumns} dataSource={categories} rowKey={(record: MedicineCategory) => record.ID}></Table>
        </Col>
      </Row>

      <Modal title={`${modalType} Category`} visible={showModal} onOk={modalType === 'Add' ? addCategory : updateCategory} destroyOnClose={true} onCancel={onCancelClick} afterClose={onModalClose} okText={modalType}>
        <Form layout="vertical" form={form}>
          <FormItem name="Name" label="Name" rules={[{ required: true, message: 'Please input a name for category' }]}>
            <Input
              size="large"
              placeholder="Category Name"
              defaultValue={selectedCategory.Name}
              value={selectedCategory.Name}
              onChange={(e) => {
                setSelectedCategory({ ...selectedCategory, Name: e.target.value });
              }}
            ></Input>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default MedicineCategories;
