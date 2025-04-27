-- Create a function to execute SQL statements
-- This needs to be run in the Supabase SQL Editor first before running the add-careers.js script

CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
