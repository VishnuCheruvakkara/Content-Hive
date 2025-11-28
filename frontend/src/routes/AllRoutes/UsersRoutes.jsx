import React from 'react'
import UserLayout from '../../layout/UserLayout'
import { Route, Routes } from 'react-router-dom'
import UserPosts from '../../pages/UserDashboardPage/UsersPosts'

function UsersRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/user" element={<UserLayout />} >
          <Route index element={<UserPosts/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default UsersRoutes
