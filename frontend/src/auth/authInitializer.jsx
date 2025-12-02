import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCookie } from "../utils/getCookie";
import { loginSuccess, logoutSuccess, finishBootstrap } from "../redux/Slice/userAuthSlice";
import Spinner from "../components/ui/Spinner";
import userAuthenticateAxios from "../axios/userAuthenticateAxios";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { access, bootstrapped } = useSelector((state) => state.userAuth);

  useEffect(() => {
    async function init() {
      try {
        const bareAxios = axios.create({
          baseURL: import.meta.env.VITE_API_BASE_URL,
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCookie("csrftoken") ?? "",
          }
        });

        // Direct refresh call
        const res = await bareAxios.post("/users/token-refresh/", {});
        const data = res.data.data;

        dispatch(
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

      } catch (error) {
        console.log("Error happen :", error)
        try {
          await userAuthenticateAxios.get("/users/get-user-data/", {
            skipAuthRefresh: false, // allow interceptor
          });
        } catch (err) {
          // interceptor handles logout
        }
      }

      dispatch(finishBootstrap());
    }

    init();
  }, []);

  if (!bootstrapped) return <Spinner />;
  return children;
}
