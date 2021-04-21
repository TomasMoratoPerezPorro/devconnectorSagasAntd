import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import rootSelectors from '../../store/rootSelectors'

export interface IRoute {
  path: string
  component: React.ComponentType<any>
}

const PrivateRoute = ({ component: Component, ...rest }: IRoute) => {
  const isAuthenticated = useSelector(rootSelectors.auth.isAuthenticated)
  const loading = useSelector(rootSelectors.auth.loading)
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  )
}

export default PrivateRoute
