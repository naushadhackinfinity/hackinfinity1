-- SQL script to add career paths to the database
-- Run this directly in the Supabase SQL Editor

-- Technology & IT Careers
INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES 
('Full Stack Developer', 'Design and develop both client and server-side applications, working with databases, APIs, and user interfaces.', 
 ARRAY['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs', 'TypeScript'], 
 ARRAY['Bachelor''s degree in Computer Science or related field', 'Coding bootcamp with strong portfolio'], 
 '{"min": 75000, "max": 150000}', 
 'Excellent growth with 22% projected increase over the next decade');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('DevOps Engineer', 'Implement and manage continuous integration/continuous deployment pipelines and automate infrastructure.', 
 ARRAY['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms', 'Scripting', 'Monitoring'], 
 ARRAY['Bachelor''s degree in Computer Science or related field', 'Relevant certifications'], 
 '{"min": 90000, "max": 160000}', 
 'Strong demand across industries with 21% growth expected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Cybersecurity Analyst', 'Protect computer systems and networks from information disclosure, theft, and damage to hardware, software, or data.', 
 ARRAY['Network Security', 'Threat Analysis', 'Security Tools', 'Penetration Testing', 'Risk Assessment'], 
 ARRAY['Bachelor''s degree in Cybersecurity or related field', 'Security certifications like CISSP or CEH'], 
 '{"min": 85000, "max": 150000}', 
 'Very high demand with 33% growth projected due to increasing cyber threats');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Machine Learning Engineer', 'Design and implement machine learning models and systems that can learn and improve from experience.', 
 ARRAY['Python', 'TensorFlow', 'PyTorch', 'Statistics', 'Data Modeling', 'Mathematics'], 
 ARRAY['Master''s or PhD in Computer Science, Mathematics, or related field'], 
 '{"min": 100000, "max": 180000}', 
 'Rapidly growing field with 40% projected increase in the next decade');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Cloud Solutions Architect', 'Design and implement cloud infrastructure and solutions for organizations.', 
 ARRAY['AWS', 'Azure', 'GCP', 'Infrastructure as Code', 'Networking', 'Security'], 
 ARRAY['Bachelor''s degree in Computer Science or related field', 'Cloud certifications'], 
 '{"min": 110000, "max": 190000}', 
 'Strong growth with cloud adoption increasing across all industries');

-- Business & Finance Careers
INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES 
('Financial Analyst', 'Analyze financial data and prepare reports to guide business decisions and investment strategies.', 
 ARRAY['Financial Modeling', 'Excel', 'Data Analysis', 'Accounting', 'Business Intelligence'], 
 ARRAY['Bachelor''s degree in Finance, Economics, or related field', 'MBA or CFA preferred'], 
 '{"min": 65000, "max": 120000}', 
 'Steady growth with 6% increase expected over the next decade');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Marketing Manager', 'Develop and implement marketing strategies to promote products, services, and brands.', 
 ARRAY['Digital Marketing', 'Content Strategy', 'Analytics', 'Social Media', 'Campaign Management'], 
 ARRAY['Bachelor''s degree in Marketing, Business, or related field'], 
 '{"min": 70000, "max": 140000}', 
 'Moderate growth with 10% increase expected in coming years');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Human Resources Manager', 'Oversee recruitment, employee relations, benefits, and organizational development.', 
 ARRAY['Recruitment', 'Employee Relations', 'Benefits Administration', 'Conflict Resolution', 'HR Software'], 
 ARRAY['Bachelor''s degree in Human Resources, Business, or related field'], 
 '{"min": 65000, "max": 130000}', 
 'Steady growth with 7% increase projected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Management Consultant', 'Help organizations improve performance through analysis of existing problems and development of plans for improvement.', 
 ARRAY['Business Analysis', 'Problem Solving', 'Project Management', 'Communication', 'Industry Knowledge'], 
 ARRAY['Bachelor''s degree in Business, Economics, or related field', 'MBA often preferred'], 
 '{"min": 85000, "max": 170000}', 
 'Strong growth with 14% increase expected over the next decade');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Product Manager', 'Lead the development and launch of products, defining strategy, features, and roadmap.', 
 ARRAY['Product Strategy', 'User Experience', 'Market Research', 'Agile Methodologies', 'Data Analysis'], 
 ARRAY['Bachelor''s degree in Business, Engineering, or related field'], 
 '{"min": 80000, "max": 160000}', 
 'Excellent growth with 10% increase projected');

