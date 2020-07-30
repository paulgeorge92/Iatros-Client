import React from 'react';
import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import { AdminPath } from '../../../constants';
import { HomeFilled } from '@ant-design/icons';
import { HeartBeatIcon } from '../../../CustomIcons';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';

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
        <Col xs={24} md={12}></Col>
      </Row>
    </>
  );
};

export default Patients;
