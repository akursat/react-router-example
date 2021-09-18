import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
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
            Home
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
        <PrivateRoute path="dashboard" element={<Dashboard />} roles={[ROLE.ADMIN]} />
        <PrivateRoute path="users" element={<Users />} roles={[ROLE.ADMIN, ROLE.USER]} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
