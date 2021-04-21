import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import rootActions from '../../store/rootActions'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './styles.less'
import rootSelectors from '../../store/rootSelectors'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Dashboard = () => {
  const profile = useSelector(rootSelectors.profile.profile)
  const loading = useSelector(rootSelectors.profile.loading)
  const d = useDispatch()
  useEffect(() => {
    d(rootActions.profileActions.getCurrentProfile.request())
  }, [])
  return loading && profile === null ? <Spin indicator={antIcon} /> : <Fragment>TEST</Fragment>
}

export default Dashboard
