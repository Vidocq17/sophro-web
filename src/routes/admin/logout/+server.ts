import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	try {
		await locals.supabase.auth.signOut();
	} catch (error) {
		console.error('Impossible de fermer la session Supabase', error);
	}
	throw redirect(303, '/admin/login');
};
