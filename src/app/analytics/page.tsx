'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Radar } from 'react-chartjs-2';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FadeIn, SlideIn } from '@/components/ui/AnimatedComponents';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  RadialLinearScale, 
  PointElement, 
  LineElement
);

export default function AnalyticsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Sample data for career growth chart
  const careerGrowthData = {
    labels: ['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director'],
    datasets: [
      {
        label: 'Software Engineer',
        data: [60000, 75000, 95000, 120000, 145000, 165000, 190000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
      {
        label: 'Data Scientist',
        data: [65000, 80000, 100000, 125000, 150000, 170000, 195000],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
      },
      {
        label: 'UX Designer',
        data: [55000, 70000, 90000, 110000, 130000, 150000, 175000],
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        borderColor: 'rgb(245, 158, 11)',
        borderWidth: 2,
      },
    ],
  };

  // Sample data for industry demand
  const industryDemandData = {
    labels: ['Tech', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail'],
    datasets: [
      {
        label: 'Job Growth Rate (%)',
        data: [15, 12, 8, 5, 3, 4],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Sample data for skills radar
  const skillsRadarData = {
    labels: ['Technical', 'Communication', 'Leadership', 'Problem Solving', 'Creativity', 'Adaptability'],
    datasets: [
      {
        label: 'Your Skills',
        data: [4, 3, 2, 5, 4, 3],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Industry Average',
        data: [3, 3, 3, 3, 3, 3],
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: 'rgb(245, 158, 11)',
        pointBackgroundColor: 'rgb(245, 158, 11)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(245, 158, 11)',
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <FadeIn>
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 inline-block">Career Analytics</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
            Visualize career trajectories and compare different paths with interactive charts and graphs.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <SlideIn direction="left">
          <Card>
            <CardHeader>
              <CardTitle>Career Growth Trajectory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar
                  data={careerGrowthData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Salary (USD)',
                        },
                        ticks: {
                          callback: (value) => `$${value.toLocaleString()}`,
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Career Stage',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Salary Progression by Career Path',
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </SlideIn>

        <SlideIn direction="right">
          <Card>
            <CardHeader>
              <CardTitle>Industry Demand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Pie
                  data={industryDemandData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                      title: {
                        display: true,
                        text: 'Job Growth Rate by Industry',
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </SlideIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SlideIn direction="left" delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle>Skills Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Radar
                  data={skillsRadarData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        min: 0,
                        max: 5,
                        ticks: {
                          stepSize: 1,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Skills Comparison',
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </SlideIn>

        <SlideIn direction="right" delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle>Career Path Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-green-100 dark:border-green-900/30 rounded-lg bg-green-50 dark:bg-green-900/10">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Based on your profile</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your skills and interests align well with careers in technology and data analysis. Consider exploring these paths further.
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Top Recommended Paths:</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/careers/1" className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Software Engineer</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">95% match with your profile</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers/2" className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Data Scientist</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">88% match with your profile</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers/3" className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Product Manager</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">82% match with your profile</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideIn>
      </div>

      <div className="mt-12 text-center">
        <Link href="/assessments">
          <Button size="lg" variant="gradient" className="shadow-lg">
            Take Career Assessment
          </Button>
        </Link>
      </div>
    </div>
  );
}
