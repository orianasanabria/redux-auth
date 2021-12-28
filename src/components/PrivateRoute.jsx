import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = ({ firebaseUser }) => {
  return firebaseUser ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
