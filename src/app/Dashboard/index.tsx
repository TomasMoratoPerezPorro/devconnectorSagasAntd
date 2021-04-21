import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import rootActions from '../../store/rootActions'
import { Button, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './styles.less'
import rootSelectors from '../../store/rootSelectors'
import { Link } from 'react-router-dom'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Dashboard = () => {
  const profile = useSelector(rootSelectors.profile.profile)
  const loading = useSelector(rootSelectors.profile.loading)
  const user = useSelector(rootSelectors.auth.user)
  const d = useDispatch()
  useEffect(() => {
    d(rootActions.profileActions.getCurrentProfile.request())
  }, [])

  const hasProfile = <Fragment>HAS</Fragment>

  const noProfile = (
    <Fragment>
      <p>You have not yet setup your profile, please add some info</p>
      <Link to="/create-profile" className="btn btn-primery my-1">
        <Button type="primary" htmlType="submit">
          Create Profile
        </Button>
      </Link>
    </Fragment>
  )

  return loading && profile === null ? (
    <Spin indicator={antIcon} />
  ) : (
    <div className="dashboardContainer">
      <h1>Dashboard</h1>
      <p>
        <i className="fas fa-user">Welcome {user && user.name} </i>
      </p>
      {profile != null ? hasProfile : noProfile}
    </div>
  )
}

export default Dashboard
