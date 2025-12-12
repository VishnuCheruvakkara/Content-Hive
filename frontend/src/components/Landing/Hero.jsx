import React from 'react'
import Stat from './Stat'
import { FaHive } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";

function Hero() {
    return (
        <section className="w-full">
            <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left - copy */}
                <div className="text-white">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-brand-4 text-brand-1 font-semibold">MARLO Exercise</span>
                        <span className="text-sm text-white/80">CMS · Blogging · Admin</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">ContentHive - build, publish & share content daily</h1>

                    <p className="mt-6 text-lg text-white/85 max-w-xl">A Secure CMS with REST APIs, admin controls, and a modern frontend - built to help creators publish polished content every day.</p>

                    <div className="mt-8 flex gap-4">
                        <Link to="/signup" className="px-6 py-3 rounded-xl bg-brand-4 text-brand-1 font-semibold shadow-lg hover:scale-[.99] transition">Get Started</Link>
                        <a href="#features" className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/6 transition">Learn More</a>
                    </div>

                    
                </div>

                {/* Right - visual card */}
                <div className="flex justify-center md:justify-end">
                    <div className="w-full max-w-md rounded-2xl p-6 bg-linear-to-br from-brand-2 to-brand-3 shadow-2xl">
                        <div className="bg-white/8 rounded-xl p-4">
                            <div className="h-44 rounded-lg bg-white/6 flex items-center justify-center text-white/80">
                                <FaHive size={150} />
                            </div>

                            <div className="mt-4 text-white">
                                <div className="font-semibold">Daily Ideas</div>
                                <div className="text-sm text-white/80 mt-1">
                                    Short, shareable drafts & micro-posts for your audience.
                                </div>

                                {/* FIXED PART HERE */}
                                <div className="mt-4 flex flex-col md:flex-row gap-2">

                                    <div className="p-3 rounded-lg bg-white/6 flex flex-col gap-2 text-white/90 md:flex-1">
                                        <div className="flex items-center gap-2">
                                            <FaLock size={16} />
                                            <span className="text-sm font-medium">Secure</span>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-lg bg-white/6 flex flex-col gap-2 text-white/90 md:flex-1">
                                        <div className="flex items-center gap-2">
                                            <FaRegSmile size={16} />
                                            <span className="text-sm font-medium">Simple</span>
                                        </div>
                                    </div>

                                </div>
                                {/* END FIX */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero
