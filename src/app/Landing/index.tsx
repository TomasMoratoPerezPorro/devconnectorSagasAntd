import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import './styles.less'

const Landing = () => {
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
