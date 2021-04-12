import './styles.less'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

export default function CustomHeader() {
  return (
    <div id="header-wrapper">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
        <Menu.Item key="0">
          <Link to="/">
            <i className="fas fa-code"></i> Devconnector
          </Link>
        </Menu.Item>
        <Menu.Item key="1">Developers</Menu.Item>
        <Menu.Item key="2">Register</Menu.Item>
        <Menu.Item key="3">Login</Menu.Item>
      </Menu>
    </div>
  )
}
