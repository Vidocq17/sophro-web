import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

let client: SupabaseClient | undefined;

export function getSupabaseAdmin(): SupabaseClient {
	if (!client) {
		client = createClient(PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
			auth: { persistSession: false }
		});
	}
	return client;
}
