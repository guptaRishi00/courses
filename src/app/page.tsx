import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CourseCard from "./components/CourseCard";
import { courses, categories, testimonials, stats } from "./data/courses";

export default function Home() {
  const featuredCourses = courses.filter((course) => course.featured);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Animated Blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-slate-400">
              Over 2 million learners worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-white">Unlock Your</span>
            <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">Full Potential</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10">
            Master new skills with world-class courses taught by industry experts.
            Transform your career and achieve your dreams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/courses" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all">
              Explore Courses
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-full border border-white/20 text-white hover:bg-indigo-500/10 hover:border-indigo-500 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:shadow-lg hover:shadow-indigo-500/10 transition-all">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-indigo-500 font-semibold tracking-wider uppercase mb-4 block">
              Browse Categories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Learn What You <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">Love</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Choose from over 10,000 courses across various categories, all designed to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <Link
                key={category.slug}
                href={`/courses?category=${category.slug}`}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center group hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {Math.floor(Math.random() * 500 + 100)}+ Courses
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 relative bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <span className="text-indigo-500 font-semibold tracking-wider uppercase mb-4 block">
                Featured Courses
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Most <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">Popular</span> Courses
              </h2>
            </div>
            <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border border-white/20 text-white hover:bg-indigo-500/10 hover:border-indigo-500 transition-all">
              View All Courses
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-500 font-semibold tracking-wider uppercase mb-4 block">
                Why Choose Learnify
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The Best Platform for <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">Learning</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                We combine cutting-edge technology with world-class instruction to deliver an unparalleled learning experience.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: "🎯",
                    title: "Expert Instructors",
                    description: "Learn from industry professionals with years of real-world experience.",
                  },
                  {
                    icon: "🚀",
                    title: "Learn at Your Pace",
                    description: "Access courses anytime, anywhere. Learn on your schedule.",
                  },
                  {
                    icon: "📜",
                    title: "Verified Certificates",
                    description: "Earn recognized certificates to boost your resume and career.",
                  },
                  {
                    icon: "💬",
                    title: "Community Support",
                    description: "Join a community of learners and get help when you need it.",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl group hover:scale-[1.02] transition-all">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-2xl flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-indigo-500/10">
                <div className="aspect-video relative rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop"
                    alt="Students learning"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Start Learning Today</p>
                    <p className="text-slate-400 text-sm">Join millions of learners</p>
                  </div>
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] overflow-hidden">
                        <Image
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt={`User ${i}`}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                      +2K
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative bg-gradient-to-b from-transparent via-pink-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-indigo-500 font-semibold tracking-wider uppercase mb-4 block">
              Student Reviews
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">Learners</span> Say
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied students who have transformed their careers with Learnify.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative hover:scale-[1.02] transition-all"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-5xl text-indigo-500/20">&ldquo;</div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 text-amber-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-pink-500/20 to-teal-500/20 opacity-50" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Ready to Start Your <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">Journey?</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                Join over 2 million learners and start building the skills you need to succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses" className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all">
                  Get Started Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <button className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-full border border-white/20 text-white hover:bg-indigo-500/10 hover:border-indigo-500 transition-all">
                  Talk to Sales
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
