// Local implementation for career guidance chatbot
// This implementation doesn't rely on external APIs and provides predefined responses
console.log('Using local implementation for the chatbot - no API calls');

// System prompt for the assistant
const SYSTEM_PROMPT = `You are a helpful career guidance assistant for the CareerPathFinder platform.
Your goal is to help users with career advice, job searching tips, skill development,
and educational guidance. Be friendly, supportive, and provide specific, actionable advice.
Focus on helping users discover career paths that match their skills, interests, and goals.
When appropriate, refer users to the platform's features like assessments, career exploration,
and educational resources.

IMPORTANT GUIDELINES:
1. Always provide direct, specific answers to user questions
2. Keep responses concise and focused on the user's specific query
3. Provide personalized advice based on the information the user shares
4. Use bullet points and numbered lists for clarity when appropriate
5. If you don't know something specific, be honest and suggest where they might find that information
6. Recommend relevant platform features that could help the user

Remember that users are seeking practical career guidance, so focus on providing actionable advice.`;

// Define a set of predefined responses for common career-related topics
const responses = {
  default: "I'm here to help with your career questions! I can provide guidance on career paths, skills, job searching, and more.",

  skills: "Developing the right skills is crucial for career success. Based on current trends, some in-demand skills include:\n\n• Technical skills: Programming, data analysis, AI/ML\n• Soft skills: Communication, problem-solving, adaptability\n• Industry-specific skills: Depends on your field of interest\n\nI recommend taking our skills assessment to identify your strengths and areas for improvement.",

  interview: "Preparing for interviews is essential! Here are some tips:\n\n1. Research the company thoroughly\n2. Practice common questions for your field\n3. Prepare examples of your achievements\n4. Prepare thoughtful questions to ask\n5. Dress professionally and arrive early\n\nOur resources section has more detailed interview guides for specific industries.",

  resume: "A strong resume is your ticket to getting interviews. Here are key tips:\n\n• Tailor it for each job application\n• Use action verbs and quantify achievements\n• Keep it concise (1-2 pages)\n• Include relevant keywords from the job description\n• Proofread carefully",

  careerPath: "Finding the right career path involves understanding your skills, interests, and values. Our platform offers several ways to explore career paths:\n\n1. Take our comprehensive assessments\n2. Browse detailed career profiles\n3. Explore educational requirements\n4. See salary and job outlook data",

  education: "Continuing education is valuable for career advancement. Consider:\n\n• Formal degrees (Bachelor's, Master's, PhD)\n• Professional certifications\n• Online courses and MOOCs\n• Workshops and bootcamps\n\nOur platform can help you find educational opportunities that align with your career goals.",

  networking: "Networking is crucial for career growth. Here are effective strategies:\n\n• Attend industry events and conferences\n• Join professional associations\n• Connect with colleagues on LinkedIn\n• Participate in online communities\n• Schedule informational interviews\n\nBuilding relationships can lead to mentorship, job opportunities, and valuable insights.",

  jobSearch: "For an effective job search:\n\n• Update your resume and LinkedIn profile\n• Set up job alerts on major platforms\n• Research companies that interest you\n• Leverage your professional network\n• Prepare tailored cover letters\n• Follow up after applications and interviews\n\nConsistency and persistence are key to finding the right opportunity.",

  salary: "When negotiating salary:\n\n• Research industry standards for your role and location\n• Consider the total compensation package (benefits, bonuses, etc.)\n• Highlight your unique value and achievements\n• Practice your negotiation approach\n• Be confident but flexible\n\nOur salary insights tool can help you understand competitive compensation for your target roles.",

  workLifeBalance: "Maintaining work-life balance is essential for long-term career success. Consider:\n\n• Setting clear boundaries between work and personal time\n• Prioritizing self-care and stress management\n• Communicating your needs to employers\n• Finding workplaces with cultures that align with your values\n• Regularly reassessing your priorities\n\nA sustainable career requires attention to your wellbeing.",

  careerChange: "Considering a career change? Here's a strategic approach:\n\n1. Self-assessment: Identify transferable skills and new interests\n2. Research: Explore requirements for new fields\n3. Skill development: Fill gaps through education or projects\n4. Networking: Connect with professionals in your target field\n5. Gradual transition: Consider stepping stone roles\n\nOur career change assessment can help you plan your transition.",

  entrepreneurship: "Starting your own business requires:\n\n• A viable business idea and model\n• Market research and validation\n• Financial planning and funding\n• Legal and operational setup\n• Marketing and customer acquisition strategies\n• Resilience and adaptability\n\nConsider starting small while maintaining other income until your business is established.",

  remotework: "For success in remote work:\n\n• Create a dedicated workspace\n• Establish a consistent routine\n• Use productivity and communication tools effectively\n• Set clear boundaries between work and personal life\n• Proactively communicate with your team\n• Build in social connection opportunities\n\nRemote work offers flexibility but requires intentional structure.",

  leadership: "Developing leadership skills involves:\n\n• Building self-awareness\n• Practicing effective communication\n• Developing emotional intelligence\n• Learning to delegate and empower others\n• Making decisions with limited information\n• Giving and receiving constructive feedback\n\nLeadership opportunities exist at all career levels, not just in management roles.",

  mentorship: "Finding a mentor can accelerate your career growth. Look for someone who:\n\n• Has experience in your field or desired role\n• Demonstrates values you admire\n• Has time and willingness to provide guidance\n• Can offer honest feedback\n• Has a communication style that works for you\n\nBe clear about your goals and respectful of their time.",

  freelancing: "Building a successful freelance career requires:\n\n• Defining your service offerings\n• Setting appropriate rates\n• Building a portfolio and online presence\n• Developing a client acquisition strategy\n• Managing finances and taxes\n• Creating systems for productivity\n\nStart with smaller projects to build your reputation and client base."
};

