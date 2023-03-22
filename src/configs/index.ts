import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nwqqplhdcpcetkegrsbu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53cXFwbGhkY3BjZXRrZWdyc2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk0NzEyNTksImV4cCI6MTk5NTA0NzI1OX0.xakoy4JfXYQCG93pbXlsg_CSVR_J0X6id8GzRLD6l84",
  {
    global: {
      fetch: (...args) => {
        console.log("args", args);
        return fetch(...args);
      },
    },
  }
);
