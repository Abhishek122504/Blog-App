import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router'


const AuthLayout = () => {
  const { authLoading, isLoggedIn } = useSelector(state => state.auth);

  if (authLoading) return;

  if (isLoggedIn) {
      return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default AuthLayout
