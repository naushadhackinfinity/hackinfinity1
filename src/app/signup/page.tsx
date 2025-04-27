'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/AnimatedComponents';

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);
    setUserEmail(data.email);

    try {
      const { error } = await signUp(data.email, data.password);

      if (error) {
        setError(error.message);
        return;
      }

      // Show success message instead of redirecting
      setSignupSuccess(true);

      // Optional: Redirect after a delay (uncomment if needed)
      // setTimeout(() => {
      //   router.push('/profile/create');
      // }, 5000);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] px-4 py-12">
      <Card className="w-full max-w-md">
        {signupSuccess ? (
          <FadeIn>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-green-600 dark:text-green-400">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                Registration Successful!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                We've sent a verification email to <span className="font-semibold">{userEmail}</span>.
              </p>
              <p className="mb-8 text-gray-600 dark:text-gray-300">
                Please check your inbox and click the verification link to complete your registration.
              </p>
              <div className="flex flex-col space-y-3">
                <Link href="/login">
                  <Button variant="primary" fullWidth>
                    Go to Login
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" fullWidth>
                    Return to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </FadeIn>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm border border-red-100 dark:border-red-800">
                  <div className="font-semibold mb-1">Error</div>
                  <p>{error}</p>
                  {error.includes('Supabase') || error.includes('configuration') || error.includes('.env.local') ? (
                    <div className="mt-2 pt-2 border-t border-red-100 dark:border-red-800">
                      <p className="font-medium">Possible Solution:</p>
                      <p className="mt-1">
                        Please make sure your Supabase URL and anon key are correctly set in the .env.local file.
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  variant="gradient"
                >
                  {isLoading ? 'Creating account...' : 'Sign up'}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-center w-full">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-800">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
