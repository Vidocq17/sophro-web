import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAvailableSlots } from '$lib/server/bookings';

const MONTH_RE = /^\d{4}-\d{2}$/;

export const GET: RequestHandler = async ({ url }) => {
	const month = url.searchParams.get('month');

	if (!month || !MONTH_RE.test(month)) {
		return json({ error: 'Paramètre "month" invalide, format attendu YYYY-MM.' }, { status: 400 });
	}

	const slots = await getAvailableSlots(month);
	return json({ slots });
};
