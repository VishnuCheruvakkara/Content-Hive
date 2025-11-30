import React from 'react'
import MobileMenu from './MobileMenu'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import publicAxios from '../../axios/PublicAxios'
import toast from 'react-hot-toast'

function Header() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await publicAxios.post("/users/logout/");
            localStorage.removeItem("access");
            toast.success("Logged out successfully");
            navigate("/login");
            
        } catch (err) {
            toast.error("Something went wrong while logging out.");
        }
    };

    return (
        <header className="w-full sticky top-0 z-50 bg-brand-1/95 backdrop-blur-md bg-linear-to-r from-brand-2/30 to-brand-3/20">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-4 flex items-center justify-center text-brand-1 font-bold">CH</div>
                    <div className="text-white font-semibold tracking-wide">ContentHive</div>
                </a>

                <nav className="hidden md:flex items-center gap-6 text-sm text-white/90">
                    <a href="#features" className="hover:text-brand-4 transition">Features</a>
                    <a href="#modules" className="hover:text-brand-4 transition">Modules</a>
                    <a href="#pricing" className="hover:text-brand-4 transition">Pricing</a>
                    <a href="#contact" className="hover:text-brand-4 transition">Contact</a>
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    {/* <a href="/login" className="px-4 py-2 rounded-lg bg-brand-3 hover:bg-brand-2 transition font-medium">Login</a> */}
                    <Button onClick={() => navigate("/login")} className="px-4 py-2 rounded-lg bg-brand-4 transition font-medium">
                        Login
                    </Button>
                    <Button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-brand-4 transition font-medium">
                        Logout
                    </Button>
                    <Button onClick={() => navigate("/signup")} className="px-4 py-2 rounded-lg border bg-transparent border-brand-4 text-brand-4 hover:bg-brand-4 hover:text-brand-1 transition font-medium">Sign up</Button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <MobileMenu />
                </div>
            </div>
        </header>
    )
}

export default Header
