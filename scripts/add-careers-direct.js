// Script to add career paths to the Supabase database using direct inserts
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL or key not found in environment variables.');
  console.error('Make sure your .env.local file contains valid NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY values.');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Career paths data
const careerPaths = [
  // Technology & IT Careers
  {
    title: 'Full Stack Developer',
    description: 'Design and develop both client and server-side applications, working with databases, APIs, and user interfaces.',
    required_skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs', 'TypeScript'],
    education_requirements: ['Bachelor\'s degree in Computer Science or related field', 'Coding bootcamp with strong portfolio'],
    salary_range: { min: 75000, max: 150000 },
    job_outlook: 'Excellent growth with 22% projected increase over the next decade'
  },
  {
    title: 'DevOps Engineer',
    description: 'Implement and manage continuous integration/continuous deployment pipelines and automate infrastructure.',
    required_skills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms', 'Scripting', 'Monitoring'],
    education_requirements: ['Bachelor\'s degree in Computer Science or related field', 'Relevant certifications'],
    salary_range: { min: 90000, max: 160000 },
    job_outlook: 'Strong demand across industries with 21% growth expected'
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect computer systems and networks from information disclosure, theft, and damage to hardware, software, or data.',
    required_skills: ['Network Security', 'Threat Analysis', 'Security Tools', 'Penetration Testing', 'Risk Assessment'],
    education_requirements: ['Bachelor\'s degree in Cybersecurity or related field', 'Security certifications like CISSP or CEH'],
    salary_range: { min: 85000, max: 150000 },
    job_outlook: 'Very high demand with 33% growth projected due to increasing cyber threats'
  },
  {
    title: 'Machine Learning Engineer',
    description: 'Design and implement machine learning models and systems that can learn and improve from experience.',
    required_skills: ['Python', 'TensorFlow', 'PyTorch', 'Statistics', 'Data Modeling', 'Mathematics'],
    education_requirements: ['Master\'s or PhD in Computer Science, Mathematics, or related field'],
    salary_range: { min: 100000, max: 180000 },
    job_outlook: 'Rapidly growing field with 40% projected increase in the next decade'
  },
  {
    title: 'Cloud Solutions Architect',
    description: 'Design and implement cloud infrastructure and solutions for organizations.',
    required_skills: ['AWS', 'Azure', 'GCP', 'Infrastructure as Code', 'Networking', 'Security'],
    education_requirements: ['Bachelor\'s degree in Computer Science or related field', 'Cloud certifications'],
    salary_range: { min: 110000, max: 190000 },
    job_outlook: 'Strong growth with cloud adoption increasing across all industries'
  },

  // Business & Finance Careers
  {
    title: 'Financial Analyst',
    description: 'Analyze financial data and prepare reports to guide business decisions and investment strategies.',
    required_skills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Accounting', 'Business Intelligence'],
    education_requirements: ['Bachelor\'s degree in Finance, Economics, or related field', 'MBA or CFA preferred'],
    salary_range: { min: 65000, max: 120000 },
    job_outlook: 'Steady growth with 6% increase expected over the next decade'
  },
  {
    title: 'Marketing Manager',
    description: 'Develop and implement marketing strategies to promote products, services, and brands.',
    required_skills: ['Digital Marketing', 'Content Strategy', 'Analytics', 'Social Media', 'Campaign Management'],
    education_requirements: ['Bachelor\'s degree in Marketing, Business, or related field'],
    salary_range: { min: 70000, max: 140000 },
    job_outlook: 'Moderate growth with 10% increase expected in coming years'
  },
  {
    title: 'Human Resources Manager',
    description: 'Oversee recruitment, employee relations, benefits, and organizational development.',
    required_skills: ['Recruitment', 'Employee Relations', 'Benefits Administration', 'Conflict Resolution', 'HR Software'],
    education_requirements: ['Bachelor\'s degree in Human Resources, Business, or related field'],
    salary_range: { min: 65000, max: 130000 },
    job_outlook: 'Steady growth with 7% increase projected'
  },
  {
    title: 'Management Consultant',
    description: 'Help organizations improve performance through analysis of existing problems and development of plans for improvement.',
    required_skills: ['Business Analysis', 'Problem Solving', 'Project Management', 'Communication', 'Industry Knowledge'],
    education_requirements: ['Bachelor\'s degree in Business, Economics, or related field', 'MBA often preferred'],
    salary_range: { min: 85000, max: 170000 },
    job_outlook: 'Strong growth with 14% increase expected over the next decade'
  },
  {
    title: 'Product Manager',
    description: 'Lead the development and launch of products, defining strategy, features, and roadmap.',
    required_skills: ['Product Strategy', 'User Experience', 'Market Research', 'Agile Methodologies', 'Data Analysis'],
    education_requirements: ['Bachelor\'s degree in Business, Engineering, or related field'],
    salary_range: { min: 80000, max: 160000 },
    job_outlook: 'Excellent growth with 10% increase projected'
  },

  // Healthcare Careers
  {
    title: 'Registered Nurse',
    description: 'Provide and coordinate patient care, educate patients about health conditions, and provide advice and emotional support.',
    required_skills: ['Patient Care', 'Medical Knowledge', 'Critical Thinking', 'Communication', 'Empathy'],
    education_requirements: ['Bachelor\'s of Science in Nursing (BSN)', 'Associate Degree in Nursing (ADN)'],
    salary_range: { min: 60000, max: 110000 },
    job_outlook: 'Very strong growth with 9% increase expected due to aging population'
  },
  {
    title: 'Physician Assistant',
    description: 'Practice medicine under the supervision of physicians and surgeons, examining, diagnosing and treating patients.',
    required_skills: ['Medical Knowledge', 'Diagnosis', 'Treatment Planning', 'Patient Care', 'Clinical Procedures'],
    education_requirements: ['Master\'s degree from an accredited PA program', 'State licensure'],
    salary_range: { min: 90000, max: 130000 },
    job_outlook: 'Excellent growth with 31% increase projected'
  },
  {
    title: 'Physical Therapist',
    description: 'Help injured or ill people improve movement and manage pain through exercises, stretching, and other techniques.',
    required_skills: ['Rehabilitation Techniques', 'Anatomy', 'Patient Assessment', 'Treatment Planning', 'Exercise Prescription'],
    education_requirements: ['Doctor of Physical Therapy (DPT) degree', 'State licensure'],
    salary_range: { min: 70000, max: 100000 },
    job_outlook: 'Strong growth with 18% increase expected'
  },
  {
    title: 'Healthcare Administrator',
    description: 'Plan, direct, and coordinate medical and health services in hospitals, clinics, or healthcare facilities.',
    required_skills: ['Healthcare Operations', 'Policy Development', 'Budgeting', 'Staff Management', 'Regulatory Compliance'],
    education_requirements: ['Bachelor\'s degree in Healthcare Administration or related field', 'Master\'s often preferred'],
    salary_range: { min: 70000, max: 120000 },
    job_outlook: 'Excellent growth with 32% increase projected'
  },
  {
    title: 'Pharmacist',
    description: 'Dispense prescription medications and provide expertise on safe use of prescriptions to patients and healthcare professionals.',
    required_skills: ['Pharmaceutical Knowledge', 'Patient Counseling', 'Medication Management', 'Attention to Detail', 'Chemistry'],
    education_requirements: ['Doctor of Pharmacy (PharmD) degree', 'State licensure'],
    salary_range: { min: 110000, max: 150000 },
    job_outlook: 'Stable demand with 2% growth expected'
  },

  // Creative & Design Careers
  {
    title: 'Graphic Designer',
    description: 'Create visual concepts to communicate ideas that inspire, inform, or captivate consumers.',
    required_skills: ['Adobe Creative Suite', 'Typography', 'Color Theory', 'Layout Design', 'Visual Communication'],
    education_requirements: ['Bachelor\'s degree in Graphic Design or related field', 'Strong portfolio'],
    salary_range: { min: 45000, max: 85000 },
    job_outlook: 'Moderate growth with 3% increase expected'
  },
  {
    title: 'Video Editor',
    description: 'Manipulate and arrange video footage, audio, graphics, and effects to create a finished video product.',
    required_skills: ['Video Editing Software', 'Storytelling', 'Color Correction', 'Audio Editing', 'Motion Graphics'],
    education_requirements: ['Bachelor\'s degree in Film, Media, or related field', 'Strong portfolio'],
    salary_range: { min: 50000, max: 90000 },
    job_outlook: 'Good growth with 18% increase projected due to video content demand'
  },
  {
    title: 'Content Creator',
    description: 'Develop and produce content for various platforms including social media, blogs, videos, and podcasts.',
    required_skills: ['Content Strategy', 'Writing', 'Social Media', 'Video Production', 'Audience Engagement'],
    education_requirements: ['Bachelor\'s degree in Communications, Marketing, or related field', 'Portfolio of work'],
    salary_range: { min: 40000, max: 100000 },
    job_outlook: 'Strong growth with 15% increase expected as digital content continues to expand'
  },
  {
    title: 'Interior Designer',
    description: 'Plan and design interior spaces in homes, offices, and other buildings to create functional and aesthetically pleasing environments.',
    required_skills: ['Space Planning', 'Color Theory', 'CAD Software', 'Materials Knowledge', 'Project Management'],
    education_requirements: ['Bachelor\'s degree in Interior Design or related field'],
    salary_range: { min: 50000, max: 90000 },
    job_outlook: 'Moderate growth with 5% increase projected'
  },
  {
    title: 'Game Developer',
    description: 'Design and create video games for computers, consoles, and mobile devices.',
    required_skills: ['Programming', 'Game Engines', '3D Modeling', 'Animation', 'Game Design'],
    education_requirements: ['Bachelor\'s degree in Computer Science, Game Design, or related field'],
    salary_range: { min: 65000, max: 130000 },
    job_outlook: 'Strong growth with 10% increase expected as gaming industry expands'
  },

  // Education & Teaching Careers
  {
    title: 'Elementary School Teacher',
    description: 'Educate young students in basic subjects like math, reading, science, and social studies.',
    required_skills: ['Curriculum Development', 'Classroom Management', 'Assessment', 'Communication', 'Patience'],
    education_requirements: ['Bachelor\'s degree in Education or related field', 'Teaching certification/license'],
    salary_range: { min: 45000, max: 75000 },
    job_outlook: 'Stable demand with 4% growth expected'
  },
  {
    title: 'Special Education Teacher',
    description: 'Work with students who have a wide range of learning, mental, emotional, and physical disabilities.',
    required_skills: ['Individualized Education Plans', 'Behavior Management', 'Adaptive Teaching', 'Assessment', 'Patience'],
    education_requirements: ['Bachelor\'s degree in Special Education', 'Teaching certification/license'],
    salary_range: { min: 50000, max: 85000 },
    job_outlook: 'Good growth with 8% increase projected'
  },
  {
    title: 'College Professor',
    description: 'Teach courses in their field of expertise at colleges and universities and conduct research.',
    required_skills: ['Subject Expertise', 'Research', 'Curriculum Development', 'Public Speaking', 'Writing'],
    education_requirements: ['PhD in specific field', 'Master\'s degree for some community college positions'],
    salary_range: { min: 60000, max: 150000 },
    job_outlook: 'Moderate growth with 9% increase expected'
  },
  {
    title: 'Educational Administrator',
    description: 'Plan, direct, and coordinate activities of schools, colleges, or universities.',
    required_skills: ['Leadership', 'Policy Development', 'Budgeting', 'Staff Management', 'Educational Programs'],
    education_requirements: ['Master\'s degree in Education Administration or related field'],
    salary_range: { min: 70000, max: 130000 },
    job_outlook: 'Steady growth with 4% increase projected'
  },
  {
    title: 'Instructional Designer',
    description: 'Create educational materials and content for courses, training programs, and educational technology.',
    required_skills: ['Curriculum Development', 'E-Learning', 'Educational Technology', 'Assessment Design', 'Project Management'],
    education_requirements: ['Bachelor\'s or Master\'s degree in Instructional Design, Education, or related field'],
    salary_range: { min: 60000, max: 95000 },
    job_outlook: 'Strong growth with 11% increase expected as online learning expands'
  },

  // Science & Research Careers
  {
    title: 'Biomedical Scientist',
    description: 'Conduct research to improve human health, studying diseases, treatments, and medical technologies.',
    required_skills: ['Laboratory Techniques', 'Research Methods', 'Data Analysis', 'Scientific Writing', 'Critical Thinking'],
    education_requirements: ['PhD in Biomedical Science or related field', 'Master\'s degree for some positions'],
    salary_range: { min: 70000, max: 120000 },
    job_outlook: 'Strong growth with 6% increase projected'
  },
  {
    title: 'Environmental Scientist',
    description: 'Study environmental problems and develop solutions to protect the environment and human health.',
    required_skills: ['Environmental Sampling', 'Data Analysis', 'GIS', 'Regulatory Knowledge', 'Field Research'],
    education_requirements: ['Bachelor\'s degree in Environmental Science or related field', 'Master\'s for advancement'],
    salary_range: { min: 55000, max: 90000 },
    job_outlook: 'Good growth with 8% increase expected due to environmental concerns'
  },
  {
    title: 'Chemist',
    description: 'Study substances at the atomic and molecular levels and analyze how they interact with one another.',
    required_skills: ['Laboratory Techniques', 'Chemical Analysis', 'Research Methods', 'Data Interpretation', 'Safety Protocols'],
    education_requirements: ['Bachelor\'s degree in Chemistry or related field', 'PhD for research positions'],
    salary_range: { min: 60000, max: 100000 },
    job_outlook: 'Moderate growth with 5% increase projected'
  },
  {
    title: 'Astrophysicist',
    description: 'Study celestial objects, space, and the physical universe as a whole.',
    required_skills: ['Mathematics', 'Physics', 'Computer Modeling', 'Data Analysis', 'Research Methods'],
    education_requirements: ['PhD in Astrophysics, Physics, or related field'],
    salary_range: { min: 80000, max: 140000 },
    job_outlook: 'Limited but stable growth with specialized opportunities'
  },
  {
    title: 'Forensic Scientist',
    description: 'Apply scientific principles and techniques to analyze evidence for criminal investigations.',
    required_skills: ['Laboratory Techniques', 'Evidence Collection', 'Analysis Methods', 'Documentation', 'Attention to Detail'],
    education_requirements: ['Bachelor\'s degree in Forensic Science or related field'],
    salary_range: { min: 55000, max: 85000 },
    job_outlook: 'Moderate growth with 14% increase expected'
  },

  // Skilled Trades & Technical Careers
  {
    title: 'Electrician',
    description: 'Install, maintain, and repair electrical power, communications, lighting, and control systems.',
    required_skills: ['Electrical Systems', 'Troubleshooting', 'Blueprint Reading', 'Safety Protocols', 'Hand Tools'],
    education_requirements: ['High school diploma', 'Apprenticeship program', 'State licensure'],
    salary_range: { min: 45000, max: 90000 },
    job_outlook: 'Strong growth with 8% increase projected'
  },
  {
    title: 'Plumber',
    description: 'Install and repair pipes and fixtures that carry water, gas, or other fluids in homes and businesses.',
    required_skills: ['Plumbing Systems', 'Troubleshooting', 'Blueprint Reading', 'Hand Tools', 'Customer Service'],
    education_requirements: ['High school diploma', 'Apprenticeship program', 'State licensure'],
    salary_range: { min: 45000, max: 85000 },
    job_outlook: 'Good growth with 5% increase expected'
  },
  {
    title: 'HVAC Technician',
    description: 'Install, maintain, and repair heating, ventilation, air conditioning, and refrigeration systems.',
    required_skills: ['HVAC Systems', 'Troubleshooting', 'Electrical Knowledge', 'Mechanical Skills', 'Customer Service'],
    education_requirements: ['Post-secondary HVAC program', 'Apprenticeship', 'Certification'],
    salary_range: { min: 45000, max: 80000 },
    job_outlook: 'Strong growth with 13% increase projected'
  },
  {
    title: 'Welder',
    description: 'Join metal parts together using high heat to melt and fuse them for construction, manufacturing, and repair.',
    required_skills: ['Welding Techniques', 'Blueprint Reading', 'Safety Protocols', 'Hand Tools', 'Precision'],
    education_requirements: ['High school diploma', 'Technical training or apprenticeship', 'Certification'],
    salary_range: { min: 40000, max: 75000 },
    job_outlook: 'Moderate growth with 3% increase expected'
  },
  {
    title: 'Aircraft Mechanic',
    description: 'Repair and perform scheduled maintenance on aircraft engines and other mechanical systems.',
    required_skills: ['Aircraft Systems', 'Troubleshooting', 'Mechanical Skills', 'Documentation', 'Attention to Detail'],
    education_requirements: ['FAA-approved aviation maintenance technician school', 'Certification'],
    salary_range: { min: 55000, max: 100000 },
    job_outlook: 'Moderate growth with 5% increase projected'
  }
];

