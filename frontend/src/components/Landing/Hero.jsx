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

                    <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/80">
                        <Stat label="Posts" value="1.2k+" />
                        <Stat label="Active Users" value="24k" />
                        <Stat label="Avg. Reads/day" value="7.8k" />
                    </div>
                </div>

                {/* Right - visual card */}
                <div className="flex justify-center md:justify-end">
                    <div className="w-full max-w-md rounded-2xl p-4 md:p-6 bg-linear-to-br from-brand-2 to-brand-3 shadow-xl md:shadow-2xl">
                        <div className="bg-white/8 rounded-xl p-3 md:p-4">
                            {/* Icon/Image Section */}
                            <div className="h-32 md:h-44 rounded-lg bg-white/6 flex items-center justify-center text-white/80">
                                <FaHive size={80} className="md:w-auto md:h-auto" />
                            </div>

                            {/* Content Section */}
                            <div className="mt-3 md:mt-4 text-white">
                                <div className="font-semibold text-lg md:text-xl">Daily Ideas</div>
                                <div className="text-sm md:text-base text-white/80 mt-1 md:mt-2">
                                    Short, shareable drafts & micro-posts for your audience.
                                </div>

                                {/* Features Section */}
                                <div className="mt-3 md:mt-4 flex flex-col sm:flex-row gap-2 md:gap-3">
                                    {/* Secure Feature */}
                                    <div className="flex-1 p-3 md:p-4 rounded-lg bg-white/6 flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 text-white/90">
                                        <div className="flex items-center justify-center sm:justify-start gap-2">
                                            <FaLock size={16} className="flex-shrink-0" />
                                            <span className="text-sm md:text-base font-medium">Secure</span>
                                        </div>
                                        <div className="hidden sm:block text-xs md:text-sm text-white/70 mt-1 sm:mt-0 text-center sm:text-left">
                                            End-to-end encrypted
                                        </div>
                                    </div>

                                    {/* Simple Feature */}
                                    <div className="flex-1 p-3 md:p-4 rounded-lg bg-white/6 flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 text-white/90">
                                        <div className="flex items-center justify-center sm:justify-start gap-2">
                                            <FaRegSmile size={16} className="flex-shrink-0" />
                                            <span className="text-sm md:text-base font-medium">Simple</span>
                                        </div>
                                        <div className="hidden sm:block text-xs md:text-sm text-white/70 mt-1 sm:mt-0 text-center sm:text-left">
                                            Easy to use interface
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile-only descriptions */}
                                <div className="mt-2 sm:hidden flex flex-col gap-2">
                                    <div className="text-xs text-white/70 text-center">
                                        <span className="font-medium">Secure:</span> End-to-end encrypted
                                    </div>
                                    <div className="text-xs text-white/70 text-center">
                                        <span className="font-medium">Simple:</span> Easy to use interface
                                    </div>
                                </div>

                                {/* Optional: Add a CTA button for mobile */}
                                <button className="mt-4 md:mt-6 w-full py-2 md:py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-sm md:text-base transition-colors">
                                    Start Creating
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero
