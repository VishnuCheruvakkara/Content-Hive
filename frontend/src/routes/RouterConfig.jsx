import React from 'react'
import PublicRoutes from './AllRoutes/PublicRoutes'
import UsersRoutes from './AllRoutes/UsersRoutes'
import AdminRoutes from './AllRoutes/AdminRoutes'
import { Routes,Route } from 'react-router-dom'

function RouterConfig() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/user/*" element={<UsersRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  )
}

export default RouterConfig
