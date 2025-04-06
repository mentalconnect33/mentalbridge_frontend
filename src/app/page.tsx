'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-light text-[#9D7FBC]">mind:bridge</Link>
            <Link 
              href="/app" 
              className="bg-[#9D7FBC] text-white px-6 py-2 rounded-full hover:bg-[#8A6BA7] transition-all"
            >
              Enter App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#9D7FBC]/10 to-transparent" />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#9D7FBC] to-[#6A4C93] bg-clip-text text-transparent">
              Your Mental Health Journey,
              <br />
              Supported Every Step
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Transform your mental wellness with AI-powered support, community connection, and personalized resources that grow with you
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <Link 
                href="/app"
                className="bg-[#9D7FBC] text-white px-8 py-4 rounded-full hover:bg-[#8A6BA7] transition-all text-lg flex items-center group"
              >
                Enter App
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <span className="text-gray-400">Rated 4.9 by our community</span>
            </motion.div>
          </motion.div>

          {/* Trusted By Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 text-center"
          >
            <p className="text-sm text-gray-500 mb-8">Trusted by mental health professionals from</p>
            <div className="flex justify-center items-center flex-wrap gap-12 opacity-60">
              {["NYU", "Stanford", "Harvard", "Mayo Clinic", "Johns Hopkins"].map((org) => (
                <span key={org} className="text-gray-400 text-lg">{org}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#9D7FBC] to-[#6A4C93] bg-clip-text text-transparent">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-gray-600">Everything you need for your mental wellness journey</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Assessment",
                description: "Get personalized insights and recommendations through our advanced AI analysis",
                icon: "🧠"
              },
              {
                title: "Community Connection",
                description: "Connect with others who understand your journey in a safe, moderated environment",
                icon: "👥"
              },
              {
                title: "Professional Support",
                description: "Access to verified mental health professionals and resources",
                icon: "⚕️"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-[#9D7FBC]">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8F5FF]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#9D7FBC] to-[#6A4C93] bg-clip-text text-transparent">
              How mind:bridge Works
            </h2>
            <p className="text-xl text-gray-600">Your journey to better mental health in three simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Take Assessment",
                description: "Complete our AI-powered assessment to get personalized insights"
              },
              {
                step: "02",
                title: "Get Matched",
                description: "Connect with the right resources and community members"
              },
              {
                step: "03",
                title: "Start Growing",
                description: "Begin your journey with ongoing support and guidance"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-[#9D7FBC]/10 mb-4">{step.step}</div>
                <h3 className="text-2xl font-semibold mb-4 text-[#9D7FBC]">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#9D7FBC] to-[#6A4C93] rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8">Join thousands who have transformed their mental wellness with mind:bridge</p>
            <Link 
              href="/app"
              className="bg-white text-[#9D7FBC] px-8 py-4 rounded-full hover:bg-gray-100 transition-all inline-flex items-center group"
            >
              Enter App
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <Link href="/" className="text-2xl font-light text-[#9D7FBC]">mind:bridge</Link>
              <p className="mt-4 text-gray-600">Empowering mental wellness through technology and community</p>
            </div>
            <div className="mt-8 md:mt-0">
              <Link 
                href="/app" 
                className="bg-[#9D7FBC] text-white px-6 py-2 rounded-full hover:bg-[#8A6BA7] transition-all"
              >
                Enter App
              </Link>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-gray-500">
            © 2024 mind:bridge. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
