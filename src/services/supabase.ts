import { createClient } from '@supabase/supabase-js';

// يفضل وضع هذه القيم في ملف .env في بيئة الإنتاج
const supabaseUrl = 'https://fwqaypbcderfrqhyyfqy.supabase.co';
const supabaseAnonKey = 'sb_publishable_Y-mpW4j2RSCiUBCkgbTS4w_rm5AIkYG';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
