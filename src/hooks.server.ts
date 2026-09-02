import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { isAdminPath, requireAdminSession } from '$lib/server/auth-guard';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookies) =>
				cookies.forEach(({ name, value, options }) => event.cookies.set(name, value, { ...options, path: '/' }))
		}
	});

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	if (isAdminPath(event.url.pathname)) {
		try {
			const session = await event.locals.getSession();
			const guard = requireAdminSession(session, event.url.pathname);
			if (guard) throw redirect(303, guard.redirect);
		} catch (error) {
			if (error && typeof error === 'object' && 'status' in error && 'location' in error) throw error;
			console.error('Impossible de vérifier la session administrateur', error);
			if (event.url.pathname !== '/admin/login') throw redirect(303, '/admin/login?service=indisponible');
		}
	}

	return resolve(event);
};
