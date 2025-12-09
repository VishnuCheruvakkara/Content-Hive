import React from 'react'
import { FaHive } from "react-icons/fa6";

function Footer() {
    return (
        <footer id="contact" className="bg-brand-1/95 text-white py-10 border-t border-white/20">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-4 flex items-center justify-center text-brand-1 font-bold">
                            <FaHive size={30} />
                        </div>
                    </div>
                    <p className="text-white/80 text-sm">A simple CMS to write, publish and grow your audience. Built for MARLO Python exercise.</p>
                </div>

                <div>
                    <div className="font-semibold mb-2">Quick Links</div>
                    <ul className="text-sm text-white/80 space-y-2">
                        <li><a href="#features" className="hover:text-brand-4">Features</a></li>
                        <li><a href="#modules" className="hover:text-brand-4">Modules</a></li>
                        <li><a href="#pricing" className="hover:text-brand-4">Pricing</a></li>
                    </ul>
                </div>

                <div>
                    <div className="font-semibold mb-2">Contact</div>
                    <div className="text-sm text-white/80">hello@contenthive.app</div>
                    <div className="mt-3 flex items-center gap-3 text-white/80">
                        <a aria-label="twitter" href="#" className="text-sm hover:text-brand-4">Twitter</a>
                        <a aria-label="github" href="#" className="text-sm hover:text-brand-4">Github</a>
                        <a aria-label="linkedin" href="#" className="text-sm hover:text-brand-4">LinkedIn</a>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-white/70">© {new Date().getFullYear()} ContentHive — Built for MARLO exercise</div>
        </footer>
    )
}

export default Footer
