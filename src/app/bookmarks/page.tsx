'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUserBookmarks, removeBookmark } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedComponents';

export default function BookmarksPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingBookmarkId, setRemovingBookmarkId] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const { data, error } = await getUserBookmarks(user.id);
        
        if (error) {
          throw error;
        }

        setBookmarks(data || []);
      } catch (err: any) {
        console.error('Error fetching bookmarks:', err);
        setError(err.message || 'Failed to load bookmarks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user, router]);

  const handleRemoveBookmark = async (bookmarkId: string, careerPathId: string) => {
    if (!user) return;

    setRemovingBookmarkId(bookmarkId);
    try {
      const { error } = await removeBookmark(user.id, careerPathId);
      
      if (error) {
        throw error;
      }

      // Remove the bookmark from the state
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== bookmarkId));
    } catch (err: any) {
      console.error('Error removing bookmark:', err);
      alert('Failed to remove bookmark. Please try again.');
    } finally {
      setRemovingBookmarkId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl text-red-700 dark:text-red-300 mb-6 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Error Loading Bookmarks</h2>
          <p className="mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 inline-block">
            Your Bookmarked Careers
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your saved career paths and explore them in detail.
          </p>
        </div>
      </FadeIn>

      {bookmarks.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600 dark:text-indigo-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't bookmarked any career paths yet. Explore careers and bookmark the ones you're interested in.
            </p>
            <Link href="/careers">
              <Button variant="gradient">
                Explore Careers
              </Button>
            </Link>
          </div>
        </FadeIn>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <StaggerItem key={bookmark.id}>
              <Card variant="elevated" className="h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {bookmark.career_paths.title}
                    </h2>
                    <button
                      onClick={() => handleRemoveBookmark(bookmark.id, bookmark.career_path_id)}
                      disabled={removingBookmarkId === bookmark.id}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove bookmark"
                    >
                      {removingBookmarkId === bookmark.id ? (
                        <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-red-500 rounded-full"></div>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {bookmark.career_paths.description}
                  </p>
                  
                  {bookmark.career_paths.required_skills && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Skills:</h3>
                      <div className="flex flex-wrap gap-2">
                        {bookmark.career_paths.required_skills.slice(0, 3).map((skill: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {bookmark.career_paths.required_skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{bookmark.career_paths.required_skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {bookmark.career_paths.salary_range && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Salary Range:</h3>
                      <p className="text-gray-900 dark:text-gray-100 font-medium">
                        ${bookmark.career_paths.salary_range.min.toLocaleString()} - ${bookmark.career_paths.salary_range.max.toLocaleString()}
                      </p>
                    </div>
                  )}
                  
                  <Link href={`/careers/${bookmark.career_path_id}`}>
                    <Button variant="outline" fullWidth>
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
