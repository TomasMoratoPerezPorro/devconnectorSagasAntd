import React, { Fragment } from 'react'
import { Form, Input, Button, Radio, Select } from 'antd'
const { Option } = Select
import './styles.less'
import TextArea from 'antd/lib/input/TextArea'

const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 20
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 0.5, // Distancia entre  Label i input
    span: 20 // Amplada Inputs
  }
}

const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
)
const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
)

const EditProfile = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('ERRORS ARRAY:  ' + JSON.stringify(errorInfo))
  }

  return (
    <div className="editProfileContainer">
      <div>
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let s get some information to make your profile stand out
        </p>
      </div>
      <div className="formContainer">
        <Form {...layout} layout="horizontal" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            {...tailLayout}
            label="Professional Status"
            name="status"
            extra="Give us an idea of where you are at in your career"
            rules={[
              {
                required: true,
                message: 'Please input your developer name'
              }
            ]}
          >
            <Select
              placeholder="Select a profesional status"
              /* onChange={onGenderChange} */
              allowClear
            >
              <Select.Option value="Developer">Developer</Select.Option>
              <Select.Option value="Junior Developer">Junior Developer</Select.Option>
              <Select.Option value="Senior Developer">Senior Developer</Select.Option>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Student or Learning">Student or Learning</Select.Option>
              <Select.Option value="Instructor">Instructor or Teacher</Select.Option>
              <Select.Option value="Intern">Intern</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            {...tailLayout}
            name="company"
            label="Company"
            extra="Could be your own company or one you work for"
          >
            <Input placeholder="Company" />
          </Form.Item>

          <Form.Item
            {...tailLayout}
            name="website"
            label="Website"
            extra="Could be your own or a company website"
          >
            <Input addonBefore={selectBefore} addonAfter={selectAfter} placeholder="mysite" />
          </Form.Item>

          <Form.Item
            {...tailLayout}
            name="location"
            label="Location"
            extra="City and state suggested (eg. Boston, MA)"
          >
            <Input placeholder="Location" />
          </Form.Item>

          <Form.Item
            {...tailLayout}
            name="skills"
            label="Skills"
            extra="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
            rules={[
              {
                required: true,
                message: 'Please input your developer name'
              }
            ]}
          >
            <Input placeholder="Skills" />
          </Form.Item>

          <Form.Item
            {...tailLayout}
            name="githubusername"
            label="GitHub Username"
            extra="If you want your latest repos and a Github link, include your username"
          >
            <Input placeholder="GitHub Username" />
          </Form.Item>

          <Form.Item {...tailLayout} name="bio" label="Bio" extra="Tell us a little about yourself">
            <TextArea placeholder="A short bio of yourself" autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default EditProfile
