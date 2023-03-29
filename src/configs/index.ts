import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://mtxjymgstalszuxdyfmu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10eGp5bWdzdGFsc3p1eGR5Zm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5OTYyNTMsImV4cCI6MTk5NTU3MjI1M30.cTYVvVK4bJce8r7rAJAMfJGXynkaWw73Ugqi-Iu1KMc',
)
