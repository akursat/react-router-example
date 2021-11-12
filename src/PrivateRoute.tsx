import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import AccessDenied from './pages/AccessDenied'
import { ROLE } from './features/auth/auth'
import { selectCurrentUser, selectIsAuthenticated } from './features/auth/authSlice'

interface Props {
  children: JSX.Element
  path?: string
  roles: Array<ROLE>
}

export const PrivateRoute: React.FC<Props> = ({ children, roles }) => {
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const userHasRequiredRole = user && roles.includes(user.role) ? true : false

  if (isAuthenticated && userHasRequiredRole) {
    return children
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />
  }

  return <Navigate to="/" />
}
