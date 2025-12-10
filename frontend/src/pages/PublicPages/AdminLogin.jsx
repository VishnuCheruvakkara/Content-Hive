import React, { useState } from "react";
import Header from "../../components/Landing/Header";
import Footer from "../../components/Landing/Footer";

import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

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

function AdminLogin() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    const handleAdminLogin = async (values, { setSubmitting, resetForm }) => {
        setLoading(true);
        try {
            const response = await publicAxios.post("/users/admin-login/", {
                email: values.email,
                password: values.password,
            });

            dispatch(
                loginSuccess({
                    access: response.data.data.access,
                    user: {
                        id: response.data.data.id,
                        username: response.data.data.username,
                        email: response.data.data.email,
                        is_admin: response.data.data.is_admin,
                    },
                })
            );

            toast.success("Admin Login Successful!");

            resetForm();
            navigate("/admin/dashboard/");

        } catch (error) {
            toast.error("Invalid admin credentials.");
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

                    {/* Title */}
                    <h2 className="text-3xl font-extrabold text-center mb-2">Admin Panel</h2>
                    <p className="text-center text-white/70 mb-8">
                        Secure Admin Login — ContentHive
                    </p>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={LoginSchema}
                        onSubmit={handleAdminLogin}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">

                                {/* Email */}
                                <InputField
                                    label="Admin Email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter the email address"
                                    leftIcon={<MdEmail />}
                                />

                                {/* Password */}
                                <InputField
                                    label="Password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    leftIcon={<RiLockPasswordFill />}
                                    rightIcon={
                                        showPassword ? (
                                            <FiEye onClick={() => setShowPassword(false)} />
                                        ) : (
                                            <FiEyeOff onClick={() => setShowPassword(true)} />
                                        )
                                    }
                                />

                                {/* Submit Button */}
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Loading..." : "Login as Admin"}
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    {/* Info */}
                    <p className="text-center text-white/60 text-sm mt-6">
                        This area is restricted to authorized administrators only.
                    </p>

                    {/* Back to User Login */}
                    <p className="text-center text-white/70 text-sm mt-4">
                        Not an admin?{" "}
                        <Link to="/login" className="text-brand-4 font-semibold hover:underline">
                            Go to User Login
                        </Link>
                    </p>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default AdminLogin;
