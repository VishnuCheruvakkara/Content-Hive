import React from 'react'
import { Route,Routes } from "react-router-dom";
// import the pages 
import LandingPage from '../../pages/PublicPages/LandingPage';
import UserLogin from '../../pages/PublicPages/UserLogin';
import AdminLogin from '../../pages/PublicPages/AdminLogin';
import UserSignup from '../../pages/PublicPages/UserSignUp';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<UserLogin/>} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  )
}

export default PublicRoutes