-- Healthcare Careers
INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES 
('Registered Nurse', 'Provide and coordinate patient care, educate patients about health conditions, and provide advice and emotional support.', 
 ARRAY['Patient Care', 'Medical Knowledge', 'Critical Thinking', 'Communication', 'Empathy'], 
 ARRAY['Bachelor''s of Science in Nursing (BSN)', 'Associate Degree in Nursing (ADN)'], 
 '{"min": 60000, "max": 110000}', 
 'Very strong growth with 9% increase expected due to aging population');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Physician Assistant', 'Practice medicine under the supervision of physicians and surgeons, examining, diagnosing and treating patients.', 
 ARRAY['Medical Knowledge', 'Diagnosis', 'Treatment Planning', 'Patient Care', 'Clinical Procedures'], 
 ARRAY['Master''s degree from an accredited PA program', 'State licensure'], 
 '{"min": 90000, "max": 130000}', 
 'Excellent growth with 31% increase projected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Physical Therapist', 'Help injured or ill people improve movement and manage pain through exercises, stretching, and other techniques.', 
 ARRAY['Rehabilitation Techniques', 'Anatomy', 'Patient Assessment', 'Treatment Planning', 'Exercise Prescription'], 
 ARRAY['Doctor of Physical Therapy (DPT) degree', 'State licensure'], 
 '{"min": 70000, "max": 100000}', 
 'Strong growth with 18% increase expected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Healthcare Administrator', 'Plan, direct, and coordinate medical and health services in hospitals, clinics, or healthcare facilities.', 
 ARRAY['Healthcare Operations', 'Policy Development', 'Budgeting', 'Staff Management', 'Regulatory Compliance'], 
 ARRAY['Bachelor''s degree in Healthcare Administration or related field', 'Master''s often preferred'], 
 '{"min": 70000, "max": 120000}', 
 'Excellent growth with 32% increase projected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Pharmacist', 'Dispense prescription medications and provide expertise on safe use of prescriptions to patients and healthcare professionals.', 
 ARRAY['Pharmaceutical Knowledge', 'Patient Counseling', 'Medication Management', 'Attention to Detail', 'Chemistry'], 
 ARRAY['Doctor of Pharmacy (PharmD) degree', 'State licensure'], 
 '{"min": 110000, "max": 150000}', 
 'Stable demand with 2% growth expected');

-- Creative & Design Careers
INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES 
('Graphic Designer', 'Create visual concepts to communicate ideas that inspire, inform, or captivate consumers.', 
 ARRAY['Adobe Creative Suite', 'Typography', 'Color Theory', 'Layout Design', 'Visual Communication'], 
 ARRAY['Bachelor''s degree in Graphic Design or related field', 'Strong portfolio'], 
 '{"min": 45000, "max": 85000}', 
 'Moderate growth with 3% increase expected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Video Editor', 'Manipulate and arrange video footage, audio, graphics, and effects to create a finished video product.', 
 ARRAY['Video Editing Software', 'Storytelling', 'Color Correction', 'Audio Editing', 'Motion Graphics'], 
 ARRAY['Bachelor''s degree in Film, Media, or related field', 'Strong portfolio'], 
 '{"min": 50000, "max": 90000}', 
 'Good growth with 18% increase projected due to video content demand');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Content Creator', 'Develop and produce content for various platforms including social media, blogs, videos, and podcasts.', 
 ARRAY['Content Strategy', 'Writing', 'Social Media', 'Video Production', 'Audience Engagement'], 
 ARRAY['Bachelor''s degree in Communications, Marketing, or related field', 'Portfolio of work'], 
 '{"min": 40000, "max": 100000}', 
 'Strong growth with 15% increase expected as digital content continues to expand');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Interior Designer', 'Plan and design interior spaces in homes, offices, and other buildings to create functional and aesthetically pleasing environments.', 
 ARRAY['Space Planning', 'Color Theory', 'CAD Software', 'Materials Knowledge', 'Project Management'], 
 ARRAY['Bachelor''s degree in Interior Design or related field'], 
 '{"min": 50000, "max": 90000}', 
 'Moderate growth with 5% increase projected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Game Developer', 'Design and create video games for computers, consoles, and mobile devices.', 
 ARRAY['Programming', 'Game Engines', '3D Modeling', 'Animation', 'Game Design'], 
 ARRAY['Bachelor''s degree in Computer Science, Game Design, or related field'], 
 '{"min": 65000, "max": 130000}', 
 'Strong growth with 10% increase expected as gaming industry expands');

