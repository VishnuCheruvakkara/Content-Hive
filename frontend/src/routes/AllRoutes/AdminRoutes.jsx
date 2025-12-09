import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import AdminDashboard from '../../pages/AdminDashboardPages/AdminDashboard'
import { Route, Routes } from 'react-router-dom'
import AdminBlogManagement from '../../pages/AdminDashboardPages/AdminBlogManagement'
import BlogDetailsPage from '../../pages/BlogPage/BlogDetailsPage'
import BlogEditPage from '../../pages/BlogPage/BlogEditPage'
import BlogCreatePage from '../../pages/BlogPage/BlogCreatePage'

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="blogs" element={<AdminBlogManagement />} />
        <Route path="blog-details/:id" element={<BlogDetailsPage />} />
        <Route path="edit-blog/:id" element={<BlogEditPage />} />
        <Route path="create-article" element={<BlogCreatePage />} />

      </Route>
    </Routes>
  )
}

export default AdminRoutes
