// supabase.js
const SUPABASE_URL = "https://plllpdeejogopszrcrrc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_R1ypMiJbAx7vPrS_i4-_rQ_6BKkBlKB";

const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
