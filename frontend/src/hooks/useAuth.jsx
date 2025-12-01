import React from "react";
import { useSelector } from "react-redux";

export default function useAuth() {
    const access = useSelector((state) => state.userAuth.access);
    return {
        // Convert the data into boolean
        isAuthenticated: !!access,
    }
}