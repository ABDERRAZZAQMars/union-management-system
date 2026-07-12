import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AuthRequire = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user || !user.token) {
    return <Navigate to='/' replace={true} />
  }

  return <Outlet />
}

export default AuthRequire