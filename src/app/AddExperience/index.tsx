import React from 'react'
import AddExperienceForm from './AddExperienceForm'
import './styles.less'

const AddExperience = () => {
  return (
    <div className="AddEducationContainer">
      <div>
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let s get some information to make your profile stand out
        </p>
      </div>

      <AddExperienceForm />
    </div>
  )
}

export default AddExperience
