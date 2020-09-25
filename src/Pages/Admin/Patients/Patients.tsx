import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Space, Table, Tag } from 'antd';
import Title from 'antd/lib/typography/Title';
import { AdminPath } from '../../../constants';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { HeartBeatIcon, EditIcon, EyeIcon, TrashIcon } from '../../../CustomIcons';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import DateRangePicker from '../../../components/DateRangePicker';
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
          <EyeIcon title={`View ${row.FirstName} ${row.LastName}`} className="row-view"></EyeIcon>
          <EditIcon title={`Edit ${row.FirstName} ${row.LastName}`} className="row-edit"></EditIcon>
          <TrashIcon title={`Delete ${row.FirstName} ${row.LastName}`} className="row-delete"></TrashIcon>
        </Space>
      ),
      width: '10%',
    },
  ];
  let patientDB = new PatientRepository();

  async function loadData() {
    let data = await patientDB.getAllPatients();
    setPatients(data);
  }
  useEffect(() => {
    loadData();
  });

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Title level={4} className="page-title">
            Patients
          </Title>
          <Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'right' }}>
          <Space>
            <DateRangePicker></DateRangePicker>
            <Link to={`${AdminPath}/patients/new`}>
              <Button type="primary" icon={<PlusOutlined />}>
                New Patient
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table scroll={{ x: true, scrollToFirstRowOnChange: true }} sticky={true} className="iatros-table" columns={columns} dataSource={patients}></Table>
        </Col>
      </Row>
    </>
  );
};

export default Patients;
