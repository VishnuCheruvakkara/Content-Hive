import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";
import userAuthenticateAxios from "../axios/userAuthenticateAxios";

export default function UserLayout() {

  // useEffect(() => {

  //   async function fetchUserData() {
  //     try {
  //       const res = await userAuthenticateAxios.get("/users/get-user-data/");
    
  //     } catch (err) {
  //       console.error("Failed to fetch user data:", err);
  //     }
  //   }
  //   fetchUserData();
  // }, []);

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
