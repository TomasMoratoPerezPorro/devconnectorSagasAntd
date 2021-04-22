import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { IAlertObject } from '../store/alert/actions'
import rootActions from '../store/rootActions'

const formErrorsAlert = (errorInfo: any) => {
  const d = useDispatch()
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

export default formErrorsAlert
