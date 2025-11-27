import React from "react";
import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";

function UserSignup() {
    return (
        <>
            <Header/>
            <div className="min-h-screen flex items-center justify-center bg-brand-1 text-white px-4">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-center mb-2">Create an Account</h2>
                    <p className="text-center text-white/70 mb-8">Join ContentHive today</p>

                    {/* Signup Form */}
                    <form className="space-y-5">

                        {/* Username */}
                        <div>
                            <label className="block mb-1 font-medium">Username</label>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-4"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-4"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-1 font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Create password"
                                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-4"
                            />
                        </div>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-3 rounded-xl bg-brand-4 text-brand-1 font-semibold shadow-lg hover:scale-[.98] transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* OR Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-white/40 text-sm">OR</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    {/* Google Login Button */}
                    <button className="w-full px-4 py-3 rounded-xl bg-white text-brand-1 font-semibold shadow-md flex items-center justify-center gap-3 hover:bg-white/90 transition">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-white/70 text-sm mt-6">
                        Already have an account?{" "}
                        <a href="/login" className="text-brand-4 font-semibold hover:underline">
                            Login
                        </a>
                    </p>

                </div>
            </div>
        <Footer/>
        </>
    );
}

export default UserSignup;
