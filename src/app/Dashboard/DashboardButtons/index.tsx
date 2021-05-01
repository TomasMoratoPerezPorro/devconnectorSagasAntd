import React from 'react'
import { Button } from 'antd'
import './styles.less'
import { Link } from 'react-router-dom'

const DashboardButtons = () => {
  return (
    <div>
      <Link to="/edit-profile">
        <Button type="primary" className="dashboardButton">
          <i className="fas fa-user-circle "></i> Edit Profile
        </Button>
      </Link>
      <Link to="/add-experience">
        <Button type="primary" className="dashboardButton">
          <i className="fab fa-black-tie "></i> Add Experience
        </Button>
      </Link>
      <Button type="primary" className="dashboardButton">
        <i className="fas fa-graduation-cap "></i> Add Education
      </Button>
    </div>
  )
}

export default DashboardButtons
