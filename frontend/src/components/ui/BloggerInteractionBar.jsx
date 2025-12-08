import React, { useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

export default function BlogInteractionBar({ likes = 0, comments = 0 }) {
    const [open, setOpen] = useState(false);

    // 5 Dummy Comments
    const dummyComments = [
        "Amazing blog! Very insightful.",
        "Loved the writing style.",
        "Please write more on this topic!",
        "Super helpful. Thanks for sharing!",
        "Great content. Keep it up!"
    ];

    return (
        <div className="mt-4">

            {/* Interaction Bar */}
            <div className="flex justify-end items-center text-white text-sm">
                <div className="flex items-center space-x-5">

                    {/* Like */}
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <AiOutlineLike size={18} />
                        <span>{likes}</span>
                    </div>

                    {/* Dislike */}
                    <div className="flex items-center cursor-pointer">
                        <AiOutlineDislike size={18} />
                    </div>

                    {/* Comment Toggle */}
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <FaRegComment size={16} />
                        <span>{comments}</span>
                    </div>
                </div>
            </div>

            {/* Comment Section */}
            {open && (
                <div className="mt-3 bg-white/10 p-4 rounded-md border border-gray-700">
                    <h4 className="text-white font-semibold mb-3">Comments</h4>

                    <div className="space-y-3">
                        {dummyComments.map((c, index) => (
                            <div key={index} className="bg-white/5 p-2 rounded-md">
                                <p className="text-white text-sm">{c}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
