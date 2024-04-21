import React from 'react'
import { Button, Card, Typography, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { userLogin } from '../../services/user.service';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onNewAccount = () => {
    navigate('/register-user')
  }

  const onLogin = async (values) => {
    try {
      const payload = { ...values }
      let response = await userLogin(payload)
      console.log("response", response);
      localStorage.setItem("ss_token", response.token)
      window.location.reload()
    } catch (error) {
      messageApi.error(error?.response?.data?.message ?? "Something went wrong");
      console.log("error", error);
    }
  }

  return (
    <div>
      <Card className='cs-height-100vh'>
        {contextHolder}
        <div>
          <Typography.Title level={1}>
            User Login
          </Typography.Title>
          <Form onFinish={onLogin} form={form} name="login_form" layout="vertical">
            <Form.Item label="Mobile no" name="mobile_no">
              <Input placeholder='Enter Mobile No' />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input placeholder='Enter Password' type='password' />
            </Form.Item>

            <Button type='primary' htmlType='submit'>
              Login
            </Button>
          </Form>

          <div className='cs-tm-10'>
            <Typography.Text className='cs-clr-p cs-pointer' onClick={onNewAccount}>
              Don't have an account? Create new account!
            </Typography.Text>
          </div>
        </div>
      </Card>

    </div >
  )
}

export default Login