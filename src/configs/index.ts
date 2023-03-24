import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://nwqqplhdcpcetkegrsbu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53cXFwbGhkY3BjZXRrZWdyc2J1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTQ3MTI1OSwiZXhwIjoxOTk1MDQ3MjU5fQ.LqxxlfbP7kE1vab07bbQyDEJJQccdcnEikV933R6sFY',
)