-- Education & Teaching Careers
INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES 
('Elementary School Teacher', 'Educate young students in basic subjects like math, reading, science, and social studies.', 
 ARRAY['Curriculum Development', 'Classroom Management', 'Assessment', 'Communication', 'Patience'], 
 ARRAY['Bachelor''s degree in Education or related field', 'Teaching certification/license'], 
 '{"min": 45000, "max": 75000}', 
 'Stable demand with 4% growth expected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Special Education Teacher', 'Work with students who have a wide range of learning, mental, emotional, and physical disabilities.', 
 ARRAY['Individualized Education Plans', 'Behavior Management', 'Adaptive Teaching', 'Assessment', 'Patience'], 
 ARRAY['Bachelor''s degree in Special Education', 'Teaching certification/license'], 
 '{"min": 50000, "max": 85000}', 
 'Good growth with 8% increase projected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('College Professor', 'Teach courses in their field of expertise at colleges and universities and conduct research.', 
 ARRAY['Subject Expertise', 'Research', 'Curriculum Development', 'Public Speaking', 'Writing'], 
 ARRAY['PhD in specific field', 'Master''s degree for some community college positions'], 
 '{"min": 60000, "max": 150000}', 
 'Moderate growth with 9% increase expected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Educational Administrator', 'Plan, direct, and coordinate activities of schools, colleges, or universities.', 
 ARRAY['Leadership', 'Policy Development', 'Budgeting', 'Staff Management', 'Educational Programs'], 
 ARRAY['Master''s degree in Education Administration or related field'], 
 '{"min": 70000, "max": 130000}', 
 'Steady growth with 4% increase projected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Instructional Designer', 'Create educational materials and content for courses, training programs, and educational technology.', 
 ARRAY['Curriculum Development', 'E-Learning', 'Educational Technology', 'Assessment Design', 'Project Management'], 
 ARRAY['Bachelor''s or Master''s degree in Instructional Design, Education, or related field'], 
 '{"min": 60000, "max": 95000}', 
 'Strong growth with 11% increase expected as online learning expands');

-- Science & Research Careers
INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES 
('Biomedical Scientist', 'Conduct research to improve human health, studying diseases, treatments, and medical technologies.', 
 ARRAY['Laboratory Techniques', 'Research Methods', 'Data Analysis', 'Scientific Writing', 'Critical Thinking'], 
 ARRAY['PhD in Biomedical Science or related field', 'Master''s degree for some positions'], 
 '{"min": 70000, "max": 120000}', 
 'Strong growth with 6% increase projected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Environmental Scientist', 'Study environmental problems and develop solutions to protect the environment and human health.', 
 ARRAY['Environmental Sampling', 'Data Analysis', 'GIS', 'Regulatory Knowledge', 'Field Research'], 
 ARRAY['Bachelor''s degree in Environmental Science or related field', 'Master''s for advancement'], 
 '{"min": 55000, "max": 90000}', 
 'Good growth with 8% increase expected due to environmental concerns');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Chemist', 'Study substances at the atomic and molecular levels and analyze how they interact with one another.', 
 ARRAY['Laboratory Techniques', 'Chemical Analysis', 'Research Methods', 'Data Interpretation', 'Safety Protocols'], 
 ARRAY['Bachelor''s degree in Chemistry or related field', 'PhD for research positions'], 
 '{"min": 60000, "max": 100000}', 
 'Moderate growth with 5% increase projected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Astrophysicist', 'Study celestial objects, space, and the physical universe as a whole.', 
 ARRAY['Mathematics', 'Physics', 'Computer Modeling', 'Data Analysis', 'Research Methods'], 
 ARRAY['PhD in Astrophysics, Physics, or related field'], 
 '{"min": 80000, "max": 140000}', 
 'Limited but stable growth with specialized opportunities');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Forensic Scientist', 'Apply scientific principles and techniques to analyze evidence for criminal investigations.', 
 ARRAY['Laboratory Techniques', 'Evidence Collection', 'Analysis Methods', 'Documentation', 'Attention to Detail'], 
 ARRAY['Bachelor''s degree in Forensic Science or related field'], 
 '{"min": 55000, "max": 85000}', 
 'Moderate growth with 14% increase expected');

