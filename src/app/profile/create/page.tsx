'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { createUserProfile } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

const profileSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  education: z.array(
    z.object({
      institution: z.string().min(1, 'Institution is required'),
      degree: z.string().min(1, 'Degree is required'),
      field_of_study: z.string().min(1, 'Field of study is required'),
      start_date: z.string().min(1, 'Start date is required'),
      end_date: z.string().optional(),
      current: z.boolean().optional(),
    })
  ).optional(),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  experiences: z.array(
    z.object({
      company: z.string().min(1, 'Company is required'),
      position: z.string().min(1, 'Position is required'),
      description: z.string().optional(),
      start_date: z.string().min(1, 'Start date is required'),
      end_date: z.string().optional(),
      current: z.boolean().optional(),
    })
  ).optional(),
  interests: z.array(z.string()).min(1, 'At least one interest is required'),
  career_goals: z.array(z.string()).min(1, 'At least one career goal is required'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CreateProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [educationFields, setEducationFields] = useState([{ id: 0 }]);
  const [experienceFields, setExperienceFields] = useState([{ id: 0 }]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      education: [{ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', current: false }],
      skills: [''],
      experiences: [{ company: '', position: '', description: '', start_date: '', end_date: '', current: false }],
      interests: [''],
      career_goals: [''],
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      setError('You must be logged in to create a profile');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await createUserProfile(user.id, {
        education: data.education || [],
        skills: data.skills || [],
        experiences: data.experiences || [],
        interests: data.interests || [],
        career_goals: data.career_goals || [],
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.push('/profile');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addEducation = () => {
    setEducationFields([...educationFields, { id: educationFields.length }]);
  };

  const addExperience = () => {
    setExperienceFields([...experienceFields, { id: experienceFields.length }]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                error={errors.full_name?.message}
                {...register('full_name')}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Education</h3>
              {educationFields.map((field, index) => (
                <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-md">
                  <h4 className="font-medium mb-3">Education #{index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Institution"
                      placeholder="University/School name"
                      error={errors.education?.[index]?.institution?.message}
                      {...register(`education.${index}.institution` as const)}
                    />
                    <Input
                      label="Degree"
                      placeholder="e.g., Bachelor's, Master's"
                      error={errors.education?.[index]?.degree?.message}
                      {...register(`education.${index}.degree` as const)}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      label="Field of Study"
                      placeholder="e.g., Computer Science"
                      error={errors.education?.[index]?.field_of_study?.message}
                      {...register(`education.${index}.field_of_study` as const)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Start Date"
                      type="date"
                      error={errors.education?.[index]?.start_date?.message}
                      {...register(`education.${index}.start_date` as const)}
                    />
                    <Input
                      label="End Date (or expected)"
                      type="date"
                      error={errors.education?.[index]?.end_date?.message}
                      {...register(`education.${index}.end_date` as const)}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addEducation}
                className="mt-2"
              >
                Add Another Education
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Skills</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma separated)
                </label>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                        rows={3}
                        placeholder="e.g., JavaScript, React, Project Management"
                        onChange={(e) => {
                          const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
                          field.onChange(skills);
                        }}
                      />
                      {errors.skills && (
                        <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Work Experience</h3>
              {experienceFields.map((field, index) => (
                <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded-md">
                  <h4 className="font-medium mb-3">Experience #{index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Company"
                      placeholder="Company name"
                      error={errors.experiences?.[index]?.company?.message}
                      {...register(`experiences.${index}.company` as const)}
                    />
                    <Input
                      label="Position"
                      placeholder="Job title"
                      error={errors.experiences?.[index]?.position?.message}
                      {...register(`experiences.${index}.position` as const)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                      rows={3}
                      placeholder="Brief description of your responsibilities"
                      {...register(`experiences.${index}.description` as const)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Start Date"
                      type="date"
                      error={errors.experiences?.[index]?.start_date?.message}
                      {...register(`experiences.${index}.start_date` as const)}
                    />
                    <Input
                      label="End Date"
                      type="date"
                      error={errors.experiences?.[index]?.end_date?.message}
                      {...register(`experiences.${index}.end_date` as const)}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addExperience}
                className="mt-2"
              >
                Add Another Experience
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Interests</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interests (comma separated)
                </label>
                <Controller
                  name="interests"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                        rows={3}
                        placeholder="e.g., Technology, Design, Education"
                        onChange={(e) => {
                          const interests = e.target.value.split(',').map(interest => interest.trim()).filter(Boolean);
                          field.onChange(interests);
                        }}
                      />
                      {errors.interests && (
                        <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Career Goals</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Career Goals (comma separated)
                </label>
                <Controller
                  name="career_goals"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                        rows={3}
                        placeholder="e.g., Become a Senior Developer, Lead a team, Start a tech company"
                        onChange={(e) => {
                          const goals = e.target.value.split(',').map(goal => goal.trim()).filter(Boolean);
                          field.onChange(goals);
                        }}
                      />
                      {errors.career_goals && (
                        <p className="mt-1 text-sm text-red-600">{errors.career_goals.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="mt-8"
            >
              {isLoading ? 'Creating Profile...' : 'Create Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
