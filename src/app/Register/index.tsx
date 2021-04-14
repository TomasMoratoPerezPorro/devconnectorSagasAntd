import React from 'react'
import './styles.less'
import rootActions from '../../store/rootActions'
import { IAlertObject } from '../../store/alert/actions'
import { useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd'

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

const Register = () => {
  const d = useDispatch()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    const alert: IAlertObject = {
      msg: 'Big Problem bro',
      alertType: 'danger',
      timeOut: 3000,
      id: '001'
    }
    d(rootActions.alertActions.setAlert(alert))
  }

  return (
    <div className="register-container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
