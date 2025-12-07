import React from 'react'
import UserLayout from '../../layout/UserLayout'
import { Route, Routes } from 'react-router-dom'
import UserPosts from '../../pages/UserDashboardPage/UsersPosts'
import BlogCreatePage from '../../pages/BlogPage/BlogCreatePage'
import BlogDetailsPage from '../../pages/BlogPage/BlogDetailsPage'
import BlogEditPage from '../../pages/BlogPage/BlogEditPage'

function UsersRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<UserLayout />} >
        <Route index element={<UserPosts />} />
        <Route path="create-article" element={<BlogCreatePage />} />
        <Route path="blogs/:id" element={<BlogDetailsPage />} />
        <Route path="edit-blog/:id" element={<BlogEditPage />} />

      </Route>
    </Routes>
  )
}

export default UsersRoutes
