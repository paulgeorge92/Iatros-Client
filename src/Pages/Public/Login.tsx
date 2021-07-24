import React from 'react';
import { Layout, Col, Row } from 'antd';
import { LoginForm } from '../../components/LoginForm';
import { UserContext } from '../../contexts/UserContext';
import { Session } from '../../models/Session';

const { Content } = Layout;
const bg = require('../../assets/images/login_bg.svg') as string;
const logo = require('../../assets/images/Logo.png') as string;

export interface AdminLoginProps {
  redirectUrl?: string;
}

export const AdminLogin = (props: AdminLoginProps) => {
  function onSuccess(session: Session) {}
  //states
  return (
    <Layout className="Login">
      <Content>
        <Row style={{ backgroundImage: 'url(' + bg + ')', width: '100vw', height: '100vh' }} justify="space-around" align="middle">
          <Col xs={{ span: 20 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
            <img src={logo} alt="logo" className="responsive-img mb-5" />
            <LoginForm onSuccess={onSuccess} name="User Login"></LoginForm>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
