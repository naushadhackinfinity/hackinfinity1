'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getEducationalResources, getCareerPaths } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedComponents';

interface EducationalResource {
  id: string;
  title: string;
  description: string;
  url: string;
  resource_type: string;
  career_path_id: string;
}

interface CareerPath {
  id: string;
  title: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    resourceType: '',
    careerPathId: '',
  });
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch resources
        const { data: resourcesData, error: resourcesError } = await getEducationalResources();
        
        if (resourcesError) {
          throw resourcesError;
        }

        setResources(resourcesData || []);

        // Fetch career paths for filtering
        const { data: careerPathsData, error: careerPathsError } = await getCareerPaths();
        
        if (careerPathsError) {
          throw careerPathsError;
        }

        setCareerPaths(careerPathsData || []);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load educational resources. Please try again later.');
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
      [name]: value
    }));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'all') {
      setFilters(prev => ({ ...prev, resourceType: '' }));
    } else {
      setFilters(prev => ({ ...prev, resourceType: tab }));
    }
  };

  // Get unique resource types for tabs
  const resourceTypes = ['all', ...new Set(resources.map(r => r.resource_type))];

  const filteredResources = resources.filter(resource => {
    // Search filter
    if (filters.search && !resource.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !resource.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Resource type filter
    if (filters.resourceType && resource.resource_type !== filters.resourceType) {
      return false;
    }
    
    // Career path filter
    if (filters.careerPathId && resource.career_path_id !== filters.careerPathId) {
      return false;
    }
    
    return true;
  });

  // Function to get resource type icon
  const getResourceTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'online course':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'certification':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'book':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'article':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
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
          <h2 className="text-xl font-bold mb-2">Error Loading Resources</h2>
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
            Educational Resources
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
            Discover courses, certifications, books, and other resources to help you develop the skills needed for your desired career path.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search resources..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <select
                id="careerPathId"
                name="careerPathId"
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
          </div>

          <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-hide">
            <div className="flex space-x-2">
              {resourceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTabChange(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === type
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {type === 'all' ? 'All Types' : type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {filteredResources.length === 0 ? (
        <FadeIn delay={0.2}>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No resources found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find any educational resources matching your filters. Try adjusting your search criteria.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setFilters({
                  search: '',
                  resourceType: '',
                  careerPathId: '',
                });
                setActiveTab('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </FadeIn>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const careerPath = careerPaths.find(path => path.id === resource.career_path_id);
            
            return (
              <StaggerItem key={resource.id}>
                <Card variant="elevated" className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader gradient>
                    <div className="flex justify-between items-start">
                      <CardTitle>{resource.title}</CardTitle>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/80 dark:bg-gray-800/80 text-indigo-800 dark:text-indigo-300">
                        <span className="mr-1">{getResourceTypeIcon(resource.resource_type)}</span>
                        {resource.resource_type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {resource.description}
                    </p>
                    
                    {careerPath && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Related Career:</h3>
                        <Link href={`/careers/${resource.career_path_id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                          {careerPath.title}
                        </Link>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button variant="gradient" fullWidth>
                        Access Resource
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}

      <FadeIn delay={0.3}>
        <div className="mt-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We're constantly adding new resources to help you on your career journey. If you have suggestions for resources that should be included, please let us know.
              </p>
              <Button variant="gradient">
                Suggest a Resource
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 h-40 bg-indigo-100 dark:bg-indigo-800/30 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
