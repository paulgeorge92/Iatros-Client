import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Link } from 'react-router-dom';
import { AdminPath } from '../../../constants';
import { HomeFilled } from '@ant-design/icons';
import { HeartBeatIcon } from '../../../CustomIcons';

const Patients = () => {
  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Title level={4}>Patients</Title>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to={AdminPath}>
                <HomeFilled />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <HeartBeatIcon />
              <span>Patients</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={24} md={12}></Col>
      </Row>
    </>
  );
};

export default Patients;
