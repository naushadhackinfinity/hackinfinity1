'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { getCareerPathById, getEducationalResources, getJobOpportunities, bookmarkCareerPath } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/AnimatedComponents';
import { Database } from '@/types/database.types';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

type CareerPath = Database['public']['Tables']['career_paths']['Row'];
type EducationalResource = Database['public']['Tables']['educational_resources']['Row'];
type JobOpportunity = Database['public']['Tables']['job_opportunities']['Row'];

export default function CareerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [career, setCareer] = useState<CareerPath | null>(null);
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarking, setBookmarking] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const id = params.id as string;

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const { data: careerData, error: careerError } = await getCareerPathById(id);

        if (careerError) {
          throw careerError;
        }

        setCareer(careerData);

        // Fetch related resources
        const { data: resourcesData, error: resourcesError } = await getEducationalResources(id);

        if (resourcesError) {
          throw resourcesError;
        }

        setResources(resourcesData || []);

        // Fetch related job opportunities
        const { data: jobsData, error: jobsError } = await getJobOpportunities(id);

        if (jobsError) {
          throw jobsError;
        }

        setJobs(jobsData || []);
      } catch (err) {
        console.error('Error fetching career data:', err);
        setError('Failed to load career data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCareerData();
  }, [id]);

  const handleBookmark = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setBookmarking(true);
    try {
      const { error } = await bookmarkCareerPath(user.id, id);

      if (error) {
        throw error;
      }

      setBookmarked(true);
    } catch (err) {
      console.error('Error bookmarking career:', err);
      alert('Failed to bookmark career. Please try again.');
    } finally {
      setBookmarking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">
          {error || 'Career not found'}
        </div>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  // Sample data for charts
  const skillDistributionData = {
    labels: ['Technical Skills', 'Soft Skills', 'Domain Knowledge'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  const salaryTrendsData = {
    labels: ['Entry Level', 'Mid Level', 'Senior Level', 'Expert'],
    datasets: [
      {
        label: 'Salary Range (USD)',
        data: [
          (career.salary_range as any)?.min || 50000,
          ((career.salary_range as any)?.min || 50000) * 1.5,
          ((career.salary_range as any)?.max || 100000) * 0.8,
          (career.salary_range as any)?.max || 100000
        ],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <FadeIn>
        <div className="mb-8">
          <Link href="/careers">
            <Button variant="outline" size="sm" className="mb-4">
              ← Back to Careers
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 inline-block">{career.title}</h1>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={handleBookmark}
                disabled={bookmarking || bookmarked}
                className="flex items-center"
                variant={bookmarked ? "outline" : "gradient"}
              >
                {bookmarked ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                      <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                    </svg>
                    Bookmarked
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                    {bookmarking ? 'Bookmarking...' : 'Bookmark'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">{career.description}</p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Required Skills</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {career.required_skills?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Education Requirements</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {career.education_requirements?.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Salary Range</h3>
                  <p className="text-gray-700">
                    {career.salary_range ?
                      `$${(career.salary_range as any).min.toLocaleString()} - $${(career.salary_range as any).max.toLocaleString()} per year` :
                      'Not specified'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Job Outlook</h3>
                  <p className="text-gray-700">{career.job_outlook || 'Not specified'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Educational Resources</CardTitle>
            </CardHeader>
            <CardContent>
              {resources.length === 0 ? (
                <p className="text-gray-500">No educational resources available for this career path.</p>
              ) : (
                <div className="space-y-6">
                  {resources.map((resource) => (
                    <div key={resource.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <h3 className="font-medium text-gray-900">{resource.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{resource.resource_type}</p>
                      <p className="text-gray-700 mt-2">{resource.description}</p>
                      <div className="mt-3 flex space-x-3">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 inline-flex items-center"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Learn more
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Job Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              {jobs.length === 0 ? (
                <p className="text-gray-500">No job opportunities available for this career path.</p>
              ) : (
                <div className="space-y-6">
                  {jobs.map((job) => (
                    <div key={job.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{job.title}</h3>
                          <p className="text-gray-600 mt-1">{job.company} • {job.location}</p>
                        </div>
                        <a
                          href={job.application_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 inline-flex items-center"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Apply
                        </a>
                      </div>
                      <p className="text-gray-700 mt-2">{job.description}</p>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700">Requirements:</h4>
                        <ul className="list-disc list-inside text-gray-600 text-sm mt-1">
                          {job.requirements?.slice(0, 3).map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                          {(job.requirements?.length || 0) > 3 && (
                            <li>And {(job.requirements?.length || 0) - 3} more requirements</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Pie data={skillDistributionData} options={{ maintainAspectRatio: false }} />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Salary Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar
                    data={salaryTrendsData}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: (value) => `$${value.toLocaleString()}`
                          }
                        }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Related Careers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <Link href="/careers" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to All Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers?skill=JavaScript" className="text-indigo-600 hover:text-indigo-800">
                      Software Engineer
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers?skill=Design" className="text-indigo-600 hover:text-indigo-800">
                      UX/UI Designer
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers?skill=Project Management" className="text-indigo-600 hover:text-indigo-800">
                      Product Manager
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers?skill=Python" className="text-indigo-600 hover:text-indigo-800">
                      Data Scientist
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers?skill=DevOps" className="text-indigo-600 hover:text-indigo-800">
                      DevOps Engineer
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Take Action</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link href="/assessments" passHref legacyBehavior>
                    <Button as="a" variant="outline" fullWidth className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Take Career Assessment
                    </Button>
                  </Link>
                  <Link href="/resources" passHref legacyBehavior>
                    <Button as="a" variant="outline" fullWidth className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Find Learning Resources
                    </Button>
                  </Link>
                  <Link href="/jobs" passHref legacyBehavior>
                    <Button as="a" fullWidth className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Browse Job Opportunities
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
