"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.03] blur-[140px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-[11px] tracking-[0.25em] uppercase text-white/20 mb-4 font-medium">
            404 Error
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white/90 tracking-tight mb-6">
            Lost in space.
          </h1>
          
          <p className="text-white/30 text-lg mb-12 leading-relaxed">
            The page you're looking for doesn't exist. Redirecting you back home...
          </p>

          <button
            onClick={() => router.push("/")}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/80 text-sm font-medium hover:bg-white/[0.11] hover:border-white/[0.14] transition-all duration-400"
          >
            <ArrowLeft
              size={16}
              className="opacity-60 group-hover:-translate-x-1 transition-transform duration-300"
            />
            Return Home Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}