import React from "react";

function GoogleButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full px-4 py-3 rounded-xl bg-white text-brand-1 font-semibold shadow-md 
                       flex items-center justify-center gap-3 hover:bg-white/90 transition"
        >
            <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google Icon"
                className="w-5 h-5"
            />
            Continue with Google
        </button>
    );
}

export default GoogleButton;
