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
    sidebarOpen = null,
    onToggleClick = null
}) => {

    const isOpen = sidebarOpen !== null ? sidebarOpen : defaultOpen;

   
    const handleLinkClick = () => {
       
        if (window.innerWidth < 1024 && onToggleClick) {
            onToggleClick();
        }
    };

    
    const handleOverlayClick = () => {
        
        if (window.innerWidth < 1024 && onToggleClick) {
            onToggleClick();
        }
    };

    return (
        <>
            {/* Sidebar Overlay — Only visible on mobile when open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={handleOverlayClick}
                />
            )}
            
            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky h-[calc(100vh-70px)] lg:h-screen inset-y-0 left-0 lg:top-0 top-[70px] z-40 ${isOpen ? "w-64" : "w-20"
                    } bg-linear-to-r from-brand-2/40 to-brand-2/80 transform transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
                    }`}
            >
                <div className="h-full overflow-y-auto py-8 px-4 flex flex-col">
                    {/* Sidebar Header */}
                    <div className={`flex items-center ${isOpen ? "justify-between" : "justify-center"} mb-10`}>
                        {isOpen ? (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold">{title}</h2>
                                    {subtitle && (
                                        <p className="text-gray-300 text-sm mt-2">{subtitle}</p>
                                    )}
                                </div>
                                {/* Toggle button - only visible on desktop when sidebar is open */}
                                <button
                                    onClick={() => onToggleClick && onToggleClick()}
                                    className="hidden lg:block p-2 hover:bg-brand-1/30 rounded-lg transition-colors"
                                    title="Toggle sidebar"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            // Collapsed header
                            <button
                                onClick={() => onToggleClick && onToggleClick()}
                                className="p-2 hover:bg-brand-1/30 rounded-lg transition-colors"
                                title="Expand sidebar"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-2 flex-1">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end || false}
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
                                <span className="text-lg shrink-0">{item.icon}</span>
                                {isOpen && (
                                    <span className="font-medium truncate">{item.name}</span>
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
                                        <p className="font-semibold truncate">{userInfo.name}</p>
                                        {userInfo.email && (
                                            <p className="text-sm text-gray-300 truncate">{userInfo.email}</p>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div 
                                            className="w-8 h-8 rounded-full bg-brand-1 flex items-center justify-center mb-2 cursor-pointer hover:bg-brand-1/80 transition-colors"
                                            title={userInfo.name}
                                        >
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
            end: PropTypes.bool,
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
    sidebarOpen: PropTypes.bool,
    onToggleClick: PropTypes.func,
};

export default Sidebar;