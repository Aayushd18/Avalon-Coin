import React from "react"
import '../App.css';
import { Form, Input, Button, Checkbox } from "antd";
import loginImg from '../login.png'
import { useNavigate } from 'react-router-dom'


export const Login = () => {

  let navigate = useNavigate();
  const onFinish = (values) => {
    let userId = values.username;
    fetch(`http://localhost:3001/${userId}`).then(res => {

      console.log('Success:', values);
    }
    )
    navigate('/home');
    

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="lContainer">
      <h1 className="loginTitle" >Welcome To RFID Login System</h1>
      <div className="lItem">
      <div className="loginImage">
        <img src={loginImg} width="300" style={{position: 'relative'}} alt="login" />
      </div>
      <div className="loginForm">
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="User"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input type="text" ref="userId" className="input" />
          </Form.Item>
    
    
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox class="tick">Remember me</Checkbox>
          </Form.Item>
    
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button className="login-form-button" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
      </div>
      <div className="footer">
        <p>Powered By Avalon Coin</p>
      </div>
    </div>
  )
}