import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";
import Sidebar from "../components/sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

import {
  FaHome,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaCog
} from "react-icons/fa";

export default function UserLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  // User Menu Items
  const menuItems = [
    { path: "/user", name: "Home", icon: <FaHome /> },
    { path: "/user/favorites", name: "Favorites", icon: <FaHeart /> },
    { path: "/user/cart", name: "Cart", icon: <FaShoppingCart /> },
    { path: "/user/profile", name: "Profile", icon: <FaUser /> },
    { path: "/user/settings", name: "Settings", icon: <FaCog /> }
  ];

  const userInfo = {
    name: user?.username,
    email: user?.email,
    label: "User Account"
  };

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-brand-1 text-white flex flex-col">
      
      {/* Pass Sidebar Toggle Button to Header */}
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar} />

      <div className="flex flex-1">
        
        {/* Reusable Sidebar */}
        <Sidebar
          menuItems={menuItems}
          title="User Panel"
          subtitle="Manage your account"
          userInfo={userInfo}
          defaultOpen={false}
          sidebarOpen={sidebarOpen}
          onToggleClick={handleToggleSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

      <Footer />
    </div>
  );
}
