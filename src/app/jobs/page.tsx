'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getJobOpportunities, getCareerPaths } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedComponents';

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary_range: { min: number; max: number };
  application_url: string;
  career_path_id: string;
}

interface CareerPath {
  id: string;
  title: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    careerPathId: '',
    minSalary: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch jobs
        const { data: jobsData, error: jobsError } = await getJobOpportunities();
        
        if (jobsError) {
          throw jobsError;
        }

        setJobs(jobsData || []);

        // Fetch career paths for filtering
        const { data: careerPathsData, error: careerPathsError } = await getCareerPaths();
        
        if (careerPathsError) {
          throw careerPathsError;
        }

        setCareerPaths(careerPathsData || []);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load job opportunities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name === 'minSalary' ? parseInt(value) || 0 : value
    }));
  };

  const filteredJobs = jobs.filter(job => {
    // Search filter
    if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !job.company.toLowerCase().includes(filters.search.toLowerCase()) &&
        !job.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Location filter
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Career path filter
    if (filters.careerPathId && job.career_path_id !== filters.careerPathId) {
      return false;
    }
    
    // Salary filter
    if (filters.minSalary > 0 && job.salary_range.min < filters.minSalary) {
      return false;
    }
    
    return true;
  });

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
          <h2 className="text-xl font-bold mb-2">Error Loading Job Opportunities</h2>
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
            Job Opportunities
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
            Explore current job openings across various career paths. Find opportunities that match your skills, interests, and salary expectations.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search jobs, companies, or keywords..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {showFilters && (
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="City, state, or remote"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={filters.location}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label htmlFor="careerPathId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Career Path
                  </label>
                  <select
                    id="careerPathId"
                    name="careerPathId"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={filters.careerPathId}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Career Paths</option>
                    {careerPaths.map(path => (
                      <option key={path.id} value={path.id}>
                        {path.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Minimum Salary
                  </label>
                  <select
                    id="minSalary"
                    name="minSalary"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={filters.minSalary}
                    onChange={handleFilterChange}
                  >
                    <option value="0">Any Salary</option>
                    <option value="40000">$40,000+</option>
                    <option value="60000">$60,000+</option>
                    <option value="80000">$80,000+</option>
                    <option value="100000">$100,000+</option>
                    <option value="120000">$120,000+</option>
                    <option value="150000">$150,000+</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFilters({
                    search: '',
                    location: '',
                    careerPathId: '',
                    minSalary: 0,
                  })}
                  className="mr-2"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </FadeIn>

      {filteredJobs.length === 0 ? (
        <FadeIn delay={0.2}>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No job opportunities found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find any job opportunities matching your filters. Try adjusting your search criteria.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setFilters({
                search: '',
                location: '',
                careerPathId: '',
                minSalary: 0,
              })}
            >
              Clear Filters
            </Button>
          </div>
        </FadeIn>
      ) : (
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => {
            const careerPath = careerPaths.find(path => path.id === job.career_path_id);
            
            return (
              <StaggerItem key={job.id}>
                <Card variant="elevated" className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {job.title}
                          </h2>
                          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                            <span className="font-medium">{job.company}</span>
                            <span className="mx-2">•</span>
                            <span>{job.location}</span>
                          </div>
                        </div>
                        {careerPath && (
                          <Link href={`/careers/${job.career_path_id}`}>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                              {careerPath.title}
                            </span>
                          </Link>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      
                      {job.requirements && job.requirements.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Requirements:</h3>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {job.requirements.slice(0, 3).map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                            {job.requirements.length > 3 && (
                              <li className="text-gray-500 dark:text-gray-500">
                                +{job.requirements.length - 3} more requirements
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      {job.salary_range && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Salary Range:</h3>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">
                            ${job.salary_range.min.toLocaleString()} - ${job.salary_range.max.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
                      <a 
                        href={job.application_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button variant="gradient" fullWidth>
                          Apply Now
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}
