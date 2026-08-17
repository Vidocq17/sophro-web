import { describe, it, expect } from 'vitest';
import { requireAdminSession } from '$lib/server/auth-guard';

describe('requireAdminSession', () => {
	it('allows access to /admin/login without a session', () => {
		expect(requireAdminSession(null, '/admin/login')).toBeNull();
	});

	it('redirects to /admin/login when accessing /admin without a session', () => {
		expect(requireAdminSession(null, '/admin')).toEqual({ redirect: '/admin/login' });
	});

	it('redirects to /admin/login when accessing a nested admin route without a session', () => {
		expect(requireAdminSession(null, '/admin/disponibilites')).toEqual({ redirect: '/admin/login' });
	});

	it('allows access when a session exists', () => {
		expect(requireAdminSession({ user: { id: 'u1' } } as never, '/admin')).toBeNull();
	});

	it('does not guard non-admin routes', () => {
		expect(requireAdminSession(null, '/rendez-vous')).toBeNull();
	});
});
