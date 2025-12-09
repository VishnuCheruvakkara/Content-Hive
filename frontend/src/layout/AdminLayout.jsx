import React,{useState} from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";
import Sidebar from "../components/sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

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

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useAuth();

    const menuItems = [
        { path: "/", name: "Dashboard", icon: <FaTachometerAlt />,end:true },
        { path: "/admin/dashboard/blogs", name: "Manage Blogs", icon: <FaNewspaper /> },
        { path: "/admin/users", name: "Manage Users", icon: <FaUsers /> },
        { path: "/admin/comments", name: "Comments", icon: <FaComment /> },
        { path: "/admin/likes", name: "Likes", icon: <FaThumbsUp /> },
        { path: "/admin/analytics", name: "Analytics", icon: <FaChartBar /> },
        { path: "/admin/settings", name: "Settings", icon: <FaCog /> },
    ];

    // User info
    const userInfo = {
        name: user?.username,
        email: user?.email,
        label: "Admin User"
    };

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };


    return (
        <div className="min-h-screen bg-brand-1 text-white flex flex-col">
            <Header sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar}/>

            <div className="flex flex-1 ">
                {/* Reusable Sidebar Component */}
                <Sidebar
                    menuItems={menuItems}
                    title="Admin Panel"
                    subtitle="Manage your content"
                    userInfo={userInfo}
                    showMobileToggle={true}
                    defaultOpen={true}
                    sidebarOpen={sidebarOpen}
                    onToggleClick={handleToggleSidebar}
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
