import React, { Fragment } from 'react'
import { IAlertObject } from '../../store/alert/actions'
import AlertComponent from '../AlertComponent'
import './styles.less'

const AlertList = ({ alertsArray }: { alertsArray: IAlertObject[] }): JSX.Element => {
  if (alertsArray !== null && alertsArray.length >= 0) {
    return (
      <Fragment>
        {alertsArray.map((alert: IAlertObject) => (
          <AlertComponent alertObject={alert} key={alert.id} />
        ))}
      </Fragment>
    )
  } else {
    return <Fragment></Fragment>
  }
}

export default AlertList
