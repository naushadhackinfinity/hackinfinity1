'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { saveAssessmentResults } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedComponents';

// Sample assessment questions
const personalityQuestions = [
  {
    id: 1,
    question: 'I enjoy working with people more than working alone.',
    category: 'social',
  },
  {
    id: 2,
    question: 'I prefer solving complex problems over routine tasks.',
    category: 'analytical',
  },
  {
    id: 3,
    question: 'I am comfortable taking risks and trying new approaches.',
    category: 'enterprising',
  },
  {
    id: 4,
    question: 'I enjoy creating things and expressing myself artistically.',
    category: 'artistic',
  },
  {
    id: 5,
    question: 'I like working with my hands and physical tools.',
    category: 'practical',
  },
  {
    id: 6,
    question: 'I prefer structured environments with clear rules and procedures.',
    category: 'conventional',
  },
  {
    id: 7,
    question: 'I enjoy helping others solve their problems.',
    category: 'social',
  },
  {
    id: 8,
    question: 'I like to analyze data and information to draw conclusions.',
    category: 'analytical',
  },
  {
    id: 9,
    question: 'I am comfortable taking leadership roles in group settings.',
    category: 'enterprising',
  },
  {
    id: 10,
    question: 'I value creativity and self-expression in my work.',
    category: 'artistic',
  },
];

const skillsQuestions = [
  {
    id: 1,
    question: 'I am good at explaining complex ideas to others.',
    category: 'communication',
  },
  {
    id: 2,
    question: 'I can easily identify patterns and solve logical problems.',
    category: 'analytical',
  },
  {
    id: 3,
    question: 'I am skilled at organizing tasks and managing my time effectively.',
    category: 'organization',
  },
  {
    id: 4,
    question: 'I can work well with others to achieve common goals.',
    category: 'teamwork',
  },
  {
    id: 5,
    question: 'I am comfortable using technology and learning new software.',
    category: 'technical',
  },
  {
    id: 6,
    question: 'I can think of creative solutions to problems.',
    category: 'creativity',
  },
  {
    id: 7,
    question: 'I am good at persuading others and negotiating.',
    category: 'persuasion',
  },
  {
    id: 8,
    question: 'I can adapt quickly to changing situations and requirements.',
    category: 'adaptability',
  },
  {
    id: 9,
    question: 'I am skilled at analyzing data and making decisions based on it.',
    category: 'data_analysis',
  },
  {
    id: 10,
    question: 'I can effectively plan and execute projects from start to finish.',
    category: 'project_management',
  },
];

const interestsQuestions = [
  {
    id: 1,
    question: 'I enjoy reading about scientific discoveries and technological innovations.',
    category: 'science_tech',
  },
  {
    id: 2,
    question: 'I like creating art, music, or writing.',
    category: 'arts',
  },
  {
    id: 3,
    question: 'I am interested in business, finance, and entrepreneurship.',
    category: 'business',
  },
  {
    id: 4,
    question: 'I enjoy helping others and contributing to society.',
    category: 'social_service',
  },
  {
    id: 5,
    question: 'I like working with my hands and building things.',
    category: 'hands_on',
  },
  {
    id: 6,
    question: 'I am interested in health, wellness, and medicine.',
    category: 'healthcare',
  },
  {
    id: 7,
    question: 'I enjoy teaching or explaining concepts to others.',
    category: 'education',
  },
  {
    id: 8,
    question: 'I like analyzing data and solving complex problems.',
    category: 'analysis',
  },
  {
    id: 9,
    question: 'I am interested in law, politics, and public policy.',
    category: 'law_policy',
  },
  {
    id: 10,
    question: 'I enjoy outdoor activities and environmental conservation.',
    category: 'environment',
  },
];

type AssessmentType = 'personality' | 'skills' | 'interests';

