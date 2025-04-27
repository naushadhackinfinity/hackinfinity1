import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  AnimatedCard
} from "@/components/ui/AnimatedComponents";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat blur-[1px]"
            style={{ backgroundImage: 'url(https://cdn1.genspark.ai/user-upload-image/flux_generated/8924016289174462660_0_6baad2e5-2c3d-45c0-888b-a88b55e50f7e)' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 to-gray-900/80 dark:from-gray-900/90 dark:to-black/90"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="md:flex md:items-center md:space-x-12">
            <SlideIn direction="left" className="md:w-1/2 text-center md:text-left">
              {/* Glassy background for content */}
              <div className="backdrop-blur-md bg-white/20 dark:bg-gray-900/30 p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/25 dark:hover:bg-gray-900/40">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="text-white dark:text-white">Discover Your</span>{" "}
                  <span className="text-amber-400 font-extrabold">Ideal</span>{" "}
                  <span className="text-white dark:text-white">Career Path</span>
                </h1>
                <FadeIn delay={0.2} className="mt-6">
                  <p className="text-xl text-white/90 dark:text-gray-200 max-w-3xl">
                    Find personalized career guidance based on your skills, interests, and goals.
                    Explore career paths, educational resources, and job opportunities tailored to you.
                  </p>
                </FadeIn>
                <FadeIn delay={0.4} className="mt-10">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link href="/signup">
                      <Button
                        size="xl"
                        variant="gradient"
                        className="shadow-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                          </svg>
                        }
                        iconPosition="right"
                      >
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/careers">
                      <Button
                        size="xl"
                        variant="outline"
                        className="text-white border-white hover:bg-white/10 dark:text-white dark:border-white dark:hover:bg-white/10"
                      >
                        Explore Careers
                      </Button>
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={0.3} className="hidden md:block md:w-1/2 mt-12 md:mt-0">
              <div className="relative h-96 w-full rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md bg-white/20 dark:bg-gray-900/30 border border-white/30 dark:border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:bg-white/25 dark:hover:bg-gray-900/40">
                {/* Career illustration image */}
                <div className="absolute inset-0 w-full h-full animate-float" style={{ animationDuration: '6s' }}>
                  <Image
                    src="https://cdn1.genspark.ai/user-upload-image/flux_generated/8924016289174462660_0_6baad2e5-2c3d-45c0-888b-a88b55e50f7e"
                    alt="Career paths illustration showing different professions"
                    fill
                    className="object-cover object-center rounded-xl image-crisp-rendering"
                    quality={100}
                    priority
                    style={{
                      filter: 'contrast(1.1) saturate(1.2)',
                      transform: 'scale(1.05)'
                    }}
                  />
                  {/* Semi-transparent overlay to match theme */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-600/10 to-emerald-600/10 backdrop-blur-[1px]"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-sky-400/30 animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 rounded-full bg-emerald-400/30 animate-float" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-16 right-16 w-8 h-8 rounded-full bg-white/30 animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 sm:text-4xl inline-block">
                Find Your Path to Success
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our platform offers comprehensive tools and resources to help you make informed career decisions.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <StaggerItem>
              <Link href="/assessments">
                <AnimatedCard className="h-full">
                  <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-indigo-100 dark:border-indigo-900/30 shadow-md h-full group transition-all duration-300 hover:shadow-xl">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Personalized Assessments</h3>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      Take comprehensive assessments to discover careers that match your unique skills, interests, and values.
                    </p>
                    <div className="mt-4 text-indigo-600 dark:text-indigo-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Take assessment</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
            </StaggerItem>

            {/* Feature 2 */}
            <StaggerItem>
              <Link href="/careers">
                <AnimatedCard className="h-full">
                  <div className="bg-gradient-to-br from-sky-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-sky-100 dark:border-sky-900/30 shadow-md h-full group transition-all duration-300 hover:shadow-xl">
                    <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Career Exploration</h3>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      Explore detailed information about various career paths, including salary ranges, job outlook, and required skills.
                    </p>
                    <div className="mt-4 text-sky-600 dark:text-sky-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore careers</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
            </StaggerItem>

            {/* Feature 3 */}
            <StaggerItem>
              <Link href="/resources">
                <AnimatedCard className="h-full">
                  <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-purple-100 dark:border-purple-900/30 shadow-md h-full group transition-all duration-300 hover:shadow-xl">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Educational Resources</h3>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      Access curated educational resources and learning paths to help you acquire the skills needed for your desired career.
                    </p>
                    <div className="mt-4 text-purple-600 dark:text-purple-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Browse resources</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
            </StaggerItem>

            {/* Feature 4 */}
            <StaggerItem>
              <Link href="/jobs">
                <AnimatedCard className="h-full">
                  <div className="bg-gradient-to-br from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-orange-100 dark:border-orange-900/30 shadow-md h-full group transition-all duration-300 hover:shadow-xl">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Job Opportunities</h3>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      Discover relevant job opportunities that align with your career goals and qualifications.
                    </p>
                    <div className="mt-4 text-orange-600 dark:text-orange-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Find jobs</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
            </StaggerItem>

            {/* Feature 5 */}
            <StaggerItem>
              <Link href="/analytics">
                <AnimatedCard className="h-full">
                  <div className="bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-green-100 dark:border-green-900/30 shadow-md h-full group transition-all duration-300 hover:shadow-xl">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Data Visualization</h3>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      Visualize career trajectories and compare different paths with interactive charts and graphs.
                    </p>
                    <div className="mt-4 text-green-600 dark:text-green-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View analytics</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
            </StaggerItem>

            {/* Feature 6 */}
            <StaggerItem>
              <Link href="/bookmarks">
                <AnimatedCard className="h-full">
                  <div className="bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-pink-100 dark:border-pink-900/30 shadow-md h-full group transition-all duration-300 hover:shadow-xl">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Bookmarking</h3>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      Save and organize your favorite career paths, resources, and job opportunities for future reference.
                    </p>
                    <div className="mt-4 text-pink-600 dark:text-pink-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View bookmarks</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-gradient-to-r from-sky-500 to-emerald-500 rounded-2xl shadow-2xl overflow-hidden relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1.5" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>

              <div className="pt-12 pb-14 px-6 sm:pt-16 sm:px-16 lg:py-20 lg:pr-0 xl:py-24 xl:px-20 relative z-10">
                <div className="lg:self-center lg:max-w-3xl">
                  <FadeIn>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      <span className="block">Ready to find your <span className="text-emerald-200">ideal career</span>?</span>
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <p className="mt-4 text-lg leading-6 text-blue-100">
                      Create your profile today and get personalized career recommendations based on your unique profile.
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <div className="mt-10">
                      <Link href="/signup">
                        <Button
                          size="xl"
                          variant="gradient"
                          className="bg-white text-indigo-600 hover:text-indigo-700 shadow-xl"
                          icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                          }
                          iconPosition="right"
                        >
                          Get Started For Free
                        </Button>
                      </Link>
                    </div>
                  </FadeIn>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-sky-400/20 animate-float" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-indigo-400/20 animate-float" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
