import React, { useState } from "react";
import Header from "../../components/Landing/Header";
import Footer from "../../components/Landing/Footer";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import GoogleButton from "../../components/ui/GoogleButton";

import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { Formik, Form } from "formik";
import LoginSchema from "../../validations/LoginSchema";

import toast from "react-hot-toast";
import publicAxios from "../../axios/PublicAxios";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/Slice/userAuthSlice";
import Spinner from "../../components/ui/Spinner";

function UserLogin() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    const handleLoginSubmit = async (values, { setSubmitting, resetForm }) => {
        setLoading(true);

        try {
            const response = await publicAxios.post("/users/login/", {
                email: values.email,
                password: values.password,
            });

            dispatch(loginSuccess({
                access: response.data.data.access,
                user: {
                    id: response.data.data.id,
                    username: response.data.data.username,
                    email: response.data.data.email,
                    is_admin: false,
                }
            }));

            toast.success("Welcome back!");

            resetForm();
            navigate("/user/dashboard/");


        } catch (error) {
            console.log("Login Error:", error.response?.data);
            toast.error("Invalid credentials.");
        } finally {
            setLoading(false);
        }

        setSubmitting(false);
    };

    return (
        <>
            {loading && <Spinner />}
            <Header />

            <div className="min-h-screen flex items-center justify-center bg-brand-1 text-white px-4">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">

                    <h2 className="text-3xl font-bold text-center mb-2">ContentHive</h2>
                    <p className="text-center text-white/70 mb-8">Sign in to your account</p>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={LoginSchema}
                        onSubmit={handleLoginSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">

                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    leftIcon={<MdEmail />}
                                />

                                <InputField
                                    label="Password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    leftIcon={<RiLockPasswordFill />}
                                    rightIcon={
                                        showPassword
                                            ? <FiEye onClick={() => setShowPassword(false)} />
                                            : <FiEyeOff onClick={() => setShowPassword(true)} />
                                    }
                                />

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Loading..." : "Login"}
                                </Button>

                            </Form>
                        )}
                    </Formik>

                    {/* <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-white/40 text-sm">OR</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div> */}

                    {/* <GoogleButton /> */}

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
