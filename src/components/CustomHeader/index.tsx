import './styles.less'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import rootSelectors from '../../store/rootSelectors'
import rootActions from '../../store/rootActions'

export default function CustomHeader() {
  const isAuthenticated = useSelector(rootSelectors.auth.isAuthenticated)
  const loading = useSelector(rootSelectors.auth.loading)
  const d = useDispatch()

  const logout = () => {
    d(rootActions.authActions.logout())
  }

  const authLinks = (
    <Fragment>
      <Menu.Item key="1">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          {'   '}
          <span className="hide-sm">Logout</span>
        </a>
      </Menu.Item>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <Menu.Item key="1">
        <Link to="#!">Developers</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <Link to="/register">Register</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link to="/login">Login</Link>
      </Menu.Item>
    </Fragment>
  )
  return (
    <div id="header-wrapper">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
        <Menu.Item key="0">
          <Link to="/">
            <i className="fas fa-code"></i> Devconnector
          </Link>
        </Menu.Item>
        {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </Menu>
    </div>
  )
}
