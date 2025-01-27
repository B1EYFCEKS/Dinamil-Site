// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://hpbdbireceuvgxtwaphb.supabase.co'; // Örneğin: https://xyzcompany.supabase.co
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYmRiaXJlY2V1dmd4dHdhcGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4ODEwMzMsImV4cCI6MjA1MjQ1NzAzM30.gIHezBKYYstJzoI-Qa5J24YznUusbvkumn_TuE0jlNw'; // Anon Public Key
export const supabase = createClient(supabaseUrl, supabaseKey);