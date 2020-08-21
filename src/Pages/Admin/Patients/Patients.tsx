import React from 'react';
import { Row, Col, Button, Space, Table, Tag } from 'antd';
import Title from 'antd/lib/typography/Title';
import { AdminPath } from '../../../constants';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { HeartBeatIcon, EditIcon, EyeIcon, TrashIcon } from '../../../CustomIcons';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import DateRangePicker from '../../../components/DateRangePicker';
import { Link } from 'react-router-dom';
import { Patients as dummyPatients } from '../../../DummyData';
import { ColumnsType } from 'antd/lib/table';

const Patients = () => {
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
  const columns1 = [
    {
      title: 'Patient ID',
      dataIndex: 'ID',
      key: 'ID',
      /* sorter: (a: any, b: any) => a.ID - b.ID,
      sortDirections: ['ascend', 'descend'], */
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text: any, row: any) => {
        console.log(text);
        return <span>{row.FirstName + ' ' + row.LastName}</span>;
      },
      /* sorter: (a: any, b: any) => a.Name - b.Name,
      sortDirections: ['ascend', 'descend'], */
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
      /* sorter: (a: any, b: any) => a.Gender - b.Gender,
      sortDirections: ['ascend', 'descend'], */
    },
    {
      title: 'Blood Group',
      dataIndex: 'BloodGroup',
      key: 'BloodGroup',
      /* sorter: (a: any, b: any) => a.BloodGroup - b.BloodGroup,
      sortDirections: ['ascend', 'descend'], */
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'DateOfBirth',
      key: 'DateOfBirth',
      /* sorter: (a: any, b: any) => a.DateOfBirth - b.DateOfBirth,
      sortDirections: ['ascend', 'descend'], */
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (status: string) => <Tag color={status == 'Inactive' ? 'volcano' : 'green'}>{status.toUpperCase()}</Tag>,
      /* sorter: (a: any, b: any) => a.Status - b.Status,
      sortDirections: ['ascend', 'descend'], */
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any) => (
        <Space>
          <EyeIcon title="View"></EyeIcon>
          <EditIcon title="Edit"></EditIcon>
          <TrashIcon title="Delete"></TrashIcon>
        </Space>
      ),
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
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
          <Table className="w-100" size="large" tableLayout="auto" columns={columns1} dataSource={dummyPatients}></Table>
        </Col>
      </Row>
    </>
  );
};

export default Patients;
