import { Layout } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Alert from '../components/AlertList'
import CustomHeader from '../components/CustomHeader'
import services from '../services'
import { IAlertObject } from '../store/alert/actions'
import rootActions from '../store/rootActions'
import rootSelectors from '../store/rootSelectors'
import Landing from './Landing'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import './styles.less'

const { Header, Content } = Layout

if (localStorage.token) {
  services.userAPI.setToken(localStorage.token)
}

function App() {
  const d = useDispatch()
  useEffect(() => {
    d(rootActions.authActions.loadUser.request(null))
  }, [])
  const alerts: IAlertObject[] = useSelector(rootSelectors.alerts.alerts)
  return (
    <div className="App">
      <Router>
        <Layout>
          <Header>
            <CustomHeader></CustomHeader>
          </Header>
          <Content>
            <Alert alertsArray={alerts} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Content>
        </Layout>
      </Router>
    </div>
  )
}

export default App
