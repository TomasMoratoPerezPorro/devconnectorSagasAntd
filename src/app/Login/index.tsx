import React from 'react'
import './styles.less'
import { Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux'
import rootActions from '../../store/rootActions'
import { v4 as uuidv4 } from 'uuid'
import { IAlertObject } from '../../store/alert/actions'
import { IUserLoginInfo } from '../../models/common'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 9
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16,
      offset: 1
    }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

const Login = () => {
  const d = useDispatch()

  const onFinish = (values: any) => {
    console.log('Success:', values)
    let loginData: IUserLoginInfo = {
      email: values.email,
      password: values.password
    }
    d(rootActions.authActions.loginUser.request(loginData))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('ERRORS ARRAY:  ' + JSON.stringify(errorInfo))

    errorInfo.errorFields.forEach((error: any) => {
      let id = uuidv4()
      console.log(id)
      let alert: IAlertObject = {
        msg: error.errors[0],
        alertType: 'danger',
        timeOut: 5000,
        id: id
      }
      d(rootActions.alertActions.setAlert(alert))
    })
  }
  return (
    <div className="register-container">
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login to Your Account
      </p>

      <Form {...formItemLayout} name="register" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
