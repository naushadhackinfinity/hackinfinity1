'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Explore Careers', href: '/careers' },
    { name: 'Assessments', href: '/assessments' },
    { name: 'Resources', href: '/resources' },
    { name: 'Job Opportunities', href: '/jobs' },
  ];

  const userNavigation = user
    ? [
        { name: 'Profile', href: '/profile' },
        { name: 'Bookmarks', href: '/bookmarks' },
        { name: 'Settings', href: '/settings' },
      ]
    : [];

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary gradient-text-animated">
                CareerPathFinder
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-white border-b-2 border-primary'
                      : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-primary-light/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="flex space-x-6">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`text-sm font-medium transition-all duration-300 px-3 py-2 ${
                          pathname === item.href
                            ? 'text-primary-light border-b-2 border-primary-light'
                            : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-primary-light/50'
                        }`}
                      >
                        {item.name === 'Bookmarks' && (
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            {item.name}
                          </span>
                        )}
                        {item.name !== 'Bookmarks' && item.name}
                      </Link>
                    ))}
                    <button
                      onClick={() => signOut()}
                      className="text-sm font-medium transition-all duration-300 px-3 py-2 text-gray-300 hover:text-red-400 hover:border-b-2 hover:border-red-500/50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-primary-light text-primary-light hover:bg-primary-dark/20"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="gradient"
                    className="shadow-lg"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-gray-800" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 text-base font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-primary-light border-l-2 border-primary-light pl-3'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:translate-x-1'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700 px-2">
            {user ? (
              <div className="space-y-1">
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-base font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? 'text-primary-light border-l-2 border-primary-light pl-3'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:translate-x-1'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name === 'Bookmarks' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    )}
                    {item.name === 'Profile' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    {item.name === 'Settings' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-base font-medium text-gray-300 hover:text-red-400 hover:bg-gray-700 transition-all duration-300 hover:translate-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-3 px-4 py-3">
                <Link href="/login">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setMobileMenuOpen(false)}
                    className="border-primary-light text-primary-light hover:bg-gray-700"
                  >
                    Log in
                  </Button>
                </Link>
                <div className="mt-2">
                  <Link href="/signup">
                    <Button
                      variant="gradient"
                      fullWidth
                      onClick={() => setMobileMenuOpen(false)}
                      className="shadow-lg"
                    >
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
