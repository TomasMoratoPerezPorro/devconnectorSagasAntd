import React from 'react'
import { Button } from 'antd'

const DashboardButtons = () => {
  return (
    <div>
      <Button type="primary">
        <i className="fas fa-user-circle "></i> Edit Profile
      </Button>
      <Button type="primary">
        <i className="fab fa-black-tie "></i> Add Experience
      </Button>
      <Button type="primary">
        <i className="fas fa-graduation-cap "></i> Add Education
      </Button>
    </div>
  )
}

export default DashboardButtons
