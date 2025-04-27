# Adding Career Paths Using SQL Editor

This document provides instructions on how to add career paths to your Supabase database using the SQL Editor.

## Instructions

1. **Log in to your Supabase Dashboard**
   - Go to https://app.supabase.com/
   - Select your project

2. **Open the SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query" to create a new SQL query

3. **Copy and Paste the SQL Script**
   - Open the file `add-careers-sql-editor.sql` in this directory
   - Copy the entire contents of the file
   - Paste it into the SQL Editor in Supabase

4. **Run the Script**
   - Click the "Run" button to execute the SQL script
   - This will add all the career paths, educational resources, and job opportunities to your database

5. **Verify the Data**
   - Go to the "Table Editor" in the Supabase dashboard
   - Check the `career_paths` table to see the newly added career paths
   - Check the `educational_resources` and `job_opportunities` tables as well

## Troubleshooting

If you encounter any errors:

1. **Check for Duplicate Data**
   - The script might fail if you already have career paths with the same titles
   - You can modify the script to skip existing data or clear the tables first

2. **Run in Smaller Batches**
   - If the script is too large, try running it in smaller sections
   - Each INSERT statement can be run separately

3. **Check Table Structure**
   - Make sure your tables match the expected schema
   - The script assumes the standard schema from the application

## Notes

- This script adds 35+ career paths across various industries
- It also adds educational resources and job opportunities for some career paths
- You can modify the script to add more career paths or customize the existing ones
