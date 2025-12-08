import React from "react";
import Button from "./Button";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";

export default function ConfirmationModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">

            {/* Background Blur */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal Box */}
            <div className='p-2 bg-brand-2/50 rounded-md z-10000'>
                <div className="relative bg-brand-2  text-white rounded-md p-6 w-96 shadow-xl">
                    <h2 className="text-lg font-semibold mb-3">{title}</h2>
                    <p className="text-gray-300 mb-6">{message}</p>

                    <div className="flex justify-end space-x-3">
                        <Button
                            icon={MdCancel}
                            className="bg-gray-100 px-4 py-2 rounded-sm"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>

                        <Button
                            icon={MdDelete}
                            className=" px-4 py-2 rounded-sm"
                            onClick={onConfirm}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
