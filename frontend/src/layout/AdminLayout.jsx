import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";
import Sidebar from "../components/sidebar/Sidebar";
import {
    FaTachometerAlt,
    FaNewspaper,
    FaUsers,
    FaComment,
    FaThumbsUp,
    FaCog,
    FaChartBar
} from "react-icons/fa";

function AdminLayout() {

    const menuItems = [
        { path: "/admin", name: "Dashboard", icon: <FaTachometerAlt /> },
        { path: "/admin/posts", name: "Manage Posts", icon: <FaNewspaper /> },
        { path: "/admin/users", name: "Manage Users", icon: <FaUsers /> },
        { path: "/admin/comments", name: "Comments", icon: <FaComment /> },
        { path: "/admin/likes", name: "Likes", icon: <FaThumbsUp /> },
        { path: "/admin/analytics", name: "Analytics", icon: <FaChartBar /> },
        { path: "/admin/settings", name: "Settings", icon: <FaCog /> },
    ];

    // User info
    const userInfo = {
        name: "John Doe",
        email: "john@example.com",
        label: "Admin User"
    };


    return (
        <div className="min-h-screen bg-brand-1 text-white flex flex-col">
            <Header />

            <div className="flex flex-1 pt-16">
                {/* Reusable Sidebar Component */}
                <Sidebar
                    menuItems={menuItems}
                    title="Admin Panel"
                    subtitle="Manage your content"
                    userInfo={userInfo}
                    showMobileToggle={true}
                    defaultOpen={true}
                />

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        {/* This is where nested route components will render */}
                        <Outlet />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    )
}

export default AdminLayout
