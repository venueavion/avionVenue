// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nnrynmpwnlhinoxwovkn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ucnlubXB3bmxoaW5veHdvdmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTc3NDQsImV4cCI6MjA2MjM3Mzc0NH0.I5O8xw5YvbMkyI5gfNZA2thmWdvzhLqaj9-VOT0ZQNA';
export const supabase = createClient(supabaseUrl, supabaseKey);
