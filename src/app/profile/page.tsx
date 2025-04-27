'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile, getCareerRecommendations } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Database } from '@/types/database.types';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type CareerPath = Database['public']['Tables']['career_paths']['Row'] & { matchScore?: number };

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const { data, error } = await getUserProfile(user.id);
        
        if (error) {
          if (error.code === 'PGRST116') {
            // Profile not found
            router.push('/profile/create');
            return;
          }
          throw error;
        }

        setProfile(data);

        // Fetch career recommendations
        const { data: recommendationsData, error: recommendationsError } = await getCareerRecommendations(user.id);
        
        if (recommendationsError) {
          throw recommendationsError;
        }

        setRecommendations(recommendationsData || []);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
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

  if (!profile) {
    return null; // Should not reach here as we redirect to create profile
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Interests</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.interests?.map((interest, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Career Goals</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-600">
                    {profile.career_goals?.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link href="/profile/edit">
                    <Button variant="outline" fullWidth>
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {profile.education?.map((edu: any, index: number) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                    <p className="text-gray-600">{edu.degree} in {edu.field_of_study}</p>
                    <p className="text-sm text-gray-500">
                      {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {profile.experiences?.map((exp: any, index: number) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                    </p>
                    {exp.description && (
                      <p className="mt-2 text-gray-600">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Career Paths</CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No recommendations yet. Complete your profile to get personalized career recommendations.
                  </p>
                  <div className="mt-4">
                    <Link href="/assessments">
                      <Button>Take Career Assessment</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {recommendations.slice(0, 5).map((career) => (
                    <div key={career.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{career.title}</h3>
                          {career.matchScore && (
                            <div className="mt-1 flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${Math.min(100, career.matchScore)}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm text-gray-600">
                                {Math.round(career.matchScore)}% Match
                              </span>
                            </div>
                          )}
                        </div>
                        <Link href={`/careers/${career.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                      <p className="mt-2 text-gray-600 line-clamp-2">{career.description}</p>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700">Required Skills:</h4>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {career.required_skills?.slice(0, 5).map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {skill}
                            </span>
                          ))}
                          {(career.required_skills?.length || 0) > 5 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              +{(career.required_skills?.length || 0) - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 text-center">
                    <Link href="/careers">
                      <Button>Explore All Career Paths</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Career Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Take our comprehensive career assessment to discover careers that match your personality, interests, and skills.
              </p>
              <Link href="/assessments">
                <Button>Start Assessment</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recommended Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Based on your profile and career interests, here are some educational resources to help you develop relevant skills.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-gray-900">Web Development Bootcamp</h3>
                    <p className="text-sm text-gray-500 mt-1">Online Course • 12 weeks</p>
                    <p className="text-gray-600 mt-2 text-sm">Learn modern web development with HTML, CSS, JavaScript, and React.</p>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                      Learn more →
                    </a>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-gray-900">Data Science Fundamentals</h3>
                    <p className="text-sm text-gray-500 mt-1">Online Course • 8 weeks</p>
                    <p className="text-gray-600 mt-2 text-sm">Master the basics of data analysis, visualization, and machine learning.</p>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                      Learn more →
                    </a>
                  </div>
                </div>
                <div className="pt-4 text-center">
                  <Link href="/resources">
                    <Button variant="outline">View All Resources</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
