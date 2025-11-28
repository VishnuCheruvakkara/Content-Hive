import React,{useState} from "react";
import Header from "../../components/Landing/Header";
import Footer from "../../components/Landing/Footer";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import GoogleButton from "../../components/ui/GoogleButton";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";

function UserLogin() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Header />

            <div className="min-h-screen flex items-center justify-center bg-brand-1 text-white px-4">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-center mb-2">ContentHive</h2>
                    <p className="text-center text-white/70 mb-8">Sign in to your account</p>

                    {/* Login Form */}
                    <form className="space-y-5">

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
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            leftIcon={<RiLockPasswordFill />}
                            rightIcon={
                                showPassword
                                    ? <FiEyeOff onClick={() => setShowPassword(false)} />
                                    : <FiEye onClick={() => setShowPassword(true)} />
                            }
                        />

                        {/* Login Button */}
                        <Button type="submit" className="w-full">Login</Button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-white/40 text-sm">OR</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    {/* Google Login Button */}
                    <GoogleButton />

                    {/* Signup Link */}
                    <p className="text-center text-white/70 text-sm mt-6">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-brand-4 font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default UserLogin;

