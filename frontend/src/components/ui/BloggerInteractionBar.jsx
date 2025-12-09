import React, { useState } from "react";
import Button from "./Button";
import { IoMdSend } from "react-icons/io";
import FormattedDate from "./FormattedData";

import {
    AiOutlineLike,
    AiOutlineDislike,
    AiFillLike,
    AiFillDislike
} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

export default function BlogInteractionBar({
    likes = 0,
    comments = 0,
    commentList = [],
    isLiked = false,
    isDisliked = false,
    onLike = () => { },
    onDislike = () => { },
    onAddComment = () => { },
    viewCount = 0,
}) {

    const [open, setOpen] = useState(false);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        onAddComment(newComment);
        setNewComment("");
    };



    return (
        <div className="mt-4">

            {/* Interaction Bar */}
            <div className="flex justify-between items-center text-white text-sm">

                {/* LEFT SIDE — VIEW COUNT */}
                <span>{viewCount} Views</span>

                {/* RIGHT SIDE — LIKE / DISLIKE / COMMENT */}
                <div className="flex items-center space-x-1">

                    {/* LIKE */}
                    <div
                        className={`flex items-center justify-center w-20 space-x-2 cursor-pointer 
            ${isLiked ? "text-[#ff75bc]" : "text-gray-300"}
            hover:bg-white/10 p-2 rounded-lg transition-all duration-200`}
                        onClick={onLike}
                    >
                        {isLiked ? <AiFillLike size={18} /> : <AiOutlineLike size={18} />}
                        <span>{likes}</span>
                    </div>

                    {/* DISLIKE */}
                    <div
                        className={`flex items-center justify-center w-20 space-x-2 cursor-pointer 
            ${isDisliked ? "text-[#ff75bc]" : "text-gray-300"}
            hover:bg-white/10 p-2 rounded-lg transition-all duration-200`}
                        onClick={onDislike}
                    >
                        {isDisliked ? <AiFillDislike size={18} /> : <AiOutlineDislike size={18} />}
                    </div>

                    {/* COMMENTS */}
                    <div
                        className="flex items-center justify-center w-20 space-x-2 cursor-pointer text-gray-300
            hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
                        onClick={() => setOpen(!open)}
                    >
                        <FaRegComment size={16} />
                        <span>{comments}</span>
                    </div>

                </div>
            </div>


            {/* Comment Section */}
            <div
                className={`
                    overflow-hidden transition-all duration-500 ease-out
                    ${open
                        ? "max-h-[1000px] opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-3"
                    }
                `}
            >
                {open && (
                    <div className="mt-3 bg-white/10 p-4 rounded-md border border-gray-700">
                        <h4 className="text-white font-semibold mb-3">Comments</h4>

                        {/* Add Comment Input */}
                        <div className="flex items-center space-x-2 mb-4">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
                            />

                            <Button
                                icon={IoMdSend}
                                onClick={() => handleAddComment(newComment)}
                                className="px-4 py-2 bg-brand-3 text-white rounded "
                            >
                                Add
                            </Button>
                        </div>

                        {/* Comment List */}
                        {commentList.length === 0 ? (
                            <p className="text-gray-400 text-sm">No comments yet.</p>
                        ) : (
                            <div className="max-h-[400px]   overflow-y-auto pr-2 custom-scrollbar space-y-4">
                                {commentList.map((c, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3 bg-white/10 p-3 rounded-md"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-brand-3 text-white flex items-center justify-center text-lg font-bold">
                                            {c.user?.charAt(0)?.toUpperCase()}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <p className="text-white text-sm">{c.user}</p>
                                                <p className="text-gray-200 text-xs">
                                                    <FormattedDate dateString={c.created_at} />
                                                </p>
                                            </div>

                                            <p className="text-gray-300 text-sm mt-1 font-semibold">
                                                {c.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>


        </div>
    );
}
