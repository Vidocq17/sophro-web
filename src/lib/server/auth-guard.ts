import type { Session } from '@supabase/supabase-js';

export function requireAdminSession(session: Session | null, pathname: string): { redirect: string } | null {
	const isAdminRoute = pathname.startsWith('/admin');
	const isLoginRoute = pathname === '/admin/login';

	if (isAdminRoute && !isLoginRoute && !session) {
		return { redirect: '/admin/login' };
	}

	return null;
}
