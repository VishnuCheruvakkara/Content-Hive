import React, { useState } from "react";
import Header from "../../components/Landing/Header";
import Footer from "../../components/Landing/Footer";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import GoogleAuthButton from "../../components/ui/GoogleAuthButton";
import { Link } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import publicAxios from "../../axios/PublicAxios";

import toast from 'react-hot-toast';
import SignupSchema from "../../validations/SignupSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/Slice/userAuthSlice";
import Spinner from "../../components/ui/Spinner";

function UserSignup() {
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const handleSignupSubmit = async (values, { setSubmitting, resetForm }) => {
        setLoading(true);
        try {
            const res = await publicAxios.post("/users/sign-up/", {
                username: values.username,
                email: values.email,
                password: values.password,
            });

            dispatch(
                loginSuccess({
                    access: res.data.data.access,
                    user: {
                        id: res.data.data.id,
                        username: values.username,
                        email: values.email,
                        is_admin: false,
                    },
                })
            );
            toast.success("Account created, Welcome...")
            resetForm();
            navigate("/user/dashboard/");

        } catch (error) {
            toast.error("Signup failed. Please try again.")
        } finally {
            setLoading(false);
        }

        setSubmitting(false);
    };

    return (
        <>
            {loading && <Spinner />}
            <Header />

            <div className="min-h-screen flex items-center justify-center bg-brand-1 text-white px-4 py-20">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">

                    <h2 className="text-3xl font-bold text-center mb-2">Create an Account</h2>
                    <p className="text-center text-white/70 mb-8">Join ContentHive today</p>

                    <GoogleAuthButton />

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-white/40 text-sm">OR</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignupSchema}
                        onSubmit={handleSignupSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">
                                {/* Username */}
                                <InputField
                                    label="Username"
                                    name="username"
                                    placeholder="Choose a username"
                                    leftIcon={<FaUser />}
                                />

                                {/* Email */}
                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    leftIcon={<MdEmail />}
                                />

                                {/* Password */}
                                <InputField
                                    label="Password"
                                    name="password"
                                    type={showPass1 ? "text" : "password"}
                                    placeholder="Create password"
                                    leftIcon={<RiLockPasswordFill />}
                                    rightIcon={
                                        showPass1 ? (
                                            <FiEye onClick={() => setShowPass1(false)} />
                                        ) : (
                                            <FiEyeOff onClick={() => setShowPass1(true)} />
                                        )
                                    }
                                />

                                {/* Confirm Password */}
                                <InputField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type={showPass2 ? "text" : "password"}
                                    placeholder="Re-enter password"
                                    leftIcon={<RiLockPasswordFill />}
                                    rightIcon={
                                        showPass2 ? (
                                            <FiEye onClick={() => setShowPass2(false)} />
                                        ) : (
                                            <FiEyeOff onClick={() => setShowPass2(true)} />
                                        )
                                    }
                                />

                                {/* Submit Button */}
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Loading..." : "Sign Up"}
                                </Button>
                            </Form>
                        )}
                    </Formik>

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
