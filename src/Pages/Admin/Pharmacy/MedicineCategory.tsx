import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import Table, { ColumnsType } from 'antd/lib/table';
import { Categories } from '../../../DummyData';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { MedicineCategory } from '../../../models/MedicineCategory';
import { Space, Row, Col, Button, Input, Popconfirm } from 'antd';
import Title from 'antd/lib/typography/Title';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';

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
              editCategory(row);
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

  let editCategory = (catgeory: MedicineCategory) => {
    setShowEditModal(true);
    setSelectedCategory(catgeory);
  };

  let deleteCategory = (category: MedicineCategory) => {
    let index = categories.findIndex((x: MedicineCategory) => x.ID == category.ID);
    let newcat = Categories;
    newcat.splice(index, 1);
    setCategories(newcat);
  };

  let addCategory = () => {};
  let updateCategory = () => {};
  let handleCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };
  let onModalClose = () => {};

  useEffect(() => {
    let categories: MedicineCategory[] = Categories.map((category: any) => category);
    setCategories(categories);
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
      <Modal title="Add Category" visible={showAddModal} onOk={addCategory} onCancel={handleCancel} afterClose={onModalClose} okText="Add">
        <Form layout="vertical">
          <FormItem name="CategoryName" label="Name" required={true}>
            <Input size="large" placeholder="Category Name"></Input>
          </FormItem>
        </Form>
      </Modal>

      <Modal title="Edit Category" visible={showEditModal} onOk={updateCategory} onCancel={handleCancel} afterClose={onModalClose} okText="Update">
        <Form layout="vertical">
          <FormItem name="CategoryName" label="Name" required={true}>
            <Input size="large" placeholder="Category Name" defaultValue={selectedCategory.Name}></Input>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default MedicineCategories;
