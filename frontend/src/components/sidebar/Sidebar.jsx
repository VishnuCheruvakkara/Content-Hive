// components/Admin/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const Sidebar = ({
    menuItems = [],
    title = "Admin Panel",
    subtitle = "Manage your content",
    userInfo = null,
    defaultOpen = true,
    // SIMPLIFIED: Just one prop for sidebar state
    sidebarOpen = null,
    onToggleClick = null
}) => {

    // If parent provides sidebarOpen, use it. Otherwise, use defaultOpen
    const isOpen = sidebarOpen !== null ? sidebarOpen : defaultOpen;

    // On mobile, we want to close sidebar when clicking a link
    const handleLinkClick = () => {
        if (onToggleClick) onToggleClick();
    };

    // On mobile, we also want to close when clicking overlay
    const handleOverlayClick = () => {
        if (onToggleClick) {
            onToggleClick();
        }
    };

    return (
        <>
            {/* Sidebar Overlay — ALWAYS visible when open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:bg-transparent lg:backdrop-blur-none"
                    onClick={handleOverlayClick}
                />
            )}
            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 lg:top-0 top-[70px] z-40 ${isOpen ? "w-64" : "w-20"
                    } bg-linear-to-r from-brand-2/40 to-brand-2/80 transform transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="h-full overflow-y-auto py-8 px-4 flex flex-col">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div className={`${!isOpen && "flex justify-center w-full"}`}>
                            {isOpen && (
                                <>
                                    <h2 className="text-2xl font-bold">{title}</h2>
                                    {subtitle && (
                                        <p className="text-gray-300 text-sm mt-2">{subtitle}</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-2 flex-1">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center ${isOpen ? "space-x-3 px-4" : "justify-center px-2"
                                    } py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-brand-1 text-white"
                                        : "hover:bg-brand-1 hover:bg-opacity-50"
                                    }`
                                }
                                title={!isOpen ? item.name : ""}
                                onClick={handleLinkClick}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {isOpen && (
                                    <span className="font-medium">{item.name}</span>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Info Section */}
                    {userInfo && (
                        <div className="mt-10 pt-6 border-t border-gray-700">
                            <div className={`px-4 ${!isOpen && "text-center"}`}>
                                {isOpen ? (
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
    defaultOpen: PropTypes.bool,
    sidebarOpen: PropTypes.bool, // SIMPLIFIED: Just one prop
    onToggleClick: PropTypes.func,
};

export default Sidebar;