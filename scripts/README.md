# Career Path Finder Database Scripts

This directory contains scripts to set up and populate the database for the Career Path Finder application.

## Adding Career Paths

To add the predefined career paths to your Supabase database, use the direct method:

### Direct Method (Recommended)

This method uses Supabase's JavaScript client to directly insert data without requiring any SQL functions:

```bash
npm run add-careers-direct
```

This script will:

- Connect to your Supabase database using the credentials in `.env.local`
- Insert career paths, educational resources, and job opportunities directly
- Show progress and results in the console

### Alternative Method (SQL-based)

If you prefer to use SQL, you can use the original method, but it requires creating a custom SQL function first:

#### 1. Create the exec_sql Function in Supabase

First, you need to create a function in Supabase that allows executing SQL statements:

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy the contents of `create-exec-sql-function.sql` and run it
4. Verify that the function was created successfully

#### 2. Run the Add Careers Script

After creating the function, you can run the script to add career paths:

```bash
npm run add-careers
```

This script will:

- Connect to your Supabase database using the credentials in `.env.local`
- Execute the SQL statements in `add-career-paths.sql`
- Add various career paths, educational resources, and job opportunities

### 3. Verify the Data

After running the script, you can verify that the data was added correctly:

1. Go to your Supabase dashboard
2. Navigate to the Table Editor
3. Check the `career_paths`, `educational_resources`, and `job_opportunities` tables
4. Confirm that the new data is present

## Troubleshooting

If you encounter any issues:

- Make sure your Supabase URL and anon key are correctly set in `.env.local`
- Check that the `exec_sql` function was created successfully
- Look for any error messages in the console output
- Verify that your database tables match the schema expected by the SQL statements
