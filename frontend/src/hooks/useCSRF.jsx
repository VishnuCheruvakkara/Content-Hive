import { useEffect } from "react";
import axios from "axios";

const useCSRF = () => {
  useEffect(() => {
    const fetchCSRF = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/csrf/`, {
          withCredentials: true,
        });
      } catch (err) {
        // console.error("Failed to get CSRF token:", err);
      }
    };
    fetchCSRF();
  }, []);
};

export default useCSRF;
