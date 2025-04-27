// Script to add career paths to the Supabase database
const fs = require('fs');
const path = require('path');
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

// Read the SQL file
const sqlFilePath = path.join(__dirname, 'add-career-paths.sql');
const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

// Split the SQL content into individual statements
const sqlStatements = sqlContent
  .split(';')
  .map(statement => statement.trim())
  .filter(statement => statement.length > 0);

// Execute each SQL statement
async function executeStatements() {
  console.log(`Found ${sqlStatements.length} SQL statements to execute.`);
  
  for (let i = 0; i < sqlStatements.length; i++) {
    const statement = sqlStatements[i];
    console.log(`Executing statement ${i + 1}/${sqlStatements.length}...`);
    
    try {
      // Execute the SQL statement using Supabase's rpc function
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      
      if (error) {
        console.error(`Error executing statement ${i + 1}:`, error);
      } else {
        console.log(`Statement ${i + 1} executed successfully.`);
      }
    } catch (err) {
      console.error(`Exception executing statement ${i + 1}:`, err);
    }
  }
  
  console.log('All statements processed.');
}

// Main function
async function main() {
  console.log('Starting to add career paths to the database...');
  
  try {
    // First, check if we can connect to Supabase
    const { data, error } = await supabase.from('career_paths').select('count()', { count: 'exact' });
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
      process.exit(1);
    }
    
    console.log(`Connected to Supabase. Current career paths count: ${data[0].count}`);
    
    // Execute the SQL statements
    await executeStatements();
    
    // Verify the data was added
    const { data: newData, error: newError } = await supabase.from('career_paths').select('count()', { count: 'exact' });
    
    if (newError) {
      console.error('Error checking updated career paths count:', newError);
    } else {
      console.log(`Updated career paths count: ${newData[0].count}`);
      console.log(`Added ${newData[0].count - data[0].count} new career paths.`);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Run the main function
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
