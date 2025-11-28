import React, { useState } from "react";
import Header from "../../components/Landing/Header";
import Footer from "../../components/Landing/Footer";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import GoogleButton from "../../components/ui/GoogleButton";
import { Link } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";

function UserSignup() {
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    return (
        <>
            <Header />

            <div className="min-h-screen flex items-center justify-center bg-brand-1 text-white px-4 py-20">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-center mb-2">Create an Account</h2>
                    <p className="text-center text-white/70 mb-8">Join ContentHive today</p>

                    {/* Signup Form */}
                    <form className="space-y-5">

                        {/* Username */}
                        <InputField
                            label="Username"
                            placeholder="Choose a username"
                            leftIcon={<FaUser />}
                        />

                        {/* Email */}
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            leftIcon={<MdEmail />}
                        />

                        {/* Password */}
                        <InputField
                            label="Password"
                            type={showPass1 ? "text" : "password"}
                            placeholder="Create password"
                            leftIcon={<RiLockPasswordFill />}
                            rightIcon={
                                showPass1 ? (
                                    <FiEyeOff onClick={() => setShowPass1(false)} />
                                ) : (
                                    <FiEye onClick={() => setShowPass1(true)} />
                                )
                            }
                        />

                        {/* Confirm Password */}
                        <InputField
                            label="Confirm Password"
                            type={showPass2 ? "text" : "password"}
                            placeholder="Re-enter password"
                            leftIcon={<RiLockPasswordFill />}
                            rightIcon={
                                showPass2 ? (
                                    <FiEyeOff onClick={() => setShowPass2(false)} />
                                ) : (
                                    <FiEye onClick={() => setShowPass2(true)} />
                                )
                            }
                        />

                        {/* Signup Button */}
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-white/40 text-sm">OR</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    {/* Google Button */}
                    <GoogleButton />

                    {/* Login Link */}
                    <p className="text-center text-white/70 text-sm mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-brand-4 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default UserSignup;
