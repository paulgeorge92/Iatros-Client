import React, { useEffect } from 'react';
import { Layout, Col, Row } from 'antd';
import { LoginForm } from '../../components/LoginForm';
import { LogoImage, AdminPath } from '../../constants';
import { AdminContext } from '../../contexts/AdminContext';
import { useHistory } from 'react-router-dom';

const { Content } = Layout;
const bg = require('../../assets/images/login_bg.svg') as string;

export interface AdminLoginProps {
  redirectUrl?: string;
}

export const AdminLogin = (props: AdminLoginProps) => {
  const history = useHistory();

  if (sessionStorage.getItem('userSession')) {
    var session = JSON.parse(sessionStorage.getItem('userSession') || '{}');
    if (session.mode === 'admin' && new Date(parseInt(session.expiry) || '0') > new Date()) {
      history.push(`${AdminPath}/dashboard`);
    }
  }

  useEffect(() => {
    return () => {
      console.log('cleaned up');
    };
  }, []);

  return (
    <Layout className="Login">
      <Content>
        <Row style={{ backgroundImage: 'url(' + bg + ')', width: '100vw', height: '100vh' }} justify="space-around" align="middle">
          <Col xs={{ span: 20 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
            <img src={LogoImage} alt="logo" className="responsive-img mb-5" />
            <LoginForm context={AdminContext} defaultUrl={`${AdminPath}/dashboard`} returnUrl={props.redirectUrl} mode="admin"></LoginForm>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
