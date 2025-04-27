'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

// Enhanced Fade in animation
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ''
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Staggered children animation
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = ''
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Enhanced Staggered item animation
export const StaggerItem = ({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 1.2
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
};

// Enhanced Slide in animation
export const SlideIn = ({
  children,
  direction = 'left',
  delay = 0,
  className = '',
  distance = 100
}: {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
  distance?: number;
}) => {
  const directionMap = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: -distance },
    down: { x: 0, y: distance }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.4 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale animation
export const ScaleIn = ({
  children,
  delay = 0,
  className = ''
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Page transition
export const PageTransition = ({ children }: { children: ReactNode }) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// Enhanced Hover animation for cards
export const AnimatedCard = ({
  children,
  className = '',
  hoverScale = 1.03
}: {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
}) => (
  <motion.div
    className={className}
    whileHover={{
      y: -8,
      scale: hoverScale,
      boxShadow: '0 25px 35px -12px rgba(0, 0, 0, 0.15)'
    }}
    whileTap={{
      scale: 0.98,
      boxShadow: '0 15px 25px -10px rgba(0, 0, 0, 0.1)'
    }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 25
    }}
  >
    {children}
  </motion.div>
);

// Enhanced Animated button
export const AnimatedButton = ({
  children,
  className = '',
  glowOnHover = true
}: {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}) => (
  <motion.button
    className={`${className} ${glowOnHover ? 'btn-glow' : ''}`}
    whileHover={{
      scale: 1.05,
      y: -2
    }}
    whileTap={{
      scale: 0.95,
      y: 0
    }}
    transition={{
      type: "spring",
      stiffness: 500,
      damping: 30
    }}
  >
    {children}
  </motion.button>
);

// Enhanced Scroll-triggered animation
export const ScrollReveal = ({
  children,
  className = '',
  direction = 'up',
  distance = 50,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  delay?: number;
}) => {
  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.4 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// New 3D tilt effect component
export const TiltCard = ({
  children,
  className = '',
  tiltAmount = 10,
  perspective = 1000,
  scale = 1.05
}: {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  perspective?: number;
  scale?: number;
}) => (
  <motion.div
    className={className}
    whileHover={{
      scale,
      rotateX: tiltAmount,
      rotateY: tiltAmount,
      z: 10
    }}
    style={{ perspective }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 25
    }}
  >
    {children}
  </motion.div>
);
