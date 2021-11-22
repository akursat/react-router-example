import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Users from './pages/Users'
import Dashboard from './pages/Dashboard'
import { ROLE } from './features/auth/auth'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectCurrentUser, selectIsAuthenticated } from 'features/auth/authSlice'

function Header() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="header-wrapper">
      <div className="header">
        <div className="header-logo">Private Route Example</div>
        <div className="header-nav">
          <Link className="link" to="/">
            Login
          </Link>
          <Link className="link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="link" to="/users">
            Users
          </Link>
        </div>
        {isAuthenticated && (
          <div className="header-info">
            <span>
              Name:{user?.first_name} {user?.last_name}
            </span>
            <span>Role:{user?.role}</span>
            <a className="link" onClick={handleLogout}>
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="dashboard"
          element={<PrivateRoute roles={[ROLE.ADMIN]} component={Dashboard} />}
        />
        <Route
          path="users"
          element={<PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={Users} />}
        />
      </Routes>
    </div>
  )
}

export default App