// Store conversation history for the UI only
let chatHistory: { question: string; answer: string }[] = [];

export async function sendMessageToGemini(message: string): Promise<string> {
  console.log('Processing message locally:', message);

  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase();

  // Determine the most appropriate response based on keywords
  let response = responses.default;

  // Check for keywords and select the most relevant response
  if (lowerMessage.includes('skill')) {
    response = responses.skills;
  }
  else if (lowerMessage.includes('interview')) {
    response = responses.interview;
  }
  else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
    response = responses.resume;
  }
  else if (lowerMessage.includes('career path') || lowerMessage.includes('career change')) {
    response = responses.careerPath;
  }
  else if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('learn')) {
    response = responses.education;
  }
  else if (lowerMessage.includes('network') || lowerMessage.includes('connect')) {
    response = responses.networking;
  }
  else if (lowerMessage.includes('job search') || lowerMessage.includes('find job') || lowerMessage.includes('looking for job')) {
    response = responses.jobSearch;
  }
  else if (lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('compensation')) {
    response = responses.salary;
  }
  else if (lowerMessage.includes('work life') || lowerMessage.includes('balance') || lowerMessage.includes('stress')) {
    response = responses.workLifeBalance;
  }
  else if (lowerMessage.includes('change career') || lowerMessage.includes('switch career')) {
    response = responses.careerChange;
  }
  else if (lowerMessage.includes('start business') || lowerMessage.includes('entrepreneur')) {
    response = responses.entrepreneurship;
  }
  else if (lowerMessage.includes('remote') || lowerMessage.includes('work from home')) {
    response = responses.remotework;
  }
  else if (lowerMessage.includes('lead') || lowerMessage.includes('manage')) {
    response = responses.leadership;
  }
  else if (lowerMessage.includes('mentor')) {
    response = responses.mentorship;
  }
  else if (lowerMessage.includes('freelance') || lowerMessage.includes('self employ')) {
    response = responses.freelancing;
  }

  // Add a small delay to simulate processing time (optional)
  await new Promise(resolve => setTimeout(resolve, 500));

  // Store this exchange in history
  chatHistory.push({
    question: message,
    answer: response
  });

  // Keep history manageable
  if (chatHistory.length > 10) {
    chatHistory = chatHistory.slice(-10);
  }

  console.log('Response selected successfully');

  return response;
}
