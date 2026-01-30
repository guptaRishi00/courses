"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">
                            Learnify
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-slate-400 font-medium hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:transition-all hover:after:w-full"
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            className="text-slate-400 font-medium hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:transition-all hover:after:w-full"
                        >
                            Courses
                        </Link>
                        <Link
                            href="#categories"
                            className="text-slate-400 font-medium hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:transition-all hover:after:w-full"
                        >
                            Categories
                        </Link>
                        <Link
                            href="#testimonials"
                            className="text-slate-400 font-medium hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:transition-all hover:after:w-full"
                        >
                            Reviews
                        </Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 rounded-full font-semibold text-white hover:text-indigo-400 transition-all"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 rounded-full font-semibold border border-white/20 text-white hover:bg-red-500/10 hover:border-red-500 hover:text-red-400 transition-all"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-full font-semibold border border-white/20 text-white hover:bg-indigo-500/10 hover:border-indigo-500 transition-all"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/courses"
                                    className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all"
                                >
                                    Start Learning
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
                        <div className="flex flex-col gap-4">
                            <Link href="/" className="text-slate-400 font-medium hover:text-white transition-colors">
                                Home
                            </Link>
                            <Link href="/courses" className="text-slate-400 font-medium hover:text-white transition-colors">
                                Courses
                            </Link>
                            <Link href="#categories" className="text-slate-400 font-medium hover:text-white transition-colors">
                                Categories
                            </Link>
                            <Link href="#testimonials" className="text-slate-400 font-medium hover:text-white transition-colors">
                                Reviews
                            </Link>
                            <div className="flex gap-4 mt-4">
                                {user ? (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            className="flex-1 px-4 py-2 text-center rounded-full font-semibold border border-white/20 text-white transition-all"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="flex-1 px-4 py-2 rounded-full font-semibold border border-red-500/50 text-red-400 transition-all"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="flex-1 px-4 py-2 text-center rounded-full font-semibold border border-white/20 text-white transition-all"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/courses"
                                            className="flex-1 px-4 py-2 text-center rounded-full font-semibold bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 text-white transition-all"
                                        >
                                            Start Learning
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
