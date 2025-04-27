import { supabase } from './supabase';
import { Database } from '../types/database.types';

// User Profile
export async function createUserProfile(userId: string, profileData: Partial<Database['public']['Tables']['user_profiles']['Insert']>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      user_id: userId,
      ...profileData,
    })
    .select()
    .single();

  return { data, error };
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
}

export async function updateUserProfile(userId: string, profileData: Partial<Database['public']['Tables']['user_profiles']['Update']>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(profileData)
    .eq('user_id', userId)
    .select()
    .single();

  return { data, error };
}

// Career Paths
export async function getCareerPaths() {
  const { data, error } = await supabase
    .from('career_paths')
    .select('*');

  return { data, error };
}

export async function getCareerPathById(id: string) {
  const { data, error } = await supabase
    .from('career_paths')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

// Educational Resources
export async function getEducationalResources(careerPathId?: string) {
  let query = supabase.from('educational_resources').select('*');

  if (careerPathId) {
    query = query.eq('career_path_id', careerPathId);
  }

  const { data, error } = await query;
  return { data, error };
}

// Job Opportunities
export async function getJobOpportunities(careerPathId?: string) {
  let query = supabase.from('job_opportunities').select('*');

  if (careerPathId) {
    query = query.eq('career_path_id', careerPathId);
  }

  const { data, error } = await query;
  return { data, error };
}

// Bookmarks
export async function bookmarkCareerPath(userId: string, careerPathId: string) {
  const { data, error } = await supabase
    .from('user_bookmarks')
    .insert({
      user_id: userId,
      career_path_id: careerPathId,
    })
    .select()
    .single();

  return { data, error };
}

export async function removeBookmark(userId: string, careerPathId: string) {
  const { error } = await supabase
    .from('user_bookmarks')
    .delete()
    .match({ user_id: userId, career_path_id: careerPathId });

  return { error };
}

export async function getUserBookmarks(userId: string) {
  const { data, error } = await supabase
    .from('user_bookmarks')
    .select('*, career_paths(*)')
    .eq('user_id', userId);

  return { data, error };
}

// Assessments
export async function saveAssessmentResults(userId: string, assessmentType: string, results: any) {
  const { data, error } = await supabase
    .from('assessment_results')
    .insert({
      user_id: userId,
      assessment_type: assessmentType,
      results,
    })
    .select()
    .single();

  return { data, error };
}

export async function getAssessmentResults(userId: string, assessmentType?: string) {
  let query = supabase
    .from('assessment_results')
    .select('*')
    .eq('user_id', userId);

  if (assessmentType) {
    query = query.eq('assessment_type', assessmentType);
  }

  const { data, error } = await query;
  return { data, error };
}

// Career Recommendations
export async function getCareerRecommendations(userId: string) {
  // Get user profile
  const { data: profile, error: profileError } = await getUserProfile(userId);

  if (profileError) {
    return { data: null, error: profileError };
  }

  // Get assessment results
  const { data: assessmentResults, error: assessmentError } = await getAssessmentResults(userId);

  if (assessmentError) {
    return { data: null, error: assessmentError };
  }

  // Get all career paths
  const { data: careerPaths, error: careerPathsError } = await supabase
    .from('career_paths')
    .select('*');

  if (careerPathsError || !careerPaths) {
    return { data: null, error: careerPathsError || new Error('Career paths not found') };
  }

  // Extract user skills from profile
  const userSkills = new Set(profile?.skills || []);

  // Extract user interests from profile
  const userInterests = new Set(profile?.interests || []);

  // Extract assessment data
  const personalityResults = assessmentResults
    ?.filter(r => r.assessment_type === 'personality')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  const skillsResults = assessmentResults
    ?.filter(r => r.assessment_type === 'skills')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  const interestsResults = assessmentResults
    ?.filter(r => r.assessment_type === 'interests')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  // Create maps of assessment categories to scores
  const personalityScores: Record<string, number> = {};
  const skillsScores: Record<string, number> = {};
  const interestsScores: Record<string, number> = {};

  // Process personality assessment results
  if (personalityResults?.results?.categories) {
    (personalityResults.results.categories as any[]).forEach(category => {
      personalityScores[category.category] = category.percentage || 0;
    });
  }

  // Process skills assessment results
  if (skillsResults?.results?.categories) {
    (skillsResults.results.categories as any[]).forEach(category => {
      skillsScores[category.category] = category.percentage || 0;
    });
  }

  // Process interests assessment results
  if (interestsResults?.results?.categories) {
    (interestsResults.results.categories as any[]).forEach(category => {
      interestsScores[category.category] = category.percentage || 0;
    });
  }

  // Define career path to personality/skills/interests mappings
  // This would ideally come from a database, but we'll hardcode for now
  const careerMappings: Record<string, {
    personality: string[],
    skills: string[],
    interests: string[]
  }> = {
    'Software Engineer': {
      personality: ['analytical', 'conventional'],
      skills: ['technical', 'problem_solving', 'data_analysis'],
      interests: ['science_tech', 'analysis']
    },
    'Data Scientist': {
      personality: ['analytical', 'conventional'],
      skills: ['data_analysis', 'technical', 'problem_solving'],
      interests: ['science_tech', 'analysis']
    },
    'UX/UI Designer': {
      personality: ['artistic', 'social'],
      skills: ['creativity', 'communication'],
      interests: ['arts', 'science_tech']
    },
    'Product Manager': {
      personality: ['enterprising', 'social'],
      skills: ['communication', 'organization', 'project_management'],
      interests: ['business', 'analysis']
    },
    'Marketing Specialist': {
      personality: ['enterprising', 'social', 'artistic'],
      skills: ['communication', 'persuasion', 'creativity'],
      interests: ['business', 'arts']
    },
    'Financial Analyst': {
      personality: ['conventional', 'analytical'],
      skills: ['data_analysis', 'organization'],
      interests: ['business', 'analysis']
    },
    'Healthcare Professional': {
      personality: ['social', 'practical'],
      skills: ['communication', 'adaptability'],
      interests: ['healthcare', 'social_service']
    },
    'Teacher/Educator': {
      personality: ['social', 'artistic'],
      skills: ['communication', 'organization'],
      interests: ['education', 'social_service']
    },
    'Environmental Scientist': {
      personality: ['analytical', 'practical'],
      skills: ['data_analysis', 'technical'],
      interests: ['environment', 'science_tech']
    },
    'Legal Professional': {
      personality: ['conventional', 'enterprising'],
      skills: ['communication', 'persuasion'],
      interests: ['law_policy', 'analysis']
    }
  };

  // Calculate match scores for each career path
  const recommendations = careerPaths.map(career => {
    // Base score starts at 0
    let matchScore = 0;
    let totalFactors = 0;

    // 1. Match based on skills from profile (25% weight)
    const skillsWeight = 0.25;
    if (userSkills.size > 0 && career.required_skills && career.required_skills.length > 0) {
      const matchingSkills = career.required_skills.filter(skill => userSkills.has(skill)).length;
      const skillsScore = (matchingSkills / career.required_skills.length) * 100;
      matchScore += skillsScore * skillsWeight;
      totalFactors += skillsWeight;
    }

    // 2. Match based on interests from profile (15% weight)
    const interestsWeight = 0.15;
    if (userInterests.size > 0) {
      // Find mapping for this career
      const mapping = careerMappings[career.title];
      if (mapping) {
        const matchingInterests = mapping.interests.filter(interest => userInterests.has(interest)).length;
        const interestsScore = matchingInterests > 0 ? (matchingInterests / mapping.interests.length) * 100 : 0;
        matchScore += interestsScore * interestsWeight;
        totalFactors += interestsWeight;
      }
    }

    // 3. Match based on personality assessment (20% weight)
    const personalityWeight = 0.2;
    if (Object.keys(personalityScores).length > 0) {
      const mapping = careerMappings[career.title];
      if (mapping) {
        let personalityScore = 0;
        mapping.personality.forEach(trait => {
          personalityScore += personalityScores[trait] || 0;
        });
        personalityScore = mapping.personality.length > 0 ? personalityScore / mapping.personality.length : 0;
        matchScore += personalityScore * personalityWeight;
        totalFactors += personalityWeight;
      }
    }

    // 4. Match based on skills assessment (25% weight)
    const skillsAssessmentWeight = 0.25;
    if (Object.keys(skillsScores).length > 0) {
      const mapping = careerMappings[career.title];
      if (mapping) {
        let skillsAssessmentScore = 0;
        mapping.skills.forEach(skill => {
          skillsAssessmentScore += skillsScores[skill] || 0;
        });
        skillsAssessmentScore = mapping.skills.length > 0 ? skillsAssessmentScore / mapping.skills.length : 0;
        matchScore += skillsAssessmentScore * skillsAssessmentWeight;
        totalFactors += skillsAssessmentWeight;
      }
    }

    // 5. Match based on interests assessment (15% weight)
    const interestsAssessmentWeight = 0.15;
    if (Object.keys(interestsScores).length > 0) {
      const mapping = careerMappings[career.title];
      if (mapping) {
        let interestsAssessmentScore = 0;
        mapping.interests.forEach(interest => {
          interestsAssessmentScore += interestsScores[interest] || 0;
        });
        interestsAssessmentScore = mapping.interests.length > 0 ? interestsAssessmentScore / mapping.interests.length : 0;
        matchScore += interestsAssessmentScore * interestsAssessmentWeight;
        totalFactors += interestsAssessmentWeight;
      }
    }

    // Normalize score if we have any factors
    if (totalFactors > 0) {
      matchScore = matchScore / totalFactors;
    } else {
      // Fallback to a basic match if no assessment data is available
      matchScore = 50; // Default 50% match
    }

    return {
      ...career,
      matchScore: Math.round(matchScore)
    };
  });

  // Sort by match score (highest first)
  const sortedRecommendations = recommendations.sort((a, b) => b.matchScore - a.matchScore);

  return { data: sortedRecommendations, error: null };
}
