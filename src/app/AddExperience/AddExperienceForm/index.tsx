import { Button, Checkbox, DatePicker, Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IFormItem } from '../../../models/common'
import moment from 'moment'
import './styles.less'
import { useDispatch } from 'react-redux'
import { IExperienceObject } from '../../../models/profile'
import rootActions from '../../../store/rootActions'
import { v4 as uuidv4 } from 'uuid'
import { IAlertObject } from '../../../store/alert/actions'

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

const AddExperienceForm = () => {
  const [form] = Form.useForm()
  const [isCurrentJob, toggleIsCurrentJob] = useState(true)
  const d = useDispatch()

  const fields: IFormItem[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      extra: 'The position inside the company or team',
      rules: {
        required: true,
        message: 'Please input your professional title'
      },
      placeholder: 'Title'
    },
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
      name: 'location',
      label: 'Location',
      type: 'text',
      extra: 'City and state suggested (eg. Boston, MA)',
      placeholder: 'Location'
    },
    {
      name: 'from',
      label: 'From',
      type: 'date',
      extra: 'Please select the starting date for this position',
      rules: {
        required: true,
        message: 'Please input your starting date'
      },
      placeholder: 'Date'
    },
    {
      name: 'toDate',
      label: 'To',
      type: 'date',
      extra: 'Please select the ending date for this position',
      rules: {
        required: false,
        message: 'Please input your starting date'
      },
      placeholder: 'Date'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textArea',
      extra: 'Tell us a little about this position',
      placeholder: 'A short description of the job'
    }
  ]

  const onFinish = (values: any) => {
    console.log('Success:', JSON.stringify(values))
    d(rootActions.profileActions.addExperience.request(values))
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

  /* function onDateChange(date: any, dateString: any) {
    console.log(date, dateString)
  } */

  function onCheckboxChange(e: any) {
    /* console.log(`checked = ${e.target.checked}`) */
    toggleIsCurrentJob(!isCurrentJob)
    /* console.log(`state = ${JSON.stringify(form.getFieldsValue().toDate)}`) */
    e.target.checked && form.setFieldsValue({ toDate: undefined })
  }

  function disabledFromDate(current: any) {
    return current && current > moment().endOf('day')
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
            ) : field.name === 'toDate' && !isCurrentJob ? (
              <DatePicker /* onChange={onDateChange} */ disabled={true} />
            ) : (
              <DatePicker /* onChange={onDateChange} */ disabledDate={disabledFromDate} />
            )}
          </Form.Item>
        ))}

        <Form.Item name="current" valuePropName="checked">
          <Checkbox onChange={onCheckboxChange}>Current Job</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            /* loading={isLoading} */ className="socialButton"
          >
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

export default AddExperienceForm
