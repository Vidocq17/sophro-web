import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAvailableSlots } from '$lib/server/bookings';

const MONTH_RE = /^\d{4}-\d{2}$/;

export const GET: RequestHandler = async ({ url }) => {
	const month = url.searchParams.get('month');

	if (!month || !MONTH_RE.test(month)) {
		return json({ error: 'Paramètre "month" invalide, format attendu YYYY-MM.' }, { status: 400 });
	}

	try {
		const slots = await getAvailableSlots(month);
		return json({ slots });
	} catch (error) {
		console.error('Impossible de charger les créneaux via l’API', error);
		return json({ error: 'Service momentanément indisponible.' }, { status: 503 });
	}
};
