import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate Supabase credentials
const isValidSupabaseUrl = supabaseUrl &&
  (supabaseUrl.startsWith('https://') && supabaseUrl.includes('.supabase.co'));
const isValidAnonKey = supabaseAnonKey &&
  supabaseAnonKey.length > 20 &&
  supabaseAnonKey !== 'your-anon-key';

// Create a mock client if environment variables are not available or invalid
const createMockClient = () => {
  console.warn('Supabase credentials not found or invalid. Using mock client.');
  console.warn('Please update your .env.local file with valid Supabase URL and anon key.');

  // Return a mock client with methods that return empty data and clear error messages
  return {
    auth: {
      getUser: async () => ({
        data: { user: null },
        error: { message: 'Supabase configuration error: Please check your .env.local file' }
      }),
      getSession: async () => ({
        data: { session: null },
        error: { message: 'Supabase configuration error: Please check your .env.local file' }
      }),
      onAuthStateChange: async () => ({
        data: { subscription: { unsubscribe: () => {} } },
        error: null
      }),
      signInWithPassword: async () => ({
        data: null,
        error: { message: 'Authentication error: Supabase is not properly configured. Please check your .env.local file.' }
      }),
      signUp: async () => ({
        data: null,
        error: { message: 'Authentication error: Supabase is not properly configured. Please check your .env.local file.' }
      }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({
        data: null,
        error: { message: 'Authentication error: Supabase is not properly configured. Please check your .env.local file.' }
      }),
    },
    from: (table: string) => ({
      select: (columns: string = '*') => ({
        eq: (column: string, value: any) => ({
          single: async () => ({
            data: null,
            error: { message: `Database error: Could not fetch data from ${table}. Supabase is not properly configured.` }
          }),
        }),
        single: async () => ({
          data: null,
          error: { message: `Database error: Could not fetch data from ${table}. Supabase is not properly configured.` }
        }),
        match: () => ({
          data: [],
          error: { message: `Database error: Could not fetch data from ${table}. Supabase is not properly configured.` }
        }),
        delete: () => ({
          match: () => ({
            error: { message: `Database error: Could not delete data from ${table}. Supabase is not properly configured.` }
          })
        }),
        insert: () => ({
          select: () => ({
            single: async () => ({
              data: null,
              error: { message: `Database error: Could not insert data into ${table}. Supabase is not properly configured.` }
            })
          })
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              single: async () => ({
                data: null,
                error: { message: `Database error: Could not update data in ${table}. Supabase is not properly configured.` }
              })
            })
          })
        }),
      }),
    }),
  };
};

// Create the Supabase client if credentials are available and valid, otherwise use mock
export const supabase = isValidSupabaseUrl && isValidAnonKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : createMockClient() as any;
