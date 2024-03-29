import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Space, Table, Tag, Popconfirm, PageHeader } from 'antd';
import { AdminPath, AdminMenuItems } from '../../../constants';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { HeartBeatIcon, EditIcon, EyeIcon, TrashIcon } from '../../../CustomIcons';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Patient } from '../../../models/Patient';
import { PatientRepository } from '../../../repository/PatientRepository';
import moment from 'moment';
const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      icon: <HeartBeatIcon />,
      title: 'Patients',
    },
  ];
  const columns: ColumnsType<Patient> = [
    {
      title: 'Patient ID',
      dataIndex: 'ID',
      key: 'ID',
      sorter: (a: Patient, b: Patient) => a.ID - b.ID,
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text: string, row: Patient) => {
        return <span>{row.FirstName + ' ' + row.LastName}</span>;
      },
      sorter: (a: Patient, b: Patient) => (a.FirstName + ' ' + a.LastName < b.FirstName + ' ' + b.LastName ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
      sorter: (a: Patient, b: Patient) => (a.Gender < b.Gender ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
    {
      title: 'Blood Group',
      dataIndex: 'BloodGroup',
      key: 'BloodGroup',
      sorter: (a: Patient, b: Patient) => (a.BloodGroup < b.BloodGroup ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '13%',
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'DateOfBirth',
      key: 'DateOfBirth',
      render: (text: Date, row: Patient) => <span>{moment(text).format('DD MMM YYYY')}</span>,
      sorter: (a: Patient, b: Patient) => new Date(a.DateOfBirth).getTime() - new Date(b.DateOfBirth).getTime(),
      sortDirections: ['ascend', 'descend'],
      width: '13%',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (status: string) => <Tag color={status === 'Inactive' ? 'volcano' : 'green'}>{status.toUpperCase()}</Tag>,
      sorter: (a: Patient, b: Patient) => (a.Status < b.Status ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any, row: Patient) => (
        <Space size="large">
          <Link to={`${AdminPath}/${AdminMenuItems.getMenu('View Patient')?.path.replace(':id', row.ID)}`}>
            <EyeIcon title={`View ${row.FirstName} ${row.LastName}`} className="row-view"></EyeIcon>
          </Link>
          <Link to={AdminPath + '/' + AdminMenuItems.getMenu('Edit Patient')?.path.replace(':id', row.ID)}>
            <EditIcon title={`Edit ${row.FirstName} ${row.LastName}`} className="row-edit"></EditIcon>
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this patient?"
            onConfirm={() => {
              onDeletePatientClick(row.ID);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon title={`Delete ${row.FirstName} ${row.LastName}`} className="row-delete"></TrashIcon>
          </Popconfirm>
        </Space>
      ),
      width: '10%',
    },
  ];
  let patientDB = new PatientRepository();

  function onDeletePatientClick(id: number) {
    deletePatient(id);
    getPatients();
  }

  async function getPatients() {
    let data = await patientDB.getAll();
    setPatients([...data]);
  }

  async function deletePatient(id: number) {
    try {
      await patientDB.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPatients();
    return () => {};
  });

  return (
    <>
      <PageHeader
        className="page-title no-print"
        title="Patients"
        subTitle={<Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>}
        extra={[
          <Link to={`${AdminPath}/${AdminMenuItems.getMenu('Add Patient')?.path}`}>
            <Button type="primary" icon={<PlusOutlined />}>
              New Patient
            </Button>
          </Link>,
        ]}
      ></PageHeader>

      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table scroll={{ x: true, scrollToFirstRowOnChange: true }} sticky={true} className="iatros-table" columns={columns} dataSource={patients}></Table>
        </Col>
      </Row>
    </>
  );
};

export default Patients;
