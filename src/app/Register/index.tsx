import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import './styles.less'
import rootActions from '../../store/rootActions'
import { IAlertObject } from '../../store/alert/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { IUserRegisterInfo } from '../../models/common'
import { Redirect } from 'react-router-dom'
import rootSelectors from '../../store/rootSelectors'

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

  const isAuthenticated = useSelector(rootSelectors.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
    let registerData: IUserRegisterInfo = {
      name: values.name,
      email: values.email,
      password: values.password
    }
    d(rootActions.authActions.registerUser.request(registerData))
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
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>

      <Form {...formItemLayout} name="register" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your developer name'
            }
          ]}
        >
          <Input />
        </Form.Item>
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
