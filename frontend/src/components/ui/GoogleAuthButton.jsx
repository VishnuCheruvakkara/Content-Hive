import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import publicAxios from "../../axios/PublicAxios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/Slice/userAuthSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Spinner from "../../components/ui/Spinner"
import InlineSpinner from "../../components/ui/InlineSpinner"

export default function GoogleAuthButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const login = useGoogleLogin({
        flow: "implicit",
        scope: "openid email profile",
        onSuccess: async (tokenResponse) => {
            setLoading(true);

            try {
                const access_token = tokenResponse.access_token;

                const res = await publicAxios.post(`/users/google/callback/`, { access_token });

                // Redux login payload
                dispatch(
                    loginSuccess({
                        access: res.data.data.access,
                        user: {
                            id: res.data.data.id,
                            username: res.data.data.username,
                            email: res.data.data.email,
                            is_admin: res.data.data.is_admin,
                        },
                    })
                );

                toast.success("Welcome back!");
                navigate("/user/dashboard/");
            } catch (err) {
                // console.error("Google login error:", err);
                if (err.response?.data?.status === "blocked") {
                    toast.error("Your account is blocked. Contact support.");
                } else {
                    toast.error("Google login failed!");
                }
            } finally {
                setLoading(false);
            }
        },
        onError: () => toast.error("Google Login Failed"),
    });

    if (loading) {
        return <InlineSpinner/>
    }
    return (
        <button
            onClick={() => login()}
            disabled={loading}
            className="w-full px-2 py-2 rounded-xl bg-white/20 text-white font-semibold shadow-md 
               flex items-center justify-center gap-3 hover:bg-brand-3/50 transition disabled:opacity-50 cursor-pointer group"
        >
            <span className="flex items-center justify-center w-8 h-8 bg-white rounded-lg border group-hover:border-brand-1/20">
                <FcGoogle size={24} />
            </span>
            <span className="flex-1 text-center -translate-x-3">
                {loading ?  <InlineSpinner/> : "Continue with Google"}
            </span>
        </button>

    );
}
