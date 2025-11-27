import React from 'react'
import Stat from './Stat'

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

                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">ContentHive — build, publish & share content daily</h1>

                    <p className="mt-6 text-lg text-white/85 max-w-xl">A minimal, secure CMS with REST APIs, admin controls, and a modern frontend — built to help creators publish polished content every day.</p>

                    <div className="mt-8 flex gap-4">
                        <a href="/signup" className="px-6 py-3 rounded-xl bg-brand-4 text-brand-1 font-semibold shadow-lg hover:scale-[.99] transition">Get Started</a>
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
                    <div className="w-full max-w-md rounded-2xl p-6 bg-gradient-to-br from-brand-2 to-brand-3 shadow-2xl">
                        <div className="bg-white/8 rounded-xl p-4">
                            <div className="h-44 rounded-lg bg-white/6 flex items-center justify-center text-white/80">App preview (placeholder)</div>

                            <div className="mt-4 text-white">
                                <div className="font-semibold">Daily Ideas</div>
                                <div className="text-sm text-white/80 mt-1">Short, shareable drafts & micro-posts for your audience.</div>

                                <div className="mt-4 flex gap-2">
                                    <div className="flex-1 p-3 rounded-lg bg-white/6">Example Post</div>
                                    <div className="flex-1 p-3 rounded-lg bg-white/6">Example Post</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
