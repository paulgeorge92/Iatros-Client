import React from 'react';
import { useState } from 'react';
import { Form, Input, Checkbox, Button, Alert } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { AuthenticationRepository } from '../repository/AuthenticationRepository';
import { Session } from '../models/Session';

export interface LoginFormProps {
  onSuccess: Function;
  name: string;
}

export const LoginForm = (props: LoginFormProps) => {
  const authDB = new AuthenticationRepository();

  const layout = {
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { span: 24 },
  };

  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  const [message, setMessage] = useState('');

  const onRememberChange = (e: CheckboxChangeEvent) => {
    setRememberUser(e.target.checked);
    //set cookie
  };

  const setState = (ele: HTMLInputElement, setter: Function) => {
    setter(ele.value);
  };

  const onFinish = async () => {
    let session: Session = {};
    setMessage('');
    try {
      session = await authDB.authenticate(userName, pwd);
      props.onSuccess(session);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <Form {...layout} name={props.name} initialValues={{ userName, pwd, rememberUser }} onFinish={onFinish}>
      <Form.Item {...tailLayout} name="userName" rules={[{ required: true, message: 'Enter your username or email' }]}>
        <Input
          prefix={<UserOutlined />}
          placeholder="username or email"
          size="large"
          onChange={(e) => {
            setState(e.target, setUserName);
          }}
        />
      </Form.Item>
      <Form.Item {...tailLayout} name="pwd" rules={[{ required: true, message: 'Enter your password' }]}>
        <Input.Password
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          placeholder="password"
          size="large"
          onChange={(e) => {
            setState(e.target, setPwd);
          }}
        ></Input.Password>
      </Form.Item>
      <Form.Item {...tailLayout} name="remember">
        <Checkbox checked={rememberUser} onChange={onRememberChange}>
          Remember me
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout} name="submit">
        {message ? <Alert message={message} type="error" showIcon></Alert> : <></>}
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};
