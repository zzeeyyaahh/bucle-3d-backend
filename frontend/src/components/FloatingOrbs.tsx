import React from 'react';
import { motion } from 'framer-motion';

export const FloatingOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* 1. Large Refractive Glass Orb (Far-Left Margin) */}
      <motion.div
        animate={{
          y: [0, -35, 20, 0],
          x: [0, -12, 10, 0],
          rotate: [0, 15, -10, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-28 left-[1%] md:left-[2%] w-36 h-36 rounded-full bg-transparent backdrop-blur-[3px] border border-white/40"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.01) 70%)',
          boxShadow:
            'inset 0 0 15px rgba(255, 255, 255, 0.6), inset -5px -5px 12px rgba(10, 25, 47, 0.15), 0 8px 25px rgba(10, 25, 47, 0.05)',
        }}
      >
        {/* Crisp Specular Glare */}
        <div className="w-9 h-2.5 rounded-full bg-white/90 blur-[0.3px] absolute top-3.5 left-5 -rotate-45" />
        {/* Bottom Refractive Ring */}
        <div className="w-16 h-4 rounded-full bg-white/20 blur-[2px] absolute bottom-3 right-4 rotate-12" />
      </motion.div>

      {/* 2. Micro Glass Orb (Far-Right Margin Edge) */}
      <motion.div
        animate={{
          y: [0, 30, -20, 0],
          x: [0, 8, -5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute top-[18%] right-[1.5%] md:right-[3%] w-14 h-14 rounded-full bg-transparent backdrop-blur-[2px] border border-white/35"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          boxShadow:
            'inset 0 0 8px rgba(255, 255, 255, 0.5), inset -3px -3px 8px rgba(10, 25, 47, 0.1), 0 4px 12px rgba(10, 25, 47, 0.03)',
        }}
      >
        <div className="w-3.5 h-1 rounded-full bg-white/90 blur-[0.2px] absolute top-2 left-2 -rotate-45" />
      </motion.div>

      {/* 3. Extra Large Glass Orb (Outer Right Edge Margin) */}
      <motion.div
        animate={{
          y: [0, 45, -25, 0],
          x: [0, 15, -10, 0],
          scale: [1, 1.03, 0.97, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-[38%] right-[1%] md:right-[2%] w-40 h-40 rounded-full bg-transparent backdrop-blur-[4px] border border-white/45"
        style={{
          background: 'radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.01) 65%)',
          boxShadow:
            'inset 0 0 20px rgba(255, 255, 255, 0.7), inset -6px -6px 16px rgba(10, 25, 47, 0.18), 0 12px 30px rgba(10, 25, 47, 0.06)',
        }}
      >
        <div className="w-11 h-3 rounded-full bg-white/95 blur-[0.3px] absolute top-5 left-6 -rotate-45" />
        <div className="w-20 h-5 rounded-full bg-white/20 blur-[3px] absolute bottom-4 right-5 rotate-12" />
      </motion.div>

      {/* 4. Medium Glass Orb (Far-Left Lower Margin) */}
      <motion.div
        animate={{
          y: [0, -40, 25, 0],
          x: [0, -10, 12, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-[62%] left-[1%] md:left-[3%] w-28 h-28 rounded-full bg-transparent backdrop-blur-[3px] border border-white/40"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          boxShadow:
            'inset 0 0 12px rgba(255, 255, 255, 0.6), inset -4px -4px 10px rgba(10, 25, 47, 0.12), 0 6px 20px rgba(10, 25, 47, 0.04)',
        }}
      >
        <div className="w-7 h-2 rounded-full bg-white/90 blur-[0.3px] absolute top-3.5 left-4 -rotate-45" />
      </motion.div>

      {/* 5. Tiny Glass Pebble (Far-Right Bottom Margin) */}
      <motion.div
        animate={{
          y: [0, 25, -20, 0],
          x: [0, 10, -6, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className="absolute top-[85%] right-[2%] md:right-[4%] w-12 h-12 rounded-full bg-transparent backdrop-blur-[2px] border border-white/30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          boxShadow:
            'inset 0 0 6px rgba(255, 255, 255, 0.5), inset -2px -2px 6px rgba(10, 25, 47, 0.08)',
        }}
      >
        <div className="w-2.5 h-1 rounded-full bg-white/80 blur-[0.2px] absolute top-1.5 left-1.5 -rotate-45" />
      </motion.div>
    </div>
  );
};