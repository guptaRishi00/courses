"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Purchase {
    id: string;
    courseId: string;
    courseName: string;
    courseImage: string;
    amount: number;
    purchasedAt: string;
}

interface UserProfile {
    id: string;
    email: string;
    name: string;
    createdAt: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const { user, token, isLoading: authLoading, logout } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!authLoading && !token) {
            router.push("/login");
            return;
        }

        if (token) {
            fetchProfile();
        }
    }, [token, authLoading, router]);

    const fetchProfile = async () => {
        try {
            const response = await fetch("/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    logout();
                    router.push("/login");
                    return;
                }
                throw new Error("Failed to fetch profile");
            }

            const data = await response.json();
            setProfile(data.user);
            setPurchases(data.purchases);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <svg className="animate-spin h-8 w-8 text-indigo-500" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="text-white text-lg">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Error</h1>
                    <p className="text-slate-400 mb-4">{error}</p>
                    <Link href="/" className="text-indigo-400 hover:underline">
                        Go home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Navbar />

            <div className="pt-24 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Welcome back, {profile?.name || user?.name}! 👋
                            </h1>
                            <p className="text-slate-400">
                                Manage your courses and track your learning progress
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-red-500/10 hover:border-red-500 hover:text-red-400 transition-all"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-12">
                        <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-slate-400 mb-1">Full Name</p>
                                <p className="text-white font-medium">{profile?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400 mb-1">Email Address</p>
                                <p className="text-white font-medium">{profile?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400 mb-1">Member Since</p>
                                <p className="text-white font-medium">
                                    {profile?.createdAt
                                        ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })
                                        : "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Purchased Courses */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">My Courses</h2>

                        {purchases.length === 0 ? (
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
                                <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-xl font-semibold text-white mb-2">No courses yet</h3>
                                <p className="text-slate-400 mb-6">
                                    You haven&apos;t purchased any courses yet. Start learning today!
                                </p>
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                                >
                                    Browse Courses
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {purchases.map((purchase) => (
                                    <div
                                        key={purchase.id}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
                                    >
                                        <div className="relative h-40 overflow-hidden">
                                            <Image
                                                src={purchase.courseImage}
                                                alt={purchase.courseName}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                                                    Purchased
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-semibold text-white mb-2 line-clamp-2">
                                                {purchase.courseName}
                                            </h3>
                                            <div className="flex items-center justify-between text-sm text-slate-400">
                                                <span>
                                                    Purchased:{" "}
                                                    {new Date(purchase.purchasedAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                                <span className="font-medium text-white">
                                                    ₹{(purchase.amount * 83).toLocaleString()}
                                                </span>
                                            </div>
                                            <button className="w-full mt-4 py-2.5 rounded-xl font-medium bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all">
                                                Start Learning
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
