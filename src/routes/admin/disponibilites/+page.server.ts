import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { getSupabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async () => {
	try {
		const { data, error } = await getSupabaseAdmin()
			.from('availability_slots')
			.select('id, date, start_time, end_time, session_type, format, capacity, booked_count')
			.gte('date', new Date().toISOString().slice(0, 10))
			.order('date', { ascending: true });

		if (error) throw error;
		return { slots: data ?? [], loadError: false };
	} catch (error) {
		console.error('Impossible de charger les disponibilités', error);
		return { slots: [], loadError: true };
	}
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const date = String(formData.get('date') ?? '');
		const startTime = String(formData.get('startTime') ?? '');
		const endTime = String(formData.get('endTime') ?? '');
		const sessionType = String(formData.get('sessionType') ?? '');
		const format = String(formData.get('format') ?? '');
		const capacity = Number(formData.get('capacity') ?? 1);

		if (!date || !startTime || !endTime || !sessionType || !format) {
			return fail(400, { error: 'Tous les champs sont requis.' });
		}

		try {
			const { error } = await getSupabaseAdmin().from('availability_slots').insert({
				date,
				start_time: startTime,
				end_time: endTime,
				session_type: sessionType,
				format,
				capacity
			});

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
