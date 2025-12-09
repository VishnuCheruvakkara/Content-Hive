import React, { useState } from "react";
import { AiOutlineLike, AiOutlineDislike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

export default function BlogInteractionBar({
    likes = 0,
    comments = 0,
    commentList = [],
    isLiked = false,
    onLike = () => { },
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-4">

            {/* Interaction Bar */}
            <div className="flex justify-end items-center text-white text-sm">
                <div className="flex items-center space-x-5">

                    {/* LIKE BUTTON */}
                    <div
                        className={`flex items-center space-x-2 cursor-pointer ${isLiked ? "text-[hsl(329,100%,73%)]" : "text-gray-300"
                            }`}
                        onClick={onLike}
                    >
                        {isLiked ? (
                            <AiFillLike size={18} />
                        ) : (
                            <AiOutlineLike size={18} />
                        )}

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

                    {commentList.length === 0 ? (
                        <p className="text-gray-400 text-sm">No comments yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {commentList.map((c, index) => (
                                <div key={index} className="bg-white/5 p-2 rounded-md">
                                    <p className="text-white text-sm">{c}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
