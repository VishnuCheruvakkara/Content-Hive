import React from 'react'
import PublicRoutes from './AllRoutes/PublicRoutes'
import UsersRoutes from './AllRoutes/UsersRoutes'
import AdminRoutes from './AllRoutes/AdminRoutes'

function RouterConfig() {
  return (
    <div>
      <PublicRoutes/>
      <UsersRoutes/>
      <AdminRoutes/>
    </div>
  )
}

export default RouterConfig
