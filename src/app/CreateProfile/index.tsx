import React from 'react'
import { withRouter } from 'react-router-dom'
import ProfileForm from '../EditProfile/ProfileForm'
import './styles.less'

const CreateProfile = () => {
  return (
    <div className="editProfileContainer">
      <div>
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let s get some information to make your profile stand out
        </p>
      </div>
      <ProfileForm isEdit={false} />
    </div>
  )
}

export default withRouter(CreateProfile)
