'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting auth session:', error);
          setLoading(false);
          return;
        }

        setUser(data.session?.user || null);

        // Listen for auth changes
        const { data: authData, error: authError } = await supabase.auth.onAuthStateChange(
          (_event: string, session: Session | null) => {
            setUser(session?.user || null);
          }
        );

        if (authError) {
          console.error('Error setting up auth state change listener:', authError);
        }

        return () => {
          if (authData?.subscription) {
            authData.subscription.unsubscribe();
          }
        };
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error('Sign in error:', error);

        // Check if this is a Supabase configuration error
        if (error.message.includes('Supabase') || error.message.includes('configuration')) {
          return {
            error: {
              ...error,
              message: 'Authentication failed: Please ensure your Supabase configuration is correct in .env.local file.'
            }
          };
        }
      }

      return { error };
    } catch (err: any) {
      console.error('Unexpected sign in error:', err);
      return {
        error: {
          message: 'An unexpected authentication error occurred. Please try again later.'
        }
      };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        console.error('Sign up error:', error);

        // Check if this is a Supabase configuration error
        if (error.message.includes('Supabase') || error.message.includes('configuration')) {
          return {
            error: {
              ...error,
              message: 'Registration failed: Please ensure your Supabase configuration is correct in .env.local file.'
            }
          };
        }
      }

      return { error };
    } catch (err: any) {
      console.error('Unexpected sign up error:', err);
      return {
        error: {
          message: 'An unexpected registration error occurred. Please try again later.'
        }
      };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (err: any) {
      console.error('Sign out error:', err);
      return {
        error: {
          message: 'An error occurred while signing out. Please try again.'
        }
      };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
