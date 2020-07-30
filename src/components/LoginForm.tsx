import React, { useContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { User } from '../models/User';
import moment from 'moment';

export interface LoginFormProps {
  returnUrl?: string;
  defaultUrl: string;
  context: React.Context<User>;
  mode: string;
}

export const LoginForm = (props: LoginFormProps) => {
  const userContext = useContext(props.context);
  const history = useHistory();

  const layout = {
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { span: 24 },
  };

  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  const onRememberChange = (e: CheckboxChangeEvent) => {
    setRememberUser(e.target.checked);
    //set cookie
  };

  const setState = (ele: HTMLInputElement, setter: Function) => {
    setter(ele.value);
  };

  const onFinish = () => {
    userContext.id = 1;
    sessionStorage.setItem(
      'userSession',
      JSON.stringify({
        user: userName,
        session: new Date().getTime().toString(),
        expiry: moment().add(15, 'minute').toDate().getTime().toString(),
        mode: props.mode,
      })
    );

    if (props.returnUrl) {
      history.push(props.returnUrl);
    } else {
      history.push(props.defaultUrl);
    }
  };

  return (
    <Form {...layout} name="Admin Login" initialValues={{ userName, pwd, rememberUser }} onFinish={onFinish}>
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
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};
