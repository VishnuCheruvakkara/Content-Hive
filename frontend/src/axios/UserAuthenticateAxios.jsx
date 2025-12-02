import axios from "axios";
import { store } from "../redux/store";
import { loginSuccess, logoutSuccess } from "../redux/Slice/userAuthSlice";
import { getCookie } from "../utils/getCookie";
import toast from "react-hot-toast";
import { navigateTo } from "../services/Navigation/NavigationService";

let isSessionExpiredHandled = false;

const userAuthenticateAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// Request interceptor: attach access token to headers
userAuthenticateAxios.interceptors.request.use(
    (config) => {

        const state = store.getState();
        const access = state.userAuth.access;

        if (access && !config.skipAuthRefresh) {
            config.headers["Authorization"] = `Bearer ${access}`;
        }
        // attach fresh CSRF token
        const csrf = getCookie("csrftoken");
        if (csrf) {
            config.headers["X-CSRFToken"] = csrf;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle expired access token
userAuthenticateAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest?.skipAuthRefresh) {
            return Promise.reject(error);
        }

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
               
                const refreshResponse = await userAuthenticateAxios.post(
                    "/users/token-refresh/",
                    {},
                    { skipAuthRefresh: true }
                );

                const newAccess = refreshResponse.data.data.access;
                const user = {
                    id: refreshResponse.data.data.id,
                    username: refreshResponse.data.data.username,
                    email: refreshResponse.data.data.email,
                };

                // Update Redux store
                store.dispatch(loginSuccess({ access: newAccess, user }));
                isSessionExpiredHandled = false;
                
                // Retry original request with new token
                originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
                return userAuthenticateAxios(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);
                if (!isSessionExpiredHandled) {
                    isSessionExpiredHandled = true; 
                    toast.error("Session expired. Please log in again.");
                    store.dispatch(logoutSuccess());
                    navigateTo("/login"); 
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default userAuthenticateAxios;
