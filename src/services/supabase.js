import {createClient} from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ijmoftvwydcevkzxiswe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_V8TCtasXW9aKgKIUu0XWOQ_q0wPQCes';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;