-- Skilled Trades & Technical Careers
INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES 
('Electrician', 'Install, maintain, and repair electrical power, communications, lighting, and control systems.', 
 ARRAY['Electrical Systems', 'Troubleshooting', 'Blueprint Reading', 'Safety Protocols', 'Hand Tools'], 
 ARRAY['High school diploma', 'Apprenticeship program', 'State licensure'], 
 '{"min": 45000, "max": 90000}', 
 'Strong growth with 8% increase projected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Plumber', 'Install and repair pipes and fixtures that carry water, gas, or other fluids in homes and businesses.', 
 ARRAY['Plumbing Systems', 'Troubleshooting', 'Blueprint Reading', 'Hand Tools', 'Customer Service'], 
 ARRAY['High school diploma', 'Apprenticeship program', 'State licensure'], 
 '{"min": 45000, "max": 85000}', 
 'Good growth with 5% increase expected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('HVAC Technician', 'Install, maintain, and repair heating, ventilation, air conditioning, and refrigeration systems.', 
 ARRAY['HVAC Systems', 'Troubleshooting', 'Electrical Knowledge', 'Mechanical Skills', 'Customer Service'], 
 ARRAY['Post-secondary HVAC program', 'Apprenticeship', 'Certification'], 
 '{"min": 45000, "max": 80000}', 
 'Strong growth with 13% increase projected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Welder', 'Join metal parts together using high heat to melt and fuse them for construction, manufacturing, and repair.', 
 ARRAY['Welding Techniques', 'Blueprint Reading', 'Safety Protocols', 'Hand Tools', 'Precision'], 
 ARRAY['High school diploma', 'Technical training or apprenticeship', 'Certification'], 
 '{"min": 40000, "max": 75000}', 
 'Moderate growth with 3% increase expected');

INSERT INTO public.career_paths (title, description, required_skills, education_requirements, salary_range, job_outlook)
VALUES
('Aircraft Mechanic', 'Repair and perform scheduled maintenance on aircraft engines and other mechanical systems.', 
 ARRAY['Aircraft Systems', 'Troubleshooting', 'Mechanical Skills', 'Documentation', 'Attention to Detail'], 
 ARRAY['FAA-approved aviation maintenance technician school', 'Certification'], 
 '{"min": 55000, "max": 100000}', 
 'Moderate growth with 5% increase projected');

-- Add educational resources for some of the career paths
DO $$
DECLARE
  career_id UUID;
BEGIN
  -- Full Stack Developer resources
  SELECT id INTO career_id FROM public.career_paths WHERE title = 'Full Stack Developer' LIMIT 1;
  IF FOUND THEN
    INSERT INTO public.educational_resources (title, description, url, resource_type, career_path_id)
    VALUES ('Full Stack Web Development Bootcamp', 'Comprehensive bootcamp covering front-end and back-end development with modern JavaScript frameworks.', 
           'https://www.codecademy.com/learn/paths/full-stack-engineer-career-path', 'Online Course', career_id);
  END IF;

  -- Cloud Solutions Architect resources
  SELECT id INTO career_id FROM public.career_paths WHERE title = 'Cloud Solutions Architect' LIMIT 1;
  IF FOUND THEN
    INSERT INTO public.educational_resources (title, description, url, resource_type, career_path_id)
    VALUES ('AWS Certified Solutions Architect', 'Certification program for designing distributed systems on AWS.', 
           'https://aws.amazon.com/certification/certified-solutions-architect-associate/', 'Certification', career_id);
  END IF;

  -- Cybersecurity Analyst resources
  SELECT id INTO career_id FROM public.career_paths WHERE title = 'Cybersecurity Analyst' LIMIT 1;
  IF FOUND THEN
    INSERT INTO public.educational_resources (title, description, url, resource_type, career_path_id)
    VALUES ('Certified Ethical Hacker (CEH)', 'Learn to think like a hacker and protect systems from cyber threats.', 
           'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/', 'Certification', career_id);
  END IF;

  -- Machine Learning Engineer resources
  SELECT id INTO career_id FROM public.career_paths WHERE title = 'Machine Learning Engineer' LIMIT 1;
  IF FOUND THEN
    INSERT INTO public.educational_resources (title, description, url, resource_type, career_path_id)
    VALUES ('Deep Learning Specialization', 'Master deep learning techniques and build neural networks.', 
           'https://www.coursera.org/specializations/deep-learning', 'Online Course', career_id);
  END IF;

  -- Financial Analyst resources
  SELECT id INTO career_id FROM public.career_paths WHERE title = 'Financial Analyst' LIMIT 1;
  IF FOUND THEN
    INSERT INTO public.educational_resources (title, description, url, resource_type, career_path_id)
    VALUES ('Financial Analyst Certification (CFA)', 'Globally recognized professional designation for financial analysts.', 
           'https://www.cfainstitute.org/en/programs/cfa', 'Certification', career_id);
  END IF;
