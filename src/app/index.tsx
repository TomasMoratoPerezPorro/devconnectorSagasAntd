import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from 'antd'

const { Header, Content } = Layout

import './styles.less'
import CustomHeader from '../components/CustomHeader'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import Alert from '../components/AlertList'
import { useSelector } from 'react-redux'
import { IAlertObject } from '../store/alert/actions'
import rootSelectors from '../store/rootSelectors'

function App() {
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
          </Content>
        </Layout>
      </Router>
    </div>
  )
}

export default App
