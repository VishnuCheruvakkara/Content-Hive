import React from "react";
import { useSelector } from "react-redux";

export default function useAuth() {
    const access = useSelector((state) => state.userAuth.access);
    console.log("Check up ::::",access)
    return {
        isAuthenticated: !!access,
    }
}