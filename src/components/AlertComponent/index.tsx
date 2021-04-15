import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { IAlertObject } from '../../store/alert/actions'
import rootActions from '../../store/rootActions'
import './styles.less'

const AlertComponent = ({ alertObject }: { alertObject: IAlertObject }) => {
  const d = useDispatch()

  const onDismiss = (e: any, id: string) => {
    console.log('DISMISS: ' + id)
    e.preventDefault()
    d(rootActions.alertActions.deleteAlert(id))
  }

  return (
    <div key={alertObject.id} className={`alert alert-${alertObject.alertType}`}>
      <p>{alertObject.msg}</p>
      <Button
        type="primary"
        shape="circle"
        className="btn-dissmiss"
        onClick={e => onDismiss(e, alertObject.id)}
      >
        X
      </Button>
    </div>
  )
}

export default AlertComponent
