import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { IAlertObject } from '../../store/alert/actions'
import rootActions from '../../store/rootActions'
import './styles.less'
const { Option } = Select

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

const EditProfile = ({ history }: RouteComponentProps) => {
  const d = useDispatch()
  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  const onFinish = (values: any) => {
    console.log('Success:', JSON.stringify(values))
    d(rootActions.profileActions.createProfile.request(values))
    history.push('/dashboard')
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
                message: 'Please input your professional status'
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
                message: 'Please input your developer skills'
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

          <Button
            className="socialButton"
            shape="round"
            type="dashed"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </Button>

          {displaySocialInputs && (
            <div className="socialInputs">
              <Form.Item {...tailLayout} name="twitter">
                <Input
                  placeholder="Twitter URL"
                  prefix={<i className="fab fa-twitter fa-1x"></i>}
                />
              </Form.Item>
              <Form.Item {...tailLayout} name="facebook">
                <Input
                  placeholder="Facebook URL"
                  prefix={<i className="fab fa-facebook fa-1x"></i>}
                />
              </Form.Item>
              <Form.Item {...tailLayout} name="youtube">
                <Input
                  placeholder="Youtube URL"
                  prefix={<i className="fab fa-youtube fa-1x"></i>}
                />
              </Form.Item>
              <Form.Item {...tailLayout} name="linkedin">
                <Input
                  placeholder="Linkedin URL"
                  prefix={<i className="fab fa-linkedin fa-1x"></i>}
                />
              </Form.Item>
              <Form.Item {...tailLayout} name="instagram">
                <Input
                  placeholder="Instagram URL"
                  prefix={<i className="fab fa-instagram fa-1x"></i>}
                />
              </Form.Item>
            </div>
          )}

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

export default withRouter(EditProfile)
