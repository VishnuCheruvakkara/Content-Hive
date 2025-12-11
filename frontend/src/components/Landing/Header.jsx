import React from 'react'
import Button from '../ui/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import publicAxios from '../../axios/PublicAxios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { logoutSuccess } from '../../redux/Slice/userAuthSlice'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { MdLogout } from "react-icons/md";

function Header({ sidebarOpen, onToggleSidebar }) {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const showLandingNav = location.pathname === "/";

    const handleLogout = async () => {
        try {
            await publicAxios.post("/users/logout/");
            dispatch(logoutSuccess());
            toast.success("Logged out successfully");
            navigate("/login");

        } catch (err) {
            toast.error("Something went wrong while logging out.");
        }
    };

    return (
        <header className="w-full sticky top-0 z-50 bg-brand-1/95 backdrop-blur-md bg-linear-to-r from-brand-2/30 to-brand-3/20">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">


                <div className="flex items-center gap-4">
                    {/* Sidebar Toggle Button */}
                    {isAuthenticated &&
                        (
                            <button
                                onClick={onToggleSidebar}
                                className="p-2 cursor-pointer rounded-md border border-brand-1 shadow-md shadow-black/60 bg-brand-2 hover:bg-brand-1 transition-colors"
                                title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                            >

                                {sidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                            </button>
                        )
                    }

                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white  flex items-center justify-center overflow-hidden shadow-black/50 shadow-md">
                            <img
                                src="/content_hive_icon.svg"
                                alt="ContentHive Logo"
                                className="w-8 h-8 object-contain"
                            />
                        </div>

                        <div className="text-white font-semibold tracking-wide">
                            ContentHive
                        </div>
                    </Link>

                </div>

                {!isAuthenticated && showLandingNav && (
                    <nav className="hidden md:flex items-center gap-6 text-sm text-white/90">
                        <a href="#features" className="hover:text-brand-4 transition">Features</a>
                        <a href="#modules" className="hover:text-brand-4 transition">Modules</a>
                        <a href="#pricing" className="hover:text-brand-4 transition">Pricing</a>
                        <a href="#contact" className="hover:text-brand-4 transition">Contact</a>
                    </nav>
                )}

                <div className="hidden md:flex items-center gap-3">
                    {!isAuthenticated ? (
                        <>
                            <Button
                                onClick={() => navigate("/login")}
                                className="px-4 py-2 rounded-lg bg-brand-4 transition font-medium"
                            >
                                Login
                            </Button>

                            <Button
                                onClick={() => navigate("/signup")}
                                className="px-4 py-2 rounded-lg border bg-transparent border-brand-4 text-brand-4 hover:bg-brand-4 hover:text-brand-1 transition font-medium"
                            >
                                Sign up
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">

                            {/* User Icon + Username */}
                            {user && (
                                <div className="flex items-center gap-3  border p-1 rounded-xl pr-4 border-white/40 cursor-pointer ">
                                    <div className="w-8 h-8 rounded-lg bg-brand-3 text-white flex items-center justify-center font-bold">
                                        {user?.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-white font-semibold">
                                        {user?.username}
                                    </span>
                                </div>
                            )}

                            {/* Logout Button */}
                            <Button
                                icon={MdLogout}
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-lg bg-brand-4 transition font-medium"
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    {!isAuthenticated && (
                        <Button
                            onClick={() => navigate("/login")}
                            className="px-4 py-2 rounded-lg bg-brand-4 transition font-medium"
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
