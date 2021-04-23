import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../../components/Breadcrumb';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, EyeIcon, TrashIcon } from '../../../../CustomIcons';
import { AdminMenuItems, AdminPath } from '../../../../constants';
import { ColumnsType } from 'antd/lib/table';
import { Medicine } from '../../../../models/Medicine';
import { MedicineCategoryRepository } from '../../../../repository/MedicineCategoryRepository';
import { Button, Col, Row, Space, Table, Popconfirm, PageHeader } from 'antd';
import { MedicineRepository } from '../../../../repository/MedicineRepository';
import { Link } from 'react-router-dom';
import { MedicineCategory } from '../../../../models/MedicineCategory';

const Medicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<MedicineCategory[]>([]);

  const breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Medicines',
    },
  ];
  const columns: ColumnsType<Medicine> = [
    /* {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      sorter: (a: Medicine, b: Medicine) => a.ID - b.ID,
      sortDirections: ['ascend', 'descend'],
      width: '5%',
    }, */
    {
      title: 'Medicine',
      dataIndex: 'Name',
      key: 'Name',
      sorter: (a: Medicine, b: Medicine) => (a.Name < b.Name ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '25%',
    },
    {
      title: 'Category',
      dataIndex: 'CategoryID',
      key: 'CategoryID',
      render: (category: number) => <span>{categories.find((item) => item.ID === category)?.Name || ''}</span>,
      sorter: (a: Medicine, b: Medicine) => (a.CategoryID < b.CategoryID ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '20%',
    },
    {
      title: 'Company',
      dataIndex: 'Company',
      key: 'Company',
      sorter: (a: Medicine, b: Medicine) => (a.Company < b.Company ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '20%',
    },
    {
      title: 'Unit',
      dataIndex: 'Unit',
      key: 'Unit',
      sorter: (a: Medicine, b: Medicine) => (a.Unit < b.Unit ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '6%',
    },
    {
      title: 'Unit/Packing',
      dataIndex: 'UnitPerPacking',
      key: 'UnitPerPacking',
      sorter: (a: Medicine, b: Medicine) => (a.UnitPerPacking < b.UnitPerPacking ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },

    {
      title: 'Action',
      key: 'Action',
      render: (text: any, row: Medicine) => (
        <Space size="large">
          <Link to={AdminPath + '/' + AdminMenuItems.getMenu('View Medicine')?.path.replace(':id', row.ID)}>
            <EyeIcon title={`View ${row.Name}`} className="row-view"></EyeIcon>
          </Link>
          <Link to={AdminPath + '/' + AdminMenuItems.getMenu('Edit Medicine')?.path.replace(':id', row.ID)}>
            <EditIcon title={`Edit ${row.Name}`} className="row-edit"></EditIcon>
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this medicine?"
            onConfirm={() => {
              onDeleteMedicineClick(row.ID);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon title={`Delete ${row.Name}`} className="row-delete"></TrashIcon>
          </Popconfirm>
        </Space>
      ),
      width: '10%',
    },
  ];

  const medicineDB = new MedicineRepository();
  const categoryDB = new MedicineCategoryRepository();

  function onDeleteMedicineClick(id: number) {
    deleteMedicine(id);
    getMedicines();
  }

  async function getMedicines() {
    let data = await medicineDB.getAll();
    let categories = await categoryDB.getAll();
    setCategories([...categories]);
    setMedicines([...data]);
  }

  async function deleteMedicine(id: number) {
    try {
      await medicineDB.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMedicines();
    return () => {};
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <PageHeader
        className="page-title no-print"
        title={`Medicines`}
        subTitle={<Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>}
        extra={[
          <Link to={`${AdminPath}/${AdminMenuItems.getMenu('New Medicine')?.path}`}>
            <Button type="primary" icon={<PlusOutlined />}>
              New Medicine
            </Button>
          </Link>,
        ]}
      ></PageHeader>

      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table scroll={{ x: true, scrollToFirstRowOnChange: true }} sticky={true} className="iatros-table" columns={columns} dataSource={medicines}></Table>
        </Col>
      </Row>
    </>
  );
};
export default Medicines;
