import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'antd'
import './styles.less'
import { useSelector } from 'react-redux'
import rootSelectors from '../../store/rootSelectors'

const Landing = () => {
  const isAuthenticated = useSelector(rootSelectors.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from other developers
          </p>
          <div className="buttons">
            <Button className="loginButton">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </Button>
            <Button className="loginButton">
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
