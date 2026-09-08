import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { getSupabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async () => {
	try {
		const { data, error } = await getSupabaseAdmin()
			.from('availability_slots')
			.select('id, date, start_time, end_time, capacity, booked_count')
			.gte('date', new Date().toISOString().slice(0, 10))
			.order('date', { ascending: true });

		if (error) throw error;
		return { slots: data ?? [], loadError: false };
	} catch (error) {
		console.error('Impossible de charger les disponibilités', error);
		return { slots: [], loadError: true };
	}
};

const WEEKDAY_COUNT = 7;

function datesForWeekdays(startDate: string, weeks: number, weekdays: number[]): string[] {
	const start = new Date(`${startDate}T00:00:00`);
	const dates: string[] = [];
	for (let offset = 0; offset < weeks * WEEKDAY_COUNT; offset++) {
		const d = new Date(start);
		d.setDate(start.getDate() + offset);
		if (weekdays.includes(d.getDay())) dates.push(d.toISOString().slice(0, 10));
	}
	return dates;
}

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const startDate = String(formData.get('startDate') ?? '');
		const weeks = Number(formData.get('weeks') ?? 1);
		const weekdays = formData.getAll('weekdays').map(Number);
		const startTime = String(formData.get('startTime') ?? '');
		const endTime = String(formData.get('endTime') ?? '');
		const capacity = Number(formData.get('capacity') ?? 1);

		if (!startDate || !startTime || !endTime || weekdays.length === 0) {
			return fail(400, { error: 'Tous les champs sont requis, avec au moins un jour coché.' });
		}
		if (!Number.isInteger(capacity) || capacity < 1 || capacity > 10) {
			return fail(400, { error: 'La capacité doit être comprise entre 1 et 10 personnes.' });
		}

		const dates = datesForWeekdays(startDate, weeks, weekdays);

		try {
			const { error } = await getSupabaseAdmin()
				.from('availability_slots')
				.insert(
					dates.map((date) => ({
						date,
						start_time: startTime,
						end_time: endTime,
						capacity
					}))
				);

			if (error) throw error;
			return { success: true };
		} catch (error) {
			console.error('Impossible de créer le créneau', error);
			return fail(503, { error: 'Service momentanément indisponible. Le créneau n’a pas été créé.' });
		}
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '');
		if (!id) return fail(400, { error: 'Identifiant du créneau manquant.' });
		try {
			const { error } = await getSupabaseAdmin().from('availability_slots').delete().eq('id', id);
			if (error) throw error;
			return { success: true };
		} catch (error) {
			console.error('Impossible de supprimer le créneau', error);
			return fail(503, { error: 'Service momentanément indisponible. Le créneau n’a pas été supprimé.' });
		}
	}
};
