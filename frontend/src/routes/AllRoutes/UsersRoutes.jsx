import React from 'react'
import UserLayout from '../../layout/UserLayout'
import { Route,Routes } from 'react-router-dom'
import UserPosts from '../../pages/UserDashboardPage/UsersPosts'

function UsersRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<UserLayout />} >
        <Route index element={<UserPosts />} />
      </Route>
    </Routes>
  )
}

export default UsersRoutes
