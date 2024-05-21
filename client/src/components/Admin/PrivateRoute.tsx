import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

type PrivateRouterProps = {
  children?: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouterProps> = ({ children }) => {
  const { isAuth } = useContext(AuthContext)
  return (
    <>{isAuth !== null && <>{isAuth ? children : <Navigate to="/" />}</>}</>
  )
}
export default PrivateRoute
