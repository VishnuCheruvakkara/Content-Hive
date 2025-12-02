import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";

export default function UserLayout() {

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
