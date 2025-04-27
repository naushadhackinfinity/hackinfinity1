'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCareerPaths, bookmarkCareerPath } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Database } from '@/types/database.types';

type CareerPath = Database['public']['Tables']['career_paths']['Row'];

export default function CareersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [careers, setCareers] = useState<CareerPath[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [bookmarkingId, setBookmarkingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const { data, error } = await getCareerPaths();

        if (error) {
          console.error('Error fetching careers:', error);
          setError(error.message || 'Failed to load career data. Please try again later.');
          setLoading(false);
          return;
        }

        // Check if data is empty or null
        if (!data || data.length === 0) {
          // This could be due to no data in the database or Supabase configuration issues
          console.warn('No career data found. This could be due to an empty database or Supabase configuration issues.');
          setCareers([]);
          setFilteredCareers([]);
          setAllSkills([]);
          setLoading(false);
          return;
        }

        setCareers(data);
        setFilteredCareers(data);

        // Extract all unique skills
        const skills = new Set<string>();
        data.forEach((career: CareerPath) => {
          career.required_skills?.forEach(skill => {
            if (skill) skills.add(skill);
          });
        });
        setAllSkills(Array.from(skills).sort());
      } catch (err: any) {
        console.error('Error fetching careers:', err);
        setError(err?.message || 'An unexpected error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  useEffect(() => {
    // Filter careers based on search term and selected skills
    const filtered = careers.filter((career: CareerPath) => {
      const matchesSearch = searchTerm === '' ||
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSkills = selectedSkills.length === 0 ||
        selectedSkills.some(skill => career.required_skills?.includes(skill));

      return matchesSearch && matchesSkills;
    });

    setFilteredCareers(filtered);
  }, [searchTerm, selectedSkills, careers]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleBookmark = async (careerPathId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }

    setBookmarkingId(careerPathId);
    try {
      const { error } = await bookmarkCareerPath(user.id, careerPathId);

      if (error) {
        throw error;
      }

      // Show success message
      alert('Career path bookmarked successfully!');
    } catch (err: any) {
      console.error('Error bookmarking career:', err);
      alert('Failed to bookmark career. Please try again.');
    } finally {
      setBookmarkingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl text-red-700 dark:text-red-300 mb-6 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Error Loading Careers</h2>
          <p className="mb-4">{error}</p>
          <p className="text-sm mb-4">
            This could be due to a Supabase configuration issue. Please make sure your .env.local file
            contains valid Supabase URL and anon key values.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 sm:text-4xl">
          Explore Career Paths
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover detailed information about various career paths, including required skills,
          education requirements, salary ranges, and job outlook.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card className="bg-gradient-to-br from-sky-50 to-white dark:from-gray-800 dark:to-gray-900 border border-sky-100 dark:border-sky-900/30 shadow-md">
              <CardContent className="p-6">
                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      className="w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="Search careers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filter by Skills</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {allSkills.map((skill) => (
                      <div key={skill} className="flex items-center">
                        <input
                          id={`skill-${skill}`}
                          type="checkbox"
                          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 dark:border-gray-700 rounded"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                        />
                        <label
                          htmlFor={`skill-${skill}`}
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedSkills.length > 0 && (
                    <button
                      className="mt-4 text-sm text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 flex items-center"
                      onClick={() => setSelectedSkills([])}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear filters
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-3">
          {filteredCareers.length === 0 ? (
            <div className="text-center py-12 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-100 dark:border-sky-800/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-sky-400 dark:text-sky-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No careers found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCareers.map((career) => (
                <Card key={career.id} className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-sky-200 dark:hover:border-sky-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{career.title}</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">{career.description}</p>

                        <div className="mt-4">
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Required Skills:</h3>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {career.required_skills?.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Salary Range:</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {career.salary_range ?
                                `$${(career.salary_range as any).min.toLocaleString()} - $${(career.salary_range as any).max.toLocaleString()}` :
                                'Not specified'}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Outlook:</h3>
                            <p className="text-gray-600 dark:text-gray-400">{career.job_outlook || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 md:mt-0 md:ml-6 flex flex-col space-y-2">
                        <Link href={`/careers/${career.id}`}>
                          <Button variant="primary" className="w-full">View Details</Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => handleBookmark(career.id)}
                          disabled={bookmarkingId === career.id}
                          className="flex items-center justify-center w-full"
                        >
                          {bookmarkingId === career.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-sky-500 mr-2"></div>
                              Bookmarking...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                              Bookmark
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
