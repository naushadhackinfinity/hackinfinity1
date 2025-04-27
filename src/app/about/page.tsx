'use client';

import { FadeIn } from '@/components/ui/AnimatedComponents';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          About CareerPathFinder
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Empowering individuals to discover and pursue fulfilling career paths.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        <FadeIn>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At CareerPathFinder, our mission is to empower individuals with the knowledge, tools, and resources they need to make informed career decisions. We believe that everyone deserves a fulfilling career that aligns with their skills, interests, and values.
            </p>
            <p className="text-gray-600 mb-6">
              We're dedicated to breaking down barriers to career exploration and development by providing personalized guidance, comprehensive resources, and cutting-edge tools that make the career discovery process more accessible, effective, and enjoyable.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-gray-600 mb-6">
              We combine advanced technology with career development expertise to create a platform that offers truly personalized guidance. Our approach is built on three core principles:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Personalization:</strong> We recognize that every individual has unique skills, interests, and goals. Our platform uses sophisticated algorithms to provide tailored recommendations and insights.</li>
              <li><strong>Comprehensive Resources:</strong> We offer a wide range of tools and resources, from skill assessments and career path explorations to job search assistance and educational guidance.</li>
              <li><strong>Accessibility:</strong> We believe career guidance should be available to everyone, regardless of their background or circumstances.</li>
            </ul>
          </div>
        </FadeIn>
      </div>

      <div className="mt-20">
        <FadeIn delay={0.3}>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              CareerPathFinder was founded by a team of career development experts, technologists, and educators who recognized the need for more effective and accessible career guidance tools. Having witnessed firsthand the challenges many people face when making career decisions, our founders set out to create a solution that would transform the career exploration process.
            </p>
            <p className="text-gray-600 mb-6">
              Since our launch, we've helped thousands of individuals discover career paths that align with their unique profiles, connect with educational and training opportunities, and take confident steps toward fulfilling professional lives.
            </p>
            <p className="text-gray-600">
              Today, we continue to innovate and expand our platform, driven by our commitment to empowering individuals to build careers they love.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="mt-20">
        <FadeIn delay={0.4}>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously explore new technologies and methodologies to improve our platform and provide cutting-edge career guidance solutions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inclusivity</h3>
              <p className="text-gray-600">
                We're committed to creating a platform that serves individuals from all backgrounds, recognizing the diverse needs and aspirations of our users.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600">
                We uphold the highest standards of honesty, transparency, and ethical conduct in all our operations and interactions with users.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
