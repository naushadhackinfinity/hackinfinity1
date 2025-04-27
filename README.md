# CareerPathFinder

CareerPathFinder is a full-stack web application for personalized career guidance. The platform allows users to create profiles and input their past academic records, skills, experiences, interests, and career goals. Based on this data, the system recommends suitable career paths, educational resources, and job opportunities.

## Features

- **User Authentication**: Secure login and registration system
- **Profile Creation**: Comprehensive user profiles with education, skills, experiences, and interests
- **Career Assessments**: Personality, skills, and interests assessments
- **Career Exploration**: Detailed information about various career paths
- **Personalized Recommendations**: AI-based career recommendations based on user profiles and assessment results
- **Educational Resources**: Curated learning resources for different career paths
- **Job Opportunities**: Relevant job listings based on user's career interests
- **Data Visualization**: Interactive charts for career trajectories and assessment results
- **Bookmarking**: Save favorite careers for future reference
- **Comparison Tools**: Compare different career paths

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Data Visualization**: Chart.js, React-Chartjs-2
- **Form Handling**: React Hook Form, Zod

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/career-path-finder.git
   cd career-path-finder
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Set up the database schema in Supabase:

   - Create the tables as defined in `src/types/database.types.ts`
   - Set up appropriate RLS (Row Level Security) policies

5. Run the development server:

   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Schema

The application uses the following main tables:

- `users`: User authentication information
- `user_profiles`: Detailed user profile information
- `career_paths`: Information about different career paths
- `educational_resources`: Learning resources for different careers
- `job_opportunities`: Job listings related to career paths
- `user_bookmarks`: User's bookmarked career paths
- `assessment_results`: Results from user assessments

## Deployment

### Deploying to Netlify

This project is configured for easy deployment to Netlify:

1. Push your code to GitHub
2. Log in to Netlify and click "New site from Git"
3. Select your GitHub repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

### Environment Variables

Make sure to set these environment variables in Netlify:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key (if using the chatbot)

### Alternative Deployment Options

You can also deploy your Next.js app using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
