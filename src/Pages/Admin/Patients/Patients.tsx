import React from 'react';
import { Row, Col, Button, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { AdminPath } from '../../../constants';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { HeartBeatIcon } from '../../../CustomIcons';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import DateRangePicker from '../../../components/DateRangePicker';
import { Link } from 'react-router-dom';

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
    </>
  );
};

export default Patients;
