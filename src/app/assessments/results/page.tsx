'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useAuth } from '@/contexts/AuthContext';
import { getAssessmentResults, getCareerRecommendations } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Database } from '@/types/database.types';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

type AssessmentResult = {
  id: string;
  user_id: string;
  assessment_type: string;
  results: {
    answers: Record<number, number>;
    categories: Array<{
      category: string;
      score: number;
      percentage: number;
    }>;
    completedAt: string;
  };
  created_at: string;
};

type CareerPath = Database['public']['Tables']['career_paths']['Row'] & { matchScore?: number };

const categoryLabels: Record<string, string> = {
  // Personality categories
  social: 'Social',
  analytical: 'Analytical',
  enterprising: 'Enterprising',
  artistic: 'Artistic',
  practical: 'Practical',
  conventional: 'Conventional',

  // Skills categories
  communication: 'Communication',
  organization: 'Organization',
  teamwork: 'Teamwork',
  technical: 'Technical',
  creativity: 'Creativity',
  persuasion: 'Persuasion',
  adaptability: 'Adaptability',
  data_analysis: 'Data Analysis',
  project_management: 'Project Management',

  // Interests categories
  science_tech: 'Science & Technology',
  arts: 'Arts & Culture',
  business: 'Business & Finance',
  social_service: 'Social Service',
  hands_on: 'Hands-on Work',
  healthcare: 'Healthcare',
  education: 'Education',
  analysis: 'Analysis & Research',
  law_policy: 'Law & Policy',
  environment: 'Environment & Nature',
};

