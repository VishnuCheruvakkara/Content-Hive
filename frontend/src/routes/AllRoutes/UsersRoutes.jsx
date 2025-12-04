import React from 'react'
import UserLayout from '../../layout/UserLayout'
import { Route,Routes } from 'react-router-dom'
import UserPosts from '../../pages/UserDashboardPage/UsersPosts'
import BlogCreatePage from '../../pages/BlogPage/BlogCreatePage'

function UsersRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<UserLayout />} >
        <Route index element={<UserPosts />} />
        <Route path="create-article" element={<BlogCreatePage />} />

      </Route>
    </Routes>
  )
}

export default UsersRoutes
