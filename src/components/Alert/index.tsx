import React, { Fragment } from 'react'
import './styles.less'
import { Button } from 'antd'
import { IAlertObject } from '../../store/alert/actions'
import { useSelector } from 'react-redux'
import rootSelectors from '../../store/rootSelectors'
import { useDispatch } from 'react-redux'
import rootActions from '../../store/rootActions'

const Alert = (): JSX.Element => {
  const d = useDispatch()
  const alerts = useSelector(rootSelectors.alerts.alerts)
  const onDismiss = (e: any, id: string) => {
    e.preventDefault()
    d(rootActions.alertActions.deleteAlert(id))
  }
  if (alerts !== null && alerts.length > 0) {
    return (
      <Fragment>
        {alerts.map((alert: IAlertObject) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            <p>{alert.msg}</p>
            <Button
              type="primary"
              shape="circle"
              className="btn-dissmiss"
              onClick={e => onDismiss(e, alert.id)}
            >
              X
            </Button>
          </div>
        ))}
      </Fragment>
    )
  } else {
    return <Fragment></Fragment>
  }
}

export default Alert
