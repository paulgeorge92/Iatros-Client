import React, { useState, useEffect, useContext } from 'react';

import { Table, Row, Col, Button, Space, Tag, Popconfirm, PageHeader } from 'antd';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { DoctorIcon, EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminMenuItems, AdminPath } from '../../../constants';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { ColumnsType } from 'antd/lib/table';
import { Doctor } from '../../../models/Doctor';
import { AdminContext } from '../../../contexts/AdminContext';
import { Link } from 'react-router-dom';
import { DoctorRepository } from '../../../repository/DoctorRepository';

const Doctors = () => {
  let appContext = useContext(AdminContext).context;
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      icon: <DoctorIcon />,
      title: 'Doctors',
    },
  ];

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const columns: ColumnsType<Doctor> = [
    {
      title: '#',
      dataIndex: 'ID',
      key: 'ID',
      sorter: (a: Doctor, b: Doctor) => a.ID - b.ID,
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text: string, row: Doctor) => {
        return <span>{row.FirstName + ' ' + row.LastName}</span>;
      },
      sorter: (a: Doctor, b: Doctor) => (a.FirstName + ' ' + a.LastName < b.FirstName + ' ' + b.LastName ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
      sorter: (a: Doctor, b: Doctor) => (a.Gender < b.Gender ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
    {
      title: 'Mobile',
      dataIndex: 'Mobile',
      key: 'Mobile',
      width: '10%',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (status: string) => <Tag color={status === 'Inactive' ? 'volcano' : 'green'}>{status.toUpperCase()}</Tag>,
      sorter: (a: Doctor, b: Doctor) => (a.Status < b.Status ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
  ];
  if (appContext.session?.role?.permissions?.includes('Edit Doctor') || appContext.session?.role?.permissions?.includes('Delete Doctor')) {
    columns.push({
      title: 'Action',
      key: 'Action',
      render: (text: any, row: Doctor) => (
        <Space size="large">
          {appContext.session?.role?.permissions?.includes('Edit Doctor') ? (
            <Link to={AdminPath + '/' + AdminMenuItems.getMenu('Edit Doctor')?.path.replace(':id', row.ID)}>
              <EditIcon title={`Edit ${row.FirstName} ${row.LastName}`} className="row-edit"></EditIcon>
            </Link>
          ) : (
            <></>
          )}
          {appContext.session?.role?.permissions?.includes('Delete Doctor') ? (
            <Popconfirm
              title="Are you sure you want to delete this doctor?"
              onConfirm={() => {
                onDeleteDoctorClick(row.ID);
              }}
              okText="Yes"
              cancelText="No"
            >
              <TrashIcon title={`Delete ${row.FirstName} ${row.LastName}`} className="row-delete"></TrashIcon>
            </Popconfirm>
          ) : (
            <></>
          )}
        </Space>
      ),
      width: '10%',
    });
  }

  const doctorDB = new DoctorRepository();

  async function onDeleteDoctorClick(id: number) {
    await deleteDoctor(id);
    await getDoctors();
  }

  async function getDoctors() {
    let data = await doctorDB.getAll();
    setDoctors([...data]);
  }

  async function deleteDoctor(id: number) {
    try {
      await doctorDB.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDoctors();
    return () => {};
  });

  return (
    <>
      <PageHeader
        className="page-title no-print"
        title="Doctors"
        subTitle={<Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>}
        extra={[
          <Space>
            {appContext.session?.role?.permissions?.includes('Add Doctor') ? (
              <Link to={`${AdminPath}/${AdminMenuItems.getMenu('Add Doctor')?.path}`}>
                <Button type="primary" icon={<PlusOutlined />}>
                  New Doctor
                </Button>
              </Link>
            ) : (
              <></>
            )}
          </Space>,
        ]}
      ></PageHeader>

      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table scroll={{ x: true, scrollToFirstRowOnChange: true }} sticky={true} className="iatros-table" columns={columns} dataSource={doctors}></Table>
        </Col>
      </Row>
    </>
  );
};

export default Doctors;
