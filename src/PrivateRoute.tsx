import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'
import AccessDenied from './pages/AccessDenied'
import { ROLE } from './features/auth/auth'
import { selectCurrentUser, selectIsAuthenticated } from './features/auth/authSlice'

interface Props {
  element: React.ReactElement
  path?: string
  roles: Array<ROLE>
}

const PrivateElement: React.FC<Props> = ({ element, roles }) => {
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const userHasRequiredRole = user && roles.includes(user.role) ? true : false

  if (isAuthenticated && userHasRequiredRole) {
    return element
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />
  }

  return <Navigate to="/" />
}

export const PrivateRoute: React.FC<Props> = ({ element, roles, ...rest }) => {
  return <Route {...rest} element={<PrivateElement element={element} roles={roles} />} />
}
