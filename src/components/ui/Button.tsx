'use client';

import { ButtonHTMLAttributes, ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';

type ButtonProps<C extends ElementType = 'button'> = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  as?: C;
} & ComponentPropsWithoutRef<C>;

export function Button<C extends ElementType = 'button'>({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  disabled,
  as,
  ...props
}: ButtonProps<C>) {
  const Component = as || 'button';
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary shadow-sm hover:shadow-medium',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus-visible:ring-secondary shadow-sm hover:shadow-medium',
    outline: 'border-2 border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 hover:text-gray-900 hover:border-primary focus-visible:ring-primary dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 dark:hover:border-primary',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-primary focus-visible:ring-primary dark:text-gray-300 dark:hover:text-primary-light dark:hover:bg-gray-800',
    gradient: 'bg-gradient-to-r from-primary via-secondary to-tertiary text-white hover:shadow-lg focus-visible:ring-primary shadow-md hover:shadow-xl btn-glow',
    accent: 'bg-accent text-white hover:bg-accent-dark focus-visible:ring-accent shadow-sm hover:shadow-medium',
  };

  const sizes = {
    sm: 'h-9 px-3 text-xs rounded-md',
    md: 'h-11 px-5 text-sm rounded-lg',
    lg: 'h-12 px-6 text-base rounded-lg',
    xl: 'h-14 px-8 text-lg rounded-xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  // Loading spinner
  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  // Button content with icon positioning
  const buttonContent = (
    <>
      {loading && loadingSpinner}
      {icon && iconPosition === 'left' && !loading && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  // Hover effect for gradient variant
  const gradientHoverEffect = variant === 'gradient' ? (
    <span className="absolute inset-0 w-full h-full bg-white/20 scale-0 rounded-md transition-transform group-hover:scale-100" />
  ) : null;

  const MotionComponent = motion[Component as keyof typeof motion] || motion.button;

  return (
    <MotionComponent
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className} group`}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}
      disabled={disabled || loading}
      {...props}
    >
      {gradientHoverEffect}
      {buttonContent}
    </MotionComponent>
  );
}