// Educational resources data
const educationalResources = [
  {
    title: 'Full Stack Web Development Bootcamp',
    description: 'Comprehensive bootcamp covering front-end and back-end development with modern JavaScript frameworks.',
    url: 'https://www.codecademy.com/learn/paths/full-stack-engineer-career-path',
    resource_type: 'Online Course',
    career_path_title: 'Full Stack Developer'
  },
  {
    title: 'AWS Certified Solutions Architect',
    description: 'Certification program for designing distributed systems on AWS.',
    url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    resource_type: 'Certification',
    career_path_title: 'Cloud Solutions Architect'
  },
  {
    title: 'Certified Ethical Hacker (CEH)',
    description: 'Learn to think like a hacker and protect systems from cyber threats.',
    url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/',
    resource_type: 'Certification',
    career_path_title: 'Cybersecurity Analyst'
  },
  {
    title: 'Deep Learning Specialization',
    description: 'Master deep learning techniques and build neural networks.',
    url: 'https://www.coursera.org/specializations/deep-learning',
    resource_type: 'Online Course',
    career_path_title: 'Machine Learning Engineer'
  },
  {
    title: 'Financial Analyst Certification (CFA)',
    description: 'Globally recognized professional designation for financial analysts.',
    url: 'https://www.cfainstitute.org/en/programs/cfa',
    resource_type: 'Certification',
    career_path_title: 'Financial Analyst'
  }
];

