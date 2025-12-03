// components/Admin/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import PropTypes from 'prop-types';

const Sidebar = ({
    menuItems = [],
    title = "Admin Panel",
    subtitle = "Manage your content",
    userInfo = null,
    showMobileToggle = true,
    defaultOpen = true
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(defaultOpen);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

    return (
        <>
            {/* Mobile Menu Button */}
            {showMobileToggle && (
                <button
                    className="lg:hidden fixed top-[18px] left-4 z-50 p-2 rounded-md border border-brand-1 shadow-md shadow-black/60 bg-brand-2 "
                    onClick={toggleMobileSidebar}
                >
                    {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            )}

            {/* Sidebar Overlay for mobile */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 top-[70px] z-40 ${sidebarOpen ? "w-64" : "w-20"
                    } bg-brand-2 transform transition-all duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="h-full overflow-y-auto py-8 px-4 flex flex-col">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div className={`${!sidebarOpen && "flex justify-center w-full"}`}>
                            {sidebarOpen ? (
                                <>
                                    <h2 className="text-2xl font-bold">{title}</h2>
                                    {subtitle && (
                                        <p className="text-gray-300 text-sm mt-2">{subtitle}</p>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </div>

                        {/* Desktop Toggle Button */}
                        <button
                            className="hidden lg:block p-2 hover:bg-brand-1 rounded-lg transition-colors"
                            onClick={toggleSidebar}
                            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                        >
                            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>

                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-2 flex-1">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center ${sidebarOpen ? "space-x-3 px-4" : "justify-center px-2"
                                    } py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-brand-1 text-white"
                                        : "hover:bg-brand-1 hover:bg-opacity-50"
                                    }`
                                }
                                title={!sidebarOpen ? item.name : ""}
                                onClick={() => setMobileOpen(false)}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {sidebarOpen && (
                                    <span className="font-medium">{item.name}</span>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Info Section */}
                    {userInfo && (
                        <div className="mt-10 pt-6 border-t border-gray-700">
                            <div className={`px-4 ${!sidebarOpen && "text-center"}`}>
                                {sidebarOpen ? (
                                    <>
                                        <p className="text-sm text-gray-400">{userInfo.label || "Logged in as:"}</p>
                                        <p className="font-semibold">{userInfo.name}</p>
                                        {userInfo.email && (
                                            <p className="text-sm text-gray-300">{userInfo.email}</p>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-brand-1 flex items-center justify-center mb-2">
                                            <span className="font-bold">
                                                {userInfo.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

// PropTypes for better development experience
Sidebar.propTypes = {
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            icon: PropTypes.node.isRequired,
        })
    ),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    userInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        label: PropTypes.string,
    }),
    showMobileToggle: PropTypes.bool,
    defaultOpen: PropTypes.bool,
};

export default Sidebar;