import React from 'react'
import PublicRoutes from './AllRoutes/PublicRoutes'
import UsersRoutes from './AllRoutes/UsersRoutes'
import AdminRoutes from './AllRoutes/AdminRoutes'
import { Routes, Route } from 'react-router-dom'

import AdminRouteProtection from './ProtectedRoutes/AdminRouteProtection'
import UserRouteProtection from './ProtectedRoutes/UserRouteProtection'
import PublicRouteProtection from './ProtectedRoutes/PublicRouteProtection'

function RouterConfig() {
  return (
    <Routes>
      <Route element={<PublicRouteProtection />}>
        <Route path="/*" element={<PublicRoutes />} />
      </Route>

      <Route element={<UserRouteProtection />}>
        <Route path="/user/*" element={<UsersRoutes />} />
      </Route>

      <Route element={<AdminRouteProtection />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>
    </Routes>
  )
}

export default RouterConfig
