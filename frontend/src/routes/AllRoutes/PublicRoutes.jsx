import React from 'react'
import { Route, Routes } from "react-router-dom";

// import the pages 
import LandingPage from '../../pages/LandingPage';
import UserLogin from '../../pages/UserLogin';
import AdminLogin from '../../pages/AdminLogin';
import UserSignUp from '../../pages/UserSignUp';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<UserLogin/>} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  )
}

export default PublicRoutes