// Job opportunities data
const jobOpportunities = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    location: 'Remote',
    description: 'Join our team to build cutting-edge web applications using modern JavaScript frameworks.',
    requirements: ['5+ years experience with JavaScript', 'Experience with React and Node.js', 'Database design experience', 'CI/CD knowledge'],
    salary_range: { min: 110000, max: 140000 },
    application_url: 'https://example.com/jobs/full-stack-developer',
    career_path_title: 'Full Stack Developer'
  },
  {
    title: 'Cloud Solutions Architect',
    company: 'Enterprise Cloud Services',
    location: 'New York, NY',
    description: 'Design and implement cloud infrastructure solutions for Fortune 500 clients.',
    requirements: ['AWS Certified Solutions Architect', '3+ years cloud architecture experience', 'Strong communication skills', 'Experience with large-scale migrations'],
    salary_range: { min: 130000, max: 160000 },
    application_url: 'https://example.com/jobs/cloud-architect',
    career_path_title: 'Cloud Solutions Architect'
  },
  {
    title: 'Cybersecurity Analyst',
    company: 'SecureDefense Corp',
    location: 'Chicago, IL',
    description: 'Monitor and protect our systems from cyber threats and implement security measures.',
    requirements: ['Security certifications (CISSP, CEH, etc.)', 'Experience with security tools', 'Incident response experience', 'Knowledge of compliance frameworks'],
    salary_range: { min: 95000, max: 120000 },
    application_url: 'https://example.com/jobs/cybersecurity-analyst',
    career_path_title: 'Cybersecurity Analyst'
  },
  {
    title: 'Machine Learning Engineer',
    company: 'AI Innovations Lab',
    location: 'San Francisco, CA',
    description: 'Develop and deploy machine learning models to solve complex business problems.',
    requirements: ['Strong Python skills', 'Experience with TensorFlow or PyTorch', 'Mathematics and statistics background', 'Production ML deployment experience'],
    salary_range: { min: 140000, max: 180000 },
    application_url: 'https://example.com/jobs/ml-engineer',
    career_path_title: 'Machine Learning Engineer'
  },
  {
    title: 'Senior Financial Analyst',
    company: 'Global Investments Corp',
    location: 'Boston, MA',
    description: 'Analyze financial data and prepare reports to guide investment decisions.',
    requirements: ['CFA certification', '5+ years financial analysis experience', 'Advanced Excel skills', 'Experience with financial modeling'],
    salary_range: { min: 90000, max: 120000 },
    application_url: 'https://example.com/jobs/financial-analyst',
    career_path_title: 'Financial Analyst'
  }
];

