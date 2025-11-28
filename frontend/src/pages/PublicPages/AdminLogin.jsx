import React from "react";
import Header from "../../components/Landing/Header";
import Footer from "../../components/Landing/Footer";

function AdminLogin() {
    return (
        <>
            <Header/>
            <div className="min-h-screen flex items-center justify-center bg-brand-1 text-white px-4">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">

                    {/* Title */}
                    <h2 className="text-3xl font-extrabold text-center mb-2">Admin Panel</h2>
                    <p className="text-center text-white/70 mb-8">Secure Admin Login — ContentHive</p>

                    {/* Login Form */}
                    <form className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-medium">Admin Email</label>
                            <input
                                type="email"
                                placeholder="admin@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-4"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-1 font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-4"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-3 rounded-xl bg-brand-4 text-brand-1 font-semibold shadow-lg hover:scale-[.98] transition"
                        >
                            Login as Admin
                        </button>
                    </form>

                    {/* Info */}
                    <p className="text-center text-white/60 text-sm mt-6">
                        This section is limited to authorized administrators only.
                    </p>

                    {/* Return to User Login */}
                    <p className="text-center text-white/70 text-sm mt-4">
                        Not an admin?{" "}
                        <a href="/login" className="text-brand-4 font-semibold hover:underline">
                            Go to User Login
                        </a>
                    </p>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default AdminLogin;
