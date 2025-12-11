import React from "react";
import Button from "./Button";
import { MdDelete, MdCancel } from "react-icons/md";

export default function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmText = "Delete", // default value
    onConfirm,
    onCancel
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Background Blur */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal Box */}
            <div className='p-2 sm:p-2 bg-brand-2/50 rounded-md z-50'>
                <div className="relative bg-brand-2 text-white rounded-md p-4 sm:p-6 w-full max-w-xs sm:max-w-md shadow-xl">
                    <h2 className="text-base sm:text-lg font-semibold mb-3">{title}</h2>
                    <p className="text-gray-300 text-sm sm:text-base mb-6">{message}</p>

                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                        <Button
                            icon={MdCancel}
                            className="bg-gray-100 px-3 py-2 rounded-sm w-full sm:w-auto"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>

                        <Button
                            icon={MdDelete}
                            className="px-3 py-2 rounded-sm w-full sm:w-auto"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