export default function AssessmentsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeAssessment, setActiveAssessment] = useState<AssessmentType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = activeAssessment === 'personality'
    ? personalityQuestions
    : activeAssessment === 'skills'
      ? skillsQuestions
      : interestsQuestions;

  const handleStartAssessment = (type: AssessmentType) => {
    setActiveAssessment(type);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestion]: value });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      // Process results
      const categories: Record<string, number> = {};

      questions.forEach((q, index) => {
        if (answers[index] !== undefined) {
          categories[q.category] = (categories[q.category] || 0) + answers[index];
        }
      });

      // Calculate top categories
      const sortedCategories = Object.entries(categories)
        .sort((a, b) => b[1] - a[1])
        .map(([category, score]) => ({
          category,
          score,
          percentage: Math.round((score / (Object.keys(answers).length * 5)) * 100)
        }));

      // Save results
      const { error } = await saveAssessmentResults(user.id, activeAssessment || 'general', {
        answers,
        categories: sortedCategories,
        completedAt: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      // Navigate to results page
      router.push('/assessments/results');
    } catch (err) {
      console.error('Error submitting assessment:', err);
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAssessmentList = () => (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StaggerItem>
        <Card variant="elevated" className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
          <CardHeader gradient>
            <div className="flex items-center">
              <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <CardTitle>Personality Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover your personality traits and how they align with different career paths.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">10 questions</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">5 minutes to complete</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">Personalized insights</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={() => handleStartAssessment('personality')} variant="gradient" fullWidth>
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
      </StaggerItem>

      <StaggerItem>
        <Card variant="elevated" className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
          <CardHeader gradient>
            <div className="flex items-center">
              <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <CardTitle>Skills Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Evaluate your skills and identify areas of strength and opportunities for growth.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">10 questions</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">5 minutes to complete</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">Skill gap analysis</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={() => handleStartAssessment('skills')} variant="gradient" fullWidth>
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
      </StaggerItem>

      <StaggerItem>
        <Card variant="elevated" className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600"></div>
          <CardHeader gradient>
            <div className="flex items-center">
              <div className="mr-4 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <CardTitle>Interests Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explore your interests and find career paths that align with your passions.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">10 questions</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">5 minutes to complete</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">Career recommendations</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={() => handleStartAssessment('interests')} variant="gradient" fullWidth>
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
      </StaggerItem>
    </StaggerContainer>
  );

  const renderAssessment = () => {
    const question = questions[currentQuestion];

    // Determine the assessment color theme
    const getAssessmentTheme = () => {
      switch (activeAssessment) {
        case 'personality':
          return {
            gradient: 'from-purple-500 to-indigo-600',
            bg: 'bg-purple-100 dark:bg-purple-900/30',
            text: 'text-purple-600 dark:text-purple-400',
            progressBg: 'bg-purple-600 dark:bg-purple-500',
            selectedBg: 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 dark:border-purple-400 text-purple-700 dark:text-purple-300',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )
          };
        case 'skills':
          return {
            gradient: 'from-blue-500 to-cyan-600',
            bg: 'bg-blue-100 dark:bg-blue-900/30',
            text: 'text-blue-600 dark:text-blue-400',
            progressBg: 'bg-blue-600 dark:bg-blue-500',
            selectedBg: 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-300',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )
          };
        case 'interests':
          return {
            gradient: 'from-amber-500 to-orange-600',
            bg: 'bg-amber-100 dark:bg-amber-900/30',
            text: 'text-amber-600 dark:text-amber-400',
            progressBg: 'bg-amber-600 dark:bg-amber-500',
            selectedBg: 'bg-amber-100 dark:bg-amber-900/30 border-amber-500 dark:border-amber-400 text-amber-700 dark:text-amber-300',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            )
          };
        default:
          return {
            gradient: 'from-indigo-500 to-sky-600',
            bg: 'bg-indigo-100 dark:bg-indigo-900/30',
            text: 'text-indigo-600 dark:text-indigo-400',
            progressBg: 'bg-indigo-600 dark:bg-indigo-500',
            selectedBg: 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300',
            icon: null
          };
      }
    };

    const theme = getAssessmentTheme();

    return (
      <FadeIn>
        <Card variant="elevated" className="overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme.gradient}`}></div>
          <CardHeader gradient>
            <div className="flex items-center">
              <div className={`mr-4 p-2 ${theme.bg} rounded-full`}>
                <div className={theme.text}>
                  {theme.icon}
                </div>
              </div>
              <CardTitle>
                {activeAssessment === 'personality'
                  ? 'Personality Assessment'
                  : activeAssessment === 'skills'
                    ? 'Skills Assessment'
                    : 'Interests Assessment'}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                </p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`${theme.progressBg} h-2.5 rounded-full transition-all duration-300 ease-in-out`}
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Question {currentQuestion + 1}</h3>
              <p className="text-lg text-gray-800 dark:text-gray-200">{question.question}</p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Strongly Disagree</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Strongly Agree</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className={`py-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                      answers[currentQuestion] === value
                        ? theme.selectedBg
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="text-lg font-semibold mb-1">{value}</div>
                    <div className="text-xs">
                      {value === 1 && 'Not at all'}
                      {value === 2 && 'Slightly'}
                      {value === 3 && 'Moderately'}
                      {value === 4 && 'Very much'}
                      {value === 5 && 'Completely'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveAssessment(null)}
              >
                Save & Exit
              </Button>
            </div>
            {currentQuestion < questions.length - 1 ? (
              <Button
                variant="gradient"
                onClick={() => {
                  if (answers[currentQuestion] !== undefined) {
                    setCurrentQuestion(currentQuestion + 1);
                  }
                }}
                disabled={answers[currentQuestion] === undefined}
                className="flex items-center"
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            ) : (
              <Button
                variant="gradient"
                onClick={handleSubmitAssessment}
                disabled={answers[currentQuestion] === undefined || isSubmitting}
                className="flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Complete Assessment
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </FadeIn>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <FadeIn>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 inline-block mb-4">
            Career Assessments
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Take our comprehensive assessments to discover careers that match your personality, skills, and interests.
            Get personalized recommendations based on your unique profile.
          </p>
        </div>
      </FadeIn>

      {!user && (
        <FadeIn delay={0.1}>
          <div className="bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-900/20 dark:to-sky-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-xl p-6 mb-10 shadow-sm">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Create an account for personalized recommendations
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  While you can take assessments as a guest, creating an account allows you to save your results,
                  track your progress, and receive tailored career recommendations based on your assessment history.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/login">
                    <Button variant="outline" className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="gradient" className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Choose an Assessment
          </h2>
          {activeAssessment ? renderAssessment() : renderAssessmentList()}
        </div>
      </FadeIn>

      {!activeAssessment && (
        <FadeIn delay={0.3}>
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Take Career Assessments?
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    Career assessments help you understand your strengths, interests, and values, providing valuable insights
                    into potential career paths that align with your unique profile.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p><strong>Self-Discovery:</strong> Gain insights into your personality traits, skills, and interests.</p>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p><strong>Career Exploration:</strong> Discover career paths you might not have considered before.</p>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p><strong>Informed Decisions:</strong> Make more confident career choices based on data-driven insights.</p>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p><strong>Personalized Recommendations:</strong> Receive tailored career suggestions that match your profile.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-48 h-48 bg-gradient-to-r from-indigo-100 to-sky-100 dark:from-indigo-900/30 dark:to-sky-900/30 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
