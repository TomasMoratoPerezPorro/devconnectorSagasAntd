import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { IFormItem } from '../../../models/common'
import { IAlertObject } from '../../../store/alert/actions'
import rootActions from '../../../store/rootActions'
import rootSelectors from '../../../store/rootSelectors'
import './styles.less'

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

const selectStatusField: IFormItem = {
  name: 'status',
  label: 'Professional Status',
  type: 'select',
  extra: 'Give us an idea of where you are at in your career',
  rules: {
    required: true,
    message: 'Please input your professional status'
  },
  valueOptions: [
    'Developer',
    'Junior Developer',
    'Senior Developer',
    'Manager',
    'Student or Learning',
    'Instructor',
    'Intern',
    'Other'
  ]
}

interface IProfileFormProps {
  isEdit: boolean
}

const ProfileForm = ({ isEdit }: IProfileFormProps) => {
  const fields: IFormItem[] = [
    selectStatusField,
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      extra: 'Could be your own company or one you work for',
      rules: {
        required: true,
        message: 'Please input your professional status'
      },
      placeholder: 'Company'
    },
    {
      name: 'website',
      label: 'Website',
      type: 'text',
      extra: 'Could be your own or a company website',
      placeholder: 'www.mysite.com'
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      extra: 'City and state suggested (eg. Boston, MA)',
      placeholder: 'Location'
    },
    {
      name: 'skills',
      label: 'Skills',
      type: 'text',
      extra: 'Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)',
      rules: {
        required: true,
        message: 'Please input your developer skills'
      },
      placeholder: 'Skills'
    },
    {
      name: 'githubusername',
      label: 'GitHub Username',
      type: 'text',
      extra: 'If you want your latest repos and a Github link, include your username',
      placeholder: 'GitHub Username'
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textArea',
      extra: 'Tell us a little about yourself',
      placeholder: 'A short bio of yourself'
    }
  ]

  const socialFields: IFormItem[] = [
    {
      name: 'twitter',
      type: 'text',
      placeholder: 'Twitter URL'
    },
    {
      name: 'facebook',
      type: 'text',
      placeholder: 'Facebook URL'
    },
    {
      name: 'youtube',
      type: 'text',
      placeholder: 'Youtube URL'
    },
    {
      name: 'linkedin',
      type: 'text',
      placeholder: 'LinkedIn URL'
    },
    {
      name: 'instagram',
      type: 'text',
      placeholder: 'Instagram URL'
    }
  ]

  const d = useDispatch()
  const h = useHistory()
  const isLoading = useSelector(rootSelectors.profile.loading)
  const profile = useSelector(rootSelectors.profile.profile)
  const [form] = Form.useForm()
  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  useEffect(() => {
    if (profile && isEdit) {
      form.setFieldsValue({
        status: isLoading || !profile.status ? '' : profile.status,
        company: isLoading || !profile.company ? '' : profile.company,
        website: isLoading || !profile.website ? '' : profile.website,
        location: isLoading || !profile.location ? '' : profile.location,
        skills: isLoading || !profile.skills ? '' : profile.skills.join(','),
        githubusername: isLoading || !profile.githubusername ? '' : profile.githubusername,
        twitter: isLoading || !profile.social ? '' : profile.social.twitter,
        facebook: isLoading || !profile.social ? '' : profile.social.facebook,
        linkedin: isLoading || !profile.social ? '' : profile.social.linkedin,
        youtube: isLoading || !profile.social ? '' : profile.social.youtube,
        instagram: isLoading || !profile.social ? '' : profile.social.instagram,
        bio: isLoading || !profile.bio ? '' : profile.bio
      })
    }
  }, [isLoading, profile, form])

  const onFinish = (values: any) => {
    console.log('Success:', JSON.stringify(values))
    d(rootActions.profileActions.createProfile.request(values))
    if (isLoading == false) {
      h.push('/dashboard')
    }
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
    <div className="formContainer">
      <Form {...layout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        {fields.map((field, index) => (
          <Form.Item
            key={index}
            name={field.name}
            label={field.label}
            extra={field.extra}
            rules={[{ ...field.rules }]}
            {...tailLayout}
          >
            {field.type === 'text' ? (
              <Input placeholder={field.placeholder} />
            ) : field.type === 'textArea' ? (
              <TextArea placeholder={field.placeholder} autoSize={{ minRows: 2, maxRows: 6 }} />
            ) : (
              <Select placeholder="Select a profesional status" allowClear>
                {field.valueOptions &&
                  field.valueOptions.map(option => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
              </Select>
            )}
          </Form.Item>
        ))}
        <Button
          className="socialButton"
          shape="round"
          type="dashed"
          onClick={() => toggleSocialInputs(!displaySocialInputs)}
        >
          Add Social Network Links
        </Button>

        {displaySocialInputs &&
          socialFields.map((socialField, index) => (
            <div className="socialInputs" key={index}>
              <Form.Item {...tailLayout} name={socialField.name}>
                <Input
                  placeholder={socialField.placeholder}
                  prefix={<i className={`fab fa-${socialField.name} fa-1x`}></i>}
                />
              </Form.Item>
            </div>
          ))}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading} className="socialButton">
            Submit
          </Button>
          <Link to="/dashboard">
            <Button type="primary" htmlType="submit">
              Go back
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ProfileForm
