import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const Button = ({
    children,
    className = "",
    onClick,
    type = "button",
    icon: Icon,
    ...props
}) => {

    const baseClasses =
        "px-4 py-3 rounded-xl bg-brand-4 text-brand-1 font-semibold shadow-lg " +
        "hover:scale-[.98] transition flex items-center justify-center gap-2 cursor-pointer";

    return (
        <button
            type={type}
            onClick={onClick}
            className={twMerge(clsx(baseClasses, className))}
            {...props}
        >
            {Icon && <Icon className="text-xl" />}
            {children}
        </button>
    );
};

export default Button;
