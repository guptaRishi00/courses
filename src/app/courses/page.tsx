"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { courses, categories } from "../data/courses";

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popular");
    const [selectedLevel, setSelectedLevel] = useState("all");

    const filteredCourses = useMemo(() => {
        let result = [...courses];

        // Filter by category
        if (selectedCategory !== "all") {
            result = result.filter((course) => course.categorySlug === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (course) =>
                    course.title.toLowerCase().includes(query) ||
                    course.description.toLowerCase().includes(query) ||
                    course.instructor.toLowerCase().includes(query)
            );
        }

        // Filter by level
        if (selectedLevel !== "all") {
            result = result.filter((course) => course.level.toLowerCase() === selectedLevel);
        }

        // Sort
        switch (sortBy) {
            case "popular":
                result.sort((a, b) => b.students - a.students);
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                break;
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
        }

        return result;
    }, [selectedCategory, searchQuery, sortBy, selectedLevel]);

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }} />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Explore Our <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">Courses</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                        Discover thousands of courses in development, design, business, and more.
                        Find the perfect course to achieve your goals.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for courses, topics, or instructors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-4 px-6 pl-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-slate-400"
                            />
                            <svg
                                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters & Courses */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Category Filters */}
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category.slug}
                                    onClick={() => setSelectedCategory(category.slug)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${selectedCategory === category.slug
                                            ? "bg-indigo-500 text-white border-indigo-500"
                                            : "bg-transparent text-slate-400 border-white/20 hover:bg-indigo-500/10 hover:text-white hover:border-indigo-500"
                                        }`}
                                >
                                    <span className="mr-2">{category.icon}</span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Secondary Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
                        <div className="flex items-center gap-4">
                            <span className="text-slate-400">
                                Showing <span className="text-white font-semibold">{filteredCourses.length}</span> courses
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {/* Level Filter */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="level" className="text-slate-400 text-sm">Level:</label>
                                <select
                                    id="level"
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="all" className="bg-[#0a0a0f]">All Levels</option>
                                    <option value="beginner" className="bg-[#0a0a0f]">Beginner</option>
                                    <option value="intermediate" className="bg-[#0a0a0f]">Intermediate</option>
                                    <option value="advanced" className="bg-[#0a0a0f]">Advanced</option>
                                </select>
                            </div>

                            {/* Sort Filter */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="sort" className="text-slate-400 text-sm">Sort by:</label>
                                <select
                                    id="sort"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="popular" className="bg-[#0a0a0f]">Most Popular</option>
                                    <option value="rating" className="bg-[#0a0a0f]">Highest Rated</option>
                                    <option value="newest" className="bg-[#0a0a0f]">Newest</option>
                                    <option value="price-low" className="bg-[#0a0a0f]">Price: Low to High</option>
                                    <option value="price-high" className="bg-[#0a0a0f]">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Course Grid */}
                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-2xl font-semibold text-white mb-3">No courses found</h3>
                            <p className="text-slate-400 mb-6">
                                We couldn&apos;t find any courses matching your criteria. Try adjusting your filters.
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCategory("all");
                                    setSearchQuery("");
                                    setSelectedLevel("all");
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Load More Button */}
                    {filteredCourses.length > 0 && (
                        <div className="text-center mt-12">
                            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border border-white/20 text-white hover:bg-indigo-500/10 hover:border-indigo-500 transition-all">
                                Load More Courses
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24 relative">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-pink-500/10" />
                        <div className="relative z-10">
                            <div className="text-4xl mb-4">📧</div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Stay Updated
                            </h2>
                            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                                Subscribe to our newsletter and get notified about new courses, exclusive discounts, and learning tips.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 py-3 px-5 rounded-full bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-slate-400"
                                />
                                <button className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
