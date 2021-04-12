import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from 'antd'

const { Header, Content } = Layout

import './styles.less'
import CustomHeader from '../components/CustomHeader'
import Landing from './Landing'

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Header>
            <CustomHeader></CustomHeader>
          </Header>
          <Content>
            <Route exact path="/" component={Landing} />
          </Content>
        </Layout>
      </Router>
    </div>
  )
}

export default App
