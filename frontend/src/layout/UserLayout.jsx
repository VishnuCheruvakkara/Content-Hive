import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";
import userAuthenticateAxios from "../axios/userAuthenticateAxios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/Slice/userAuthSlice";

export default function UserLayout() {
  const dispatch = useDispatch();

  useEffect(() => {

    async function fetchUserData() {
      console.log("Triggering get-user-data....")
      try {
        const res = await userAuthenticateAxios.get("/users/get-user-data/");
        // console.log("fulldata:::::",res.data.data)
        // const { id, username, email } = res.data.data;
        
        // dispatch(
        //   loginSuccess({
        //     user: { id, username, email },
        //   })
        // );

      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    }
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-brand-1 text-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        {/* This is where nested route components will render */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
