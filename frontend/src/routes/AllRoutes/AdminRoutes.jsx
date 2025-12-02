import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import AdminDashboard from '../../pages/AdminDashboardPages/AdminDashboard'
import { Route,Routes } from 'react-router-dom'

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
