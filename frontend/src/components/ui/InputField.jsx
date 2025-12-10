import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useField } from "formik"

function InputField({
    label,
    type = "text",
    placeholder,
    leftIcon,
    rightIcon,
    className = "",
    ...props
}) {

    const [field, meta] = useField(props);
    return (
        <div>
            {label && <label className="block mb-1 font-medium">{label}</label>}

            <div className="relative">
                {/* Left Icon */}
                {leftIcon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-lg">
                        {leftIcon}
                    </span>
                )}

                {/* Right Icon */}
                {rightIcon && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 text-lg cursor-pointer">
                        {rightIcon}
                    </span>
                )}

                <input
                    {...props}
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className={twMerge(clsx(
                        `w-full py-3 rounded-xl bg-white/20 text-white placeholder-white/50
                        focus:outline-none focus:ring-2 focus:ring-brand-4`,
                        leftIcon ? "pl-12" : "pl-4",
                        rightIcon ? "pr-12" : "pr-4",
                        className
                    ))}

                />
            </div>

            {/* Error message */}
            {meta.touched && meta.error && (
                <div className="text-brand-4 text-sm mt-1 font-semibold">{meta.error}</div>
            )}

        </div>
    );
}

export default InputField;
