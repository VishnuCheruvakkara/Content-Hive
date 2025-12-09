import React,{useState} from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";
import Sidebar from "../components/sidebar/Sidebar";
import useAuth from "../hooks/useAuth";
import { MdOutlineDashboard } from "react-icons/md";

import {
    FaTachometerAlt,
    FaNewspaper,
    FaUsers,
} from "react-icons/fa";

function AdminLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useAuth();

    const menuItems = [
        { path: "/admin/dashboard", name: "Dashboard", icon: <MdOutlineDashboard />,end:true },
        { path: "/admin/dashboard/blogs", name: "Manage Blogs", icon: <FaNewspaper /> },
        { path: "/admin/dashboard/user-management", name: "Manage Users", icon: <FaUsers /> },
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
