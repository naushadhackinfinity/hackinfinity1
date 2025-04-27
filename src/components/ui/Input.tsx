'use client';

import { InputHTMLAttributes, forwardRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'filled' | 'outline' | 'underlined';
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    icon,
    iconPosition = 'left',
    variant = 'default',
    fullWidth = true,
    className = '',
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const variants = {
      default: `w-full px-4 py-3 border rounded-lg transition-all duration-300 bg-white dark:bg-gray-800 ${
        error
          ? 'border-error focus:border-error focus:ring-error/20'
          : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20'
      }`,
      filled: `w-full px-4 py-3 border-2 border-transparent rounded-lg transition-all duration-300 ${
        error
          ? 'bg-error-light/10 dark:bg-error-dark/20 focus:bg-white dark:focus:bg-gray-800 focus:border-error focus:ring-error/20'
          : 'bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20'
      }`,
      outline: `w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 bg-transparent ${
        error
          ? 'border-error focus:ring-error/20'
          : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20'
      }`,
      underlined: `w-full px-4 py-3 border-b-2 rounded-none transition-all duration-300 bg-transparent ${
        error
          ? 'border-error focus:ring-error/20'
          : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20'
      }`,
    };

    const widthClass = fullWidth ? 'w-full' : 'w-auto';

    return (
      <div className={widthClass}>
        {label && (
          <motion.label
            className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              error
                ? 'text-error dark:text-error-light'
                : isFocused
                  ? 'text-primary dark:text-primary-light'
                  : 'text-gray-700 dark:text-gray-300'
            }`}
            initial={{ y: 0 }}
            animate={{ y: isFocused ? -2 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {label}
          </motion.label>
        )}

        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`${variants[variant]} ${
              icon && iconPosition === 'left' ? 'pl-10' : ''
            } ${
              icon && iconPosition === 'right' ? 'pr-10' : ''
            } focus:outline-none focus:ring-4 shadow-sm hover:shadow-md focus:shadow-md ${className}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {icon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-gray-400">
              {icon}
            </div>
          )}

          {error && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              whileHover={{ scale: 1.1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </div>

        {(error || helperText) && (
          <motion.p
            className={`mt-2 text-sm ${error ? 'text-error dark:text-error-light' : 'text-gray-500 dark:text-gray-400'}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {error || helperText}
          </motion.p>
        )}
      </div>
    );
  }
);
