"use client";

import Image from "next/image";
import Link from "next/link";
import type { Course } from "../data/courses";

interface CourseCardProps {
    course: Course;
    showBuyButton?: boolean;
}

export default function CourseCard({ course, showBuyButton = true }: CourseCardProps) {
    const getCategoryStyles = (slug: string) => {
        const styles: Record<string, string> = {
            development: "bg-indigo-500/20 text-indigo-400",
            design: "bg-pink-500/20 text-pink-400",
            business: "bg-teal-500/20 text-teal-400",
            marketing: "bg-orange-500/20 text-orange-400",
            data: "bg-blue-500/20 text-blue-400",
            music: "bg-violet-500/20 text-violet-400",
        };
        return styles[slug] || "bg-indigo-500/20 text-indigo-400";
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getCategoryStyles(course.categorySlug)}`}>
                        {course.category}
                    </span>
                    {course.bestseller && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-amber-500/20 text-amber-400">
                            Bestseller
                        </span>
                    )}
                </div>

                {/* Level Badge */}
                <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
                        {course.level}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                    {course.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            src={course.instructorImage}
                            alt={course.instructor}
                            fill
                            className="object-cover"
                            sizes="32px"
                        />
                    </div>
                    <span className="text-sm text-slate-400">{course.instructor}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {course.lessons} lessons
                    </div>
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-amber-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="font-semibold text-white">{course.rating}</span>
                        </div>
                        <span className="text-slate-400 text-sm">
                            ({course.reviews.toLocaleString()})
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-bold text-white">₹{(course.price * 83).toLocaleString()}</span>
                    </div>
                </div>

                {/* Buy Now Button */}
                {showBuyButton && (
                    <Link
                        href={`/checkout/${course.id}`}
                        className="block w-full mt-4 py-3 rounded-xl font-semibold text-center bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Buy Now
                    </Link>
                )}
            </div>
        </div>
    );
}
