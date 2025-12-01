import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginSuccess, logoutSuccess } from "../redux/Slice/userAuthSlice";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { access } = useSelector((state) => state.userAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      try {
        if (!access) {
          
          // Create axios WITHOUT INTERCEPTORS
          const bareAxios = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL,
            withCredentials: true,
          });

          // Call refresh API *directly* - safe, no recursion
          const res = await bareAxios.post("/users/token-refresh/", {});

          const data = res.data.data;

          dispatch(
            loginSuccess({
              access: data.access,
              user: {
                id: data.id,
                username: data.username,
                email: data.email,
              },
            })
          );
        }
      } catch (err) {
        console.log("Refresh failed on bootstrap:", err);
        dispatch(logoutSuccess());
      }

      setLoading(false);
    }

    bootstrap();
  }, []);

  if (loading) return null;
  return children;
}