export default function AssessmentResultsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [recommendations, setRecommendations] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const { data, error } = await getAssessmentResults(user.id);

        if (error) {
          throw error;
        }

        if (!data || data.length === 0) {
          router.push('/assessments');
          return;
        }

        setResults(data);

        // Fetch career recommendations
        const { data: recommendationsData, error: recommendationsError } = await getCareerRecommendations(user.id);

        if (recommendationsError) {
          throw recommendationsError;
        }

        setRecommendations(recommendationsData || []);
      } catch (err) {
        console.error('Error fetching assessment results:', err);
        setError('Failed to load assessment results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">
          {error}
        </div>
        <Button onClick={() => router.refresh()}>Try Again</Button>
      </div>
    );
  }

  if (results.length === 0) {
    return null; // Should not reach here as we redirect to assessments
  }

  // Get the most recent result of each type
  const personalityResult = results
    .filter(r => r.assessment_type === 'personality')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  const skillsResult = results
    .filter(r => r.assessment_type === 'skills')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  const interestsResult = results
    .filter(r => r.assessment_type === 'interests')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  // Prepare chart data
  const prepareChartData = (result?: AssessmentResult) => {
    if (!result) return null;

    const categories = result.results.categories.slice(0, 5);

    return {
      labels: categories.map(c => categoryLabels[c.category] || c.category),
      datasets: [
        {
          data: categories.map(c => c.percentage),
          backgroundColor: [
            '#3b82f6', // blue
            '#10b981', // green
            '#f59e0b', // amber
            '#ef4444', // red
            '#8b5cf6', // purple
          ],
          borderWidth: 0,
        },
      ],
    };
  };

  const personalityChartData = prepareChartData(personalityResult);
  const skillsChartData = prepareChartData(skillsResult);
  const interestsChartData = prepareChartData(interestsResult);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 inline-block">Your Assessment Results</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Based on your assessment responses, we've identified your top traits, skills, and interests to match you with ideal career paths.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {personalityChartData && (
          <Card>
            <CardHeader>
              <CardTitle>Personality Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6">
                <Pie data={personalityChartData} options={{ maintainAspectRatio: false }} />
              </div>
              <div className="space-y-2">
                {personalityResult.results.categories.slice(0, 3).map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {categoryLabels[category.category] || category.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {skillsChartData && (
          <Card>
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6">
                <Pie data={skillsChartData} options={{ maintainAspectRatio: false }} />
              </div>
              <div className="space-y-2">
                {skillsResult.results.categories.slice(0, 3).map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {categoryLabels[category.category] || category.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {interestsChartData && (
          <Card>
            <CardHeader>
              <CardTitle>Interest Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6">
                <Pie data={interestsChartData} options={{ maintainAspectRatio: false }} />
              </div>
              <div className="space-y-2">
                {interestsResult.results.categories.slice(0, 3).map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {categoryLabels[category.category] || category.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-amber-500 dark:bg-amber-400 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>How We Match You With Careers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Our Recommendation Algorithm</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our advanced career matching algorithm analyzes multiple factors to provide you with personalized career recommendations:
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Personality Traits (20%)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your personality assessment results are matched with careers that align with your natural tendencies and preferences.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Skills Assessment (25%)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      We analyze your strongest skills and match them with careers where these abilities are most valuable.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Interest Areas (15%)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your interests are factored in to ensure recommended careers align with subjects and activities you enjoy.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Profile Information (40%)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your profile skills, interests, and career goals are weighted heavily to ensure recommendations match your stated preferences.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/30">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Career Match Score</h3>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">What Your Match Score Means</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Each career is assigned a match percentage based on how well it aligns with your unique profile.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">80-100% Match</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Excellent Fit</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 dark:bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    These careers strongly align with your profile and assessment results.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">60-79% Match</span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Good Fit</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    These careers align well with many aspects of your profile.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Below 60% Match</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Potential Fit</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    These careers match some aspects of your profile but may require development in certain areas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Recommended Career Paths</CardTitle>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Based on your assessment results, we've identified these career paths as strong matches for your profile.
          </p>
        </CardHeader>
        <CardContent>
          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No recommendations yet. Complete your profile to get personalized career recommendations.
              </p>
            </div>
          ) : (
            <>
              {/* Top 3 recommendations with detailed cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {recommendations.slice(0, 3).map((career, index) => (
                  <div
                    key={career.id}
                    className={`border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${
                      index === 0
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : index === 1
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-3 ${
                        index === 0
                          ? 'bg-indigo-600'
                          : index === 1
                            ? 'bg-blue-600'
                            : 'bg-green-600'
                      }`}>
                        {index === 0 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        ) : (
                          <span className="text-lg font-bold">{index + 1}</span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{career.title}</h3>
                    </div>

                    {career.matchScore && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Match Score</span>
                          <span className={`text-sm font-bold ${
                            career.matchScore >= 80
                              ? 'text-green-600 dark:text-green-400'
                              : career.matchScore >= 60
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {Math.round(career.matchScore)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              career.matchScore >= 80
                                ? 'bg-green-600'
                                : career.matchScore >= 60
                                  ? 'bg-blue-600'
                                  : 'bg-gray-500'
                            }`}
                            style={{ width: `${Math.min(100, career.matchScore)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Why this matches you:</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {personalityResult && (
                          <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Aligns with your {personalityResult.results.categories[0].category} personality trait
                          </li>
                        )}
                        {skillsResult && (
                          <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Matches your {skillsResult.results.categories[0].category} skills
                          </li>
                        )}
                        {interestsResult && (
                          <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Fits your interest in {interestsResult.results.categories[0].category}
                          </li>
                        )}
                      </ul>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{career.description}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {career.salary_range ?
                          `$${(career.salary_range as any).min.toLocaleString()} - $${(career.salary_range as any).max.toLocaleString()}` :
                          'Salary varies'}
                      </span>
                      <Link href={`/careers/${career.id}`}>
                        <Button variant="gradient" size="sm" className="flex items-center">
                          View Details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional recommendations in a more compact format */}
              {recommendations.length > 3 && (
                <>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Additional Matches</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.slice(3, 9).map((career) => (
                      <div key={career.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow flex items-center">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{career.title}</h3>
                          {career.matchScore && (
                            <div className="mt-1 flex items-center">
                              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    career.matchScore >= 80
                                      ? 'bg-green-600'
                                      : career.matchScore >= 60
                                        ? 'bg-blue-600'
                                        : 'bg-gray-500'
                                  }`}
                                  style={{ width: `${Math.min(100, career.matchScore)}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {Math.round(career.matchScore)}% Match
                              </span>
                            </div>
                          )}
                          <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm line-clamp-1">{career.description}</p>
                        </div>
                        <Link href={`/careers/${career.id}`} className="ml-4">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          <div className="mt-8 text-center">
            <Link href="/careers">
              <Button variant="gradient" size="lg" className="shadow-md">
                Explore All Career Paths
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Complete Your Profile</h3>
              <p className="text-gray-600 mb-4">
                Add more details to your profile to get more accurate career recommendations.
              </p>
              <Link href="/profile/edit">
                <Button variant="outline" fullWidth>Update Profile</Button>
              </Link>
            </div>

            <div className="border rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Explore Learning Resources</h3>
              <p className="text-gray-600 mb-4">
                Discover educational resources to help you develop skills for your desired career.
              </p>
              <Link href="/resources">
                <Button variant="outline" fullWidth>Browse Resources</Button>
              </Link>
            </div>

            <div className="border rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Find Job Opportunities</h3>
              <p className="text-gray-600 mb-4">
                Browse job listings that match your skills, interests, and career goals.
              </p>
              <Link href="/jobs">
                <Button variant="outline" fullWidth>View Jobs</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
