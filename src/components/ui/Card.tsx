'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'outline' | 'elevated' | 'modern' | 'accent';
  animate?: boolean;
  hover?: boolean;
}

export function Card({
  children,
  variant = 'default',
  animate = false,
  hover = true,
  className = '',
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-soft overflow-hidden',
    glass: 'glass-effect rounded-xl overflow-hidden backdrop-blur-md',
    gradient: 'bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-900/20 dark:to-sky-900/20 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-soft overflow-hidden',
    outline: 'bg-white dark:bg-gray-800 rounded-xl border-2 border-primary/20 dark:border-primary/30 shadow-soft overflow-hidden',
    elevated: 'bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-medium overflow-hidden',
    modern: 'bg-white dark:bg-gray-800 rounded-2xl border-none shadow-medium overflow-hidden',
    accent: 'bg-gradient-to-br from-primary-light/10 to-secondary-light/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl border border-primary/10 dark:border-primary/20 shadow-soft overflow-hidden',
  };

  const hoverClass = hover ? 'card-hover' : '';

  if (animate) {
    return (
      <motion.div
        className={`${variants[variant]} ${hoverClass} ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={hover ? {
          y: -8,
          boxShadow: '0 25px 30px -12px rgba(0, 0, 0, 0.15)',
          scale: 1.02,
        } : undefined}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={`${variants[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  gradient?: boolean;
}

export function CardHeader({
  children,
  gradient = false,
  className = '',
  ...props
}: CardHeaderProps) {
  const baseStyles = 'px-6 py-5';
  const gradientStyles = gradient
    ? 'bg-gradient-to-r from-primary-light/10 to-secondary-light/10 dark:from-primary/20 dark:to-secondary/20 border-b border-primary-light/20 dark:border-primary/30'
    : 'border-b border-gray-200 dark:border-gray-700';

  return (
    <div
      className={`${baseStyles} ${gradientStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  gradient?: boolean;
}

export function CardTitle({
  children,
  gradient = false,
  className = '',
  ...props
}: CardTitleProps) {
  const titleClass = gradient
    ? 'text-xl font-bold gradient-text-animated'
    : 'text-xl font-bold text-gray-900 dark:text-gray-100';

  return (
    <h3
      className={`${titleClass} ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function CardDescription({
  children,
  className = '',
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({
  children,
  className = '',
  ...props
}: CardContentProps) {
  return (
    <div
      className={`px-6 py-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({
  children,
  className = '',
  ...props
}: CardFooterProps) {
  return (
    <div
      className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
