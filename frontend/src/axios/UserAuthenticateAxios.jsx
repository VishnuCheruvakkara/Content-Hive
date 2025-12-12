import axios from "axios";
import { store } from "../redux/store";
import { loginSuccess, logoutSuccess } from "../redux/Slice/userAuthSlice";
import { getCookie } from "../utils/getCookie";
import { navigateTo } from "../services/navigation/NavigationService";
import toast from "react-hot-toast";

let isSessionExpiredHandled = false;

// Normal axios instance
const userAuthenticateAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Dedicated refresh axios (NO INTERCEPTORS)
const refreshAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

userAuthenticateAxios.interceptors.request.use((config) => {
  const { access } = store.getState().userAuth;

  if (access && !config.skipAuthRefresh) {
    config.headers["Authorization"] = `Bearer ${access}`;
  }

  const csrf = getCookie("csrftoken");
  if (csrf) config.headers["X-CSRFToken"] = csrf;

  return config;
});

// RESPONSE INTERCEPTOR
userAuthenticateAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;



    // Token expired → try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Use the clean axios without interceptors
        const refreshRes = await refreshAxios.post("/users/token-refresh/", {});

        const data = refreshRes.data.data;

        store.dispatch(
          loginSuccess({
            access: data.access,
            user: {
              id: data.id,
              username: data.username,
              email: data.email,
              is_admin: data.is_admin,
            },
          })
        );

        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

        return userAuthenticateAxios(originalRequest);

      } catch (err) {
        if (err.response?.status === 403 && err.response?.data?.status === "blocked") {
          toast.error("Your account is blocked. Contact support.");
          store.dispatch(logoutSuccess());
          navigateTo("/login");
        }
        if (!isSessionExpiredHandled) {
          isSessionExpiredHandled = true;
          store.dispatch(logoutSuccess());
          navigateTo("/login");
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default userAuthenticateAxios;
