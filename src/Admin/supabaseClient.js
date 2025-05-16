// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Use import.meta.env instead of process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    flowType: 'pkce', // More secure
    autoRefreshToken: true,
    persistSession: true,
    autoConfirmEmail: import.meta.env.VITE_SUPABASE_AUTOCONFIRM === 'true'
  }
});