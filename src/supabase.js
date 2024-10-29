
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://tmqxveqambmzilxvjnuw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtcXh2ZXFhbWJtemlseHZqbnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMDEwNTYsImV4cCI6MjA0NTc3NzA1Nn0.MpD4RykOzaxsEALDPNn-DFlpQefr9LH9h1F6xIywY4Q"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;