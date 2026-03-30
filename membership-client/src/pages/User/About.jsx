import { useState, useEffect } from "react";
\import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      {/* Header Image Placeholder */}
      <section className="relative w-full h-[400px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
        <img
          src="YOUR_IMAGE_URL_HERE"
          alt="Hero Cover"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            About SLATE
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-500">
            Infrastructure / About
          </p>
        </div>
      </section>

      {/* Main Content Block */}
      <main className="max-w-5xl mx-auto px-6 py-24">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 mb-4 block">
            Our Philosophy
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Redefining Revenue Infrastructure
          </h2>
        </div>

        {/* Content Section (Matches the layout of Screenshot 2026-06-26 at 9.36.21 AM.jpg) */}
        <section className="bg-zinc-100 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-900 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 transition-colors duration-500">
          <div className="flex-1 space-y-8">
            <h3 className="text-3xl font-black tracking-tighter uppercase">
              The Future of Financial State
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              SLATE bridges the gap between fragmented payment gateways and the
              need for atomic, real-time financial consistency. We eliminate
              data drift and provide the orchestration layer necessary for
              high-output engineering teams to scale without the headache of
              manual reconciliation.
            </p>
            <button className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 hover:opacity-80 transition-opacity">
              Explore Documentation
            </button>
          </div>

          {/* Image Placeholder */}
          <div className="w-full md:w-1/2 h-64 bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400">
              Placeholder for Illustration
            </span>
          </div>
        </section>
        {/* Testimonial Section */}
        <section className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-200 dark:border-zinc-900">
          <div className="flex flex-col items-center text-center">
            {/* Circular Image Placeholder */}
            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-8 border border-zinc-300 dark:border-zinc-700 overflow-hidden">
              <img
                src="YOUR_PROFILE_IMAGE_URL"
                alt="Testimonial"
                className="w-full h-full object-cover opacity-50"
              />
            </div>

            {/* Quote in Italic */}
            <blockquote className="text-2xl md:text-4xl font-light italic leading-tight text-black dark:text-white max-w-3xl mb-8">
              "SLATE has completely transformed our revenue reconciliation
              process. The reliability of their ledger engine is unmatched by
              anything else we've tested."
            </blockquote>

            {/* Attribution */}
            <div className="text-center">
              <p className="font-bold uppercase tracking-widest text-xs mb-1">
                Alex Rivera
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                CTO at FinTech Scale
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
