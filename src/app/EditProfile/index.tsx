import React, { Fragment } from 'react'
import { Form, Input, Button, Radio } from 'antd'
import './styles.less'
const EditProfile = () => {
  const [form] = Form.useForm()

  const buttonItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 4
    }
  }

  return (
    <div className="editProfileContainer">
      <div>
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let s get some information to make your profile stand out
        </p>
      </div>

      <Form layout="horizontal" form={form} initialValues={{}}>
        <Form.Item label="Form Layout" name="layout">
          <Radio.Group value="horizontal">
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field B">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditProfile
