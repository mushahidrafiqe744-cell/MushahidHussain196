'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StartupSplashProps {
  name?: string;
  title?: string;
}

export const StartupSplash: React.FC<StartupSplashProps> = ({
  name = 'Mushahid Hussain',
  title = 'Full-Stack Web Developer',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="startup-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#06100A] via-[#0C2115] to-[#040B07] text-[#F8F5EE] px-4 overflow-hidden select-none"
        >
          {/* Ambient radial golden and emerald aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.35, 0.65, 0.45], scale: [0.9, 1.15, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full bg-[#C5A059]/20 blur-[90px] pointer-events-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(4,11,7,0.88)_85%)] pointer-events-none" />

          {/* Centerpiece Phoenix Medallion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center mb-7"
          >
            {/* Outer rotating subtle gold ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border border-dashed border-[#C5A059]/45 pointer-events-none"
            />
            <div className="absolute -inset-2 rounded-full border border-[#DFC285]/30 shadow-[0_0_60px_rgba(197,160,89,0.45)] pointer-events-none" />

            {/* Circular cropped frame showing the golden phoenix crest cleanly */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-[#C5A059]/80 bg-black shadow-[0_0_50px_rgba(197,160,89,0.4)]">
              <img
                src="/assets/aistudio/image_6c5c7902.png"
                alt="Portfolio Golden Phoenix Crest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-[1.16]"
              />
              {/* Soft inner vignette to blend edges smoothly */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(0,0,0,0.75)] pointer-events-none" />
            </div>
          </motion.div>

          {/* Identity Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
            className="relative text-center z-10 max-w-md"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[11px] font-bold tracking-[0.22em] uppercase text-[#DFC285] mb-3">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>Official Portfolio</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white mb-1.5">
              {name}
            </h1>
            <p className="text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-[#C5A059]">
              {title}
            </p>

            {/* Animated Golden Loading Bar */}
            <div className="w-48 sm:w-56 h-[3px] bg-white/10 rounded-full mx-auto mt-6 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-[#C5A059] via-[#F3DFAD] to-[#C5A059] rounded-full shadow-[0_0_12px_rgba(197,160,89,0.9)]"
              />
            </div>

            {/* Enter Immediately Button */}
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 hover:bg-[#C5A059] text-[#DFC285] hover:text-[#0B1D13] border border-[#C5A059]/35 text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer group"
            >
              <span>Enter Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
