import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import Table, { ColumnsType } from 'antd/lib/table';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { MedicineCategory } from '../../../models/MedicineCategory';
import { Space, Row, Col, Button, Input, Popconfirm } from 'antd';
import Title from 'antd/lib/typography/Title';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { MedicineCategoryRepository } from '../../../repository/MedicineCategoryRepository';

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
  const [categories, setCategories] = useState<MedicineCategory[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<MedicineCategory>({ ID: -1, Name: '' });

  const categoryDB = new MedicineCategoryRepository();

  async function getCatgories() {
    setCategories(await categoryDB.getAll());
  }

  async function getCatgory(id: number) {
    let category = await categoryDB.get(id);
    setSelectedCategory(category);
    setShowEditModal(true);
  }

  async function addCategory() {
    await categoryDB.add(selectedCategory);
    getCatgories();
    setShowAddModal(false);
  }

  async function updateCategory() {
    await categoryDB.update(selectedCategory);
    getCatgories();
    setShowEditModal(false);
  }

  async function deleteCategory(category: MedicineCategory) {
    await categoryDB.delete(category.ID);
    getCatgories();
  }

  let onEditCategoryClick = (catgeory: MedicineCategory) => {
    getCatgory(catgeory.ID);
  };

  let onAddCategoryClick = () => {
    addCategory();
  };

  let onUpdateCategoryClick = () => {
    updateCategory();
  };

  let onCancelClick = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  let onModalClose = () => {};

  useEffect(() => {
    getCatgories();
    return () => {};
  }, []);

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
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setShowAddModal(true);
              }}
            >
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
      <Modal title="Add Category" visible={showAddModal} onOk={onAddCategoryClick} onCancel={onCancelClick} destroyOnClose={true} afterClose={onModalClose} okText="Add">
        <Form layout="vertical">
          <FormItem name="CategoryName" label="Name" required={true}>
            <Input
              size="large"
              placeholder="Category Name"
              onChange={(e) => {
                setSelectedCategory({ ...selectedCategory, Name: e.target.value });
              }}
            ></Input>
          </FormItem>
        </Form>
      </Modal>

      <Modal title="Edit Category" visible={showEditModal} onOk={onUpdateCategoryClick} destroyOnClose={true} onCancel={onCancelClick} afterClose={onModalClose} okText="Update">
        <Form layout="vertical">
          <FormItem name="CategoryName" label="Name" required={true}>
            <Input
              size="large"
              placeholder="Category Name"
              defaultValue={selectedCategory.Name}
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
