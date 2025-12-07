import React from "react";
import Button from "./Button";
import { FiArrowLeft } from "react-icons/fi";

export default function NoDataFallback({
    message = "No data found.",
    image = "/no_search.svg",
    onBack,
}) {
    return (
        <div className="p-6 w-full flex justify-center">
            <div className="w-full max-w-6xl p-6 bg-gray-900/50 rounded border border-gray-700 text-center flex flex-col items-center">
                
                {image && (
                    <img src={image} alt="No data" className="w-60 h-60" />
                )}

                <p className="text-white font-medium text-sm mt-2">{message}</p>

                {onBack && (
                    <Button
                        icon={FiArrowLeft}
                        className="mt-4 px-4 py-2 rounded-sm"
                        onClick={onBack}
                    >
                        Go Back
                    </Button>
                )}
            </div>
        </div>
    );
}
