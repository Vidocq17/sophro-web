import type { Session } from '@supabase/supabase-js';

export function isAdminPath(pathname: string): boolean {
	return pathname === '/admin' || pathname.startsWith('/admin/');
}

export function requireAdminSession(session: Session | null, pathname: string): { redirect: string } | null {
	const isAdminRoute = isAdminPath(pathname);
	const isLoginRoute = pathname === '/admin/login';

	if (isAdminRoute && !isLoginRoute && !session) {
		return { redirect: '/admin/login' };
	}

	return null;
}