END $$;

-- Add job opportunities for some of the career paths
DO $$
DECLARE
  career_id UUID;
BEGIN
  -- Full Stack Developer job
  SELECT id INTO career_id FROM public.career_paths WHERE title = 'Full Stack Developer' LIMIT 1;
  IF FOUND THEN
    INSERT INTO public.job_opportunities (title, company, location, description, requirements, salary_range, application_url, career_path_id)
    VALUES ('Senior Full Stack Developer', 'Tech Innovations Inc.', 'Remote', 
           'Join our team to build cutting-edge web applications using modern JavaScript frameworks.',
           ARRAY['5+ years experience with JavaScript', 'Experience with React and Node.js', 'Database design experience', 'CI/CD knowledge'],
           '{"min": 110000, "max": 140000}', 'https://example.com/jobs/full-stack-developer', career_id);
  END IF;

  -- Cloud Solutions Architect job
  SELECT id INTO career_id FROM public.career_paths WHERE title = 'Cloud Solutions Architect' LIMIT 1;
  IF FOUND THEN
    INSERT INTO public.job_opportunities (title, company, location, description, requirements, salary_range, application_url, career_path_id)
    VALUES ('Cloud Solutions Architect', 'Enterprise Cloud Services', 'New York, NY', 
           'Design and implement cloud infrastructure solutions for Fortune 500 clients.',
           ARRAY['AWS Certified Solutions Architect', '3+ years cloud architecture experience', 'Strong communication skills', 'Experience with large-scale migrations'],
           '{"min": 130000, "max": 160000}', 'https://example.com/jobs/cloud-architect', career_id);
  END IF;

  -- Cybersecurity Analyst job
  SELECT id INTO career_id FROM public.career_paths WHERE title = 'Cybersecurity Analyst' LIMIT 1;
  IF FOUND THEN
    INSERT INTO public.job_opportunities (title, company, location, description, requirements, salary_range, application_url, career_path_id)
    VALUES ('Cybersecurity Analyst', 'SecureDefense Corp', 'Chicago, IL', 
           'Monitor and protect our systems from cyber threats and implement security measures.',
           ARRAY['Security certifications (CISSP, CEH, etc.)', 'Experience with security tools', 'Incident response experience', 'Knowledge of compliance frameworks'],
           '{"min": 95000, "max": 120000}', 'https://example.com/jobs/cybersecurity-analyst', career_id);
  END IF;

  -- Machine Learning Engineer job
  SELECT id INTO career_id FROM public.career_paths WHERE title = 'Machine Learning Engineer' LIMIT 1;
  IF FOUND THEN
    INSERT INTO public.job_opportunities (title, company, location, description, requirements, salary_range, application_url, career_path_id)
    VALUES ('Machine Learning Engineer', 'AI Innovations Lab', 'San Francisco, CA', 
           'Develop and deploy machine learning models to solve complex business problems.',
           ARRAY['Strong Python skills', 'Experience with TensorFlow or PyTorch', 'Mathematics and statistics background', 'Production ML deployment experience'],
           '{"min": 140000, "max": 180000}', 'https://example.com/jobs/ml-engineer', career_id);
  END IF;

  -- Financial Analyst job
  SELECT id INTO career_id FROM public.career_paths WHERE title = 'Financial Analyst' LIMIT 1;
  IF FOUND THEN
    INSERT INTO public.job_opportunities (title, company, location, description, requirements, salary_range, application_url, career_path_id)
    VALUES ('Senior Financial Analyst', 'Global Investments Corp', 'Boston, MA', 
           'Analyze financial data and prepare reports to guide investment decisions.',
           ARRAY['CFA certification', '5+ years financial analysis experience', 'Advanced Excel skills', 'Experience with financial modeling'],
           '{"min": 90000, "max": 120000}', 'https://example.com/jobs/financial-analyst', career_id);
  END IF;
END $$;
