import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '');
		const password = String(formData.get('password') ?? '');

		try {
			const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

			if (error) return fail(401, { error: 'Identifiants incorrects.', email });
		} catch (error) {
			console.error('Service de connexion administrateur indisponible', error);
			return fail(503, { error: 'Connexion momentanément indisponible. Réessayez dans quelques instants.', email });
		}

		throw redirect(303, '/admin');
	}
};
