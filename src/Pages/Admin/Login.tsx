import React, { useContext, useEffect } from 'react';
import { Layout, Col, Row } from 'antd';
import { LoginForm } from '../../components/LoginForm';
import { LogoImage, AdminPath, ContextActions } from '../../constants';
import { AdminContext } from '../../contexts/AdminContext';
import { useHistory } from 'react-router-dom';
import { Session } from '../../models/Session';
import moment from 'moment';

const { Content } = Layout;
const bg = require('../../assets/images/login_bg.svg') as string;

export interface AdminLoginProps {
  redirectUrl?: string;
  location?: any;
}

export const AdminLogin = (props: AdminLoginProps) => {
  let returnUrl = props.redirectUrl || props.location.state?.redirectUrl;
  const history = useHistory();
  const appContext = useContext(AdminContext);

  function onSuccess(session: Session) {
    sessionStorage.setItem(
      'SESSION',
      JSON.stringify({
        user: session.UserName,
        session: session,
        expiry: moment().add(15, 'minute').toDate().getTime().toString(),
        mode: 'admin',
      })
    );
    updateAppContext(session);
    history.push(returnUrl || `${AdminPath}/dashboard`);
  }

  function updateAppContext(session: Session) {
    appContext.dispatch({ type: ContextActions.LOGIN_USER, value: session });
  }

  function checkSession() {
    if (sessionStorage.getItem('SESSION')) {
      var session = JSON.parse(sessionStorage.getItem('SESSION') || '{}');
      if (session.mode === 'admin' && new Date(parseInt(session.expiry) || '0') > new Date()) {
        updateAppContext(session.session);
        history.push(returnUrl || `${AdminPath}/dashboard`);
      }
    } else {
      window.localStorage.setItem('REQUESTING_SHARED_CREDENTIALS', Date.now().toString());
      window.localStorage.removeItem('REQUESTING_SHARED_CREDENTIALS');
    }
  }
  checkSession();
  useEffect(() => {
    return () => {};
    // eslint-disable-next-line
  }, []);

  window.addEventListener('storage', (event) => {
    const session = window.sessionStorage.getItem('SESSION') ? JSON.parse(window.sessionStorage.getItem('SESSION') || '{}') : null;
    if (event.key === 'REQUESTING_SHARED_CREDENTIALS' && session) {
      window.localStorage.setItem('CREDENTIALS_SHARING', JSON.stringify(session));
      window.localStorage.removeItem('CREDENTIALS_SHARING');
    }
    if (event.key === 'CREDENTIALS_SHARING' && !session) {
      window.sessionStorage.setItem('SESSION', event.newValue || '{}');
      checkSession();
    }
  });

  return (
    <Layout className="Login">
      <Content>
        <Row style={{ backgroundImage: 'url(' + bg + ')', width: '100vw', height: '100vh' }} justify="space-around" align="middle">
          <Col xs={{ span: 20 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
            <img src={LogoImage} alt="logo" className="responsive-img mb-5" />
            <LoginForm onSuccess={onSuccess} name="Admin Login"></LoginForm>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