// Main function to add data to Supabase
async function addDataToSupabase() {
  console.log('Starting to add career paths to the database...');
  
  try {
    // First, check if we can connect to Supabase
    const { data: existingCareers, error: connectionError } = await supabase
      .from('career_paths')
      .select('count()', { count: 'exact' });
    
    if (connectionError) {
      console.error('Error connecting to Supabase:', connectionError);
      process.exit(1);
    }
    
    console.log(`Connected to Supabase. Current career paths count: ${existingCareers[0].count}`);
    
    // Add career paths
    console.log(`Adding ${careerPaths.length} career paths...`);
    const careerPathsMap = new Map();
    
    for (const careerPath of careerPaths) {
      const { data, error } = await supabase
        .from('career_paths')
        .insert(careerPath)
        .select();
      
      if (error) {
        console.error(`Error adding career path "${careerPath.title}":`, error);
      } else if (data && data.length > 0) {
        console.log(`Added career path: ${careerPath.title}`);
        careerPathsMap.set(careerPath.title, data[0].id);
      }
    }
    
    // Add educational resources
    console.log(`\nAdding ${educationalResources.length} educational resources...`);
    
    for (const resource of educationalResources) {
      const careerPathId = careerPathsMap.get(resource.career_path_title);
      
      if (!careerPathId) {
        console.warn(`Could not find career path ID for "${resource.career_path_title}". Skipping resource "${resource.title}".`);
        continue;
      }
      
      const { title, description, url, resource_type } = resource;
      
      const { error } = await supabase
        .from('educational_resources')
        .insert({
          title,
          description,
          url,
          resource_type,
          career_path_id: careerPathId
        });
      
      if (error) {
        console.error(`Error adding educational resource "${resource.title}":`, error);
      } else {
        console.log(`Added educational resource: ${resource.title}`);
      }
    }
    
    // Add job opportunities
    console.log(`\nAdding ${jobOpportunities.length} job opportunities...`);
    
    for (const job of jobOpportunities) {
      const careerPathId = careerPathsMap.get(job.career_path_title);
      
      if (!careerPathId) {
        console.warn(`Could not find career path ID for "${job.career_path_title}". Skipping job "${job.title}".`);
        continue;
      }
      
      const { title, company, location, description, requirements, salary_range, application_url } = job;
      
      const { error } = await supabase
        .from('job_opportunities')
        .insert({
          title,
          company,
          location,
          description,
          requirements,
          salary_range,
          application_url,
          career_path_id: careerPathId
        });
      
      if (error) {
        console.error(`Error adding job opportunity "${job.title}":`, error);
      } else {
        console.log(`Added job opportunity: ${job.title}`);
      }
    }
    
    // Verify the data was added
    const { data: newData, error: newError } = await supabase
      .from('career_paths')
      .select('count()', { count: 'exact' });
    
    if (newError) {
      console.error('Error checking updated career paths count:', newError);
    } else {
      console.log(`\nUpdated career paths count: ${newData[0].count}`);
      console.log(`Added ${newData[0].count - existingCareers[0].count} new career paths.`);
    }
    
    console.log('\nData import completed!');
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Run the main function
addDataToSupabase().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
