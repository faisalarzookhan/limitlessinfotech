import { createClient } from '@supabase/supabase-js'

/**
 * The URL for the Supabase project.
 * It is crucial to set this in your environment variables.
 * @type {string}
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

/**
 * The anonymous key for the Supabase project.
 * This key is safe to expose in the browser.
 * It is crucial to set this in your environment variables.
 * @type {string}
 */
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Ensure that the environment variables are set.
if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
}
if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

/**
 * The singleton Supabase client instance.
 * This client is used to interact with the Supabase backend (database, auth, storage).
 * It is initialized with the project URL and the public anonymous key.
 *
 * @example
 * import { supabase } from '@/lib/supabase';
 *
 * const { data, error } = await supabase.from('users').select('*');
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
