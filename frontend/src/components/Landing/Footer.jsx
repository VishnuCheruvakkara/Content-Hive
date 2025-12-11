import React from "react";
import { FaHive } from "react-icons/fa6";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";

function Footer() {
    return (
        <footer
            id="contact"
            className="bg-brand-1/95 text-white py-10 border-t border-white/20"
        >
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Logo */}
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-white  flex items-center justify-center overflow-hidden shadow-black/50 shadow-md">
                            <img
                                src="/content_hive_icon.svg"
                                alt="ContentHive Logo"
                                className="w-8 h-8 object-contain"
                            />
                        </div> 
                    </div>
                    <p className="text-white/80 text-sm">
                        A simple CMS to write, publish and grow your audience. Built for
                        MARLO Python exercise.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <div className="font-semibold mb-2">Quick Links</div>
                    <ul className="text-sm text-white/80 space-y-2">
                        <li>
                            <a href="#features" className="hover:text-brand-4 transition">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#modules" className="hover:text-brand-4 transition">
                                Modules
                            </a>
                        </li>
                        <li>
                            <a href="#pricing" className="hover:text-brand-4 transition">
                                Pricing
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact / Social */}
                <div>
                    <div className="font-semibold mb-2">Contact</div>
                    <div className="text-sm text-white/80">hello@contenthive.app</div>


                </div>
            </div>

            {/* Bottom Footer */}
            <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-white/70 space-y-4">

                {/* Copyright */}
                <div>
                    © {new Date().getFullYear()} ContentHive - Built for MARLO exercise
                </div>

                {/* Developed By */}
                <div className="text-white/60">
                    Developed by{" "}
                    <span className="text-brand-4 font-semibold">
                        Vishnu Cheruvakkara
                    </span>
                </div>

                {/* Personal Social Links */}
                <div className="flex gap-8 justify-center">

                    <a
                        href="https://vishnu-cheruvakkara-portfolio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-4 text-brand-4 hover:bg-brand-4 transition duration-300 hover:text-brand-1"
                    >
                        <BsGlobe size={20} />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/vishnu-cheruvakkara-231b8b235/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-4 text-brand-4 hover:bg-brand-4 transition duration-300 hover:text-brand-1"
                    >
                        <FaLinkedin size={20} />
                    </a>

                    <a
                        href="https://www.instagram.com/vishnu_c_dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-4 text-brand-4 hover:bg-brand-4 transition duration-300 hover:text-brand-1"
                    >
                        <FaInstagram size={20} />
                    </a>

                    <a
                        href="https://github.com/VishnuCheruvakkara"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-4 text-brand-4 hover:bg-brand-4 transition duration-300 hover:text-brand-1"
                    >
                        <FaGithub size={20} />
                    </a>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
