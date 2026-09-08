import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { getSupabaseAdmin } from '$lib/server/supabase';
import { sendBookingConfirmation } from '$lib/server/email';

export const load: PageServerLoad = async () => {
	try {
		const { data, error } = await getSupabaseAdmin()
			.from('bookings')
			.select(
				'id, first_name, last_name, email, phone, status, session_type, format, availability_slots(date, start_time)'
			)
			.order('created_at', { ascending: false })
			.limit(50);

		if (error) throw error;

		const bookings = (data ?? []).map((b) => ({
			id: b.id,
			firstName: b.first_name,
			lastName: b.last_name,
			email: b.email,
			phone: b.phone,
			status: b.status,
			sessionType: b.session_type,
			format: b.format,
			date: (b.availability_slots as unknown as { date: string }).date,
			startTime: (b.availability_slots as unknown as { start_time: string }).start_time
		}));

		return { bookings, loadError: false };
	} catch (error) {
		console.error('Impossible de charger les rendez-vous administrateur', error);
		return { bookings: [], loadError: true };
	}
};

export const actions: Actions = {
	confirm: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '');
		if (!id) return fail(400, { error: 'Identifiant de la demande manquant.' });

		try {
			const { data: booking, error: fetchError } = await getSupabaseAdmin()
				.from('bookings')
				.select('email, first_name, availability_slots(date, start_time)')
				.eq('id', id)
				.single();
			if (fetchError || !booking) throw fetchError ?? new Error('Demande introuvable');

			const { error } = await getSupabaseAdmin().from('bookings').update({ status: 'confirmed' }).eq('id', id);
			if (error) throw error;

			const slot = booking.availability_slots as unknown as { date: string; start_time: string };
			await sendBookingConfirmation({
				email: booking.email,
				firstName: booking.first_name,
				date: slot.date,
				startTime: slot.start_time
			});

			return { success: true };
		} catch (error) {
			console.error('Impossible de valider la demande de rendez-vous', error);
			return fail(503, { error: 'Service momentanément indisponible. La demande n’a pas été validée.' });
		}
	},

	remove: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '');
		if (!id) return fail(400, { error: 'Identifiant de la demande manquant.' });

		try {
			const { data: booking, error: fetchError } = await getSupabaseAdmin()
				.from('bookings')
				.select('slot_id')
				.eq('id', id)
				.single();
			if (fetchError || !booking) throw fetchError ?? new Error('Demande introuvable');

			const { error: deleteError } = await getSupabaseAdmin().from('bookings').delete().eq('id', id);
			if (deleteError) throw deleteError;

			// ponytail: read-then-write, not atomic. Fine at this traffic level (one
			// practitioner, admin-triggered); switch to a decrement RPC if double
			// cancellations ever race.
			const { data: slot } = await getSupabaseAdmin()
				.from('availability_slots')
				.select('booked_count')
				.eq('id', booking.slot_id)
				.single();
			if (slot) {
				await getSupabaseAdmin()
					.from('availability_slots')
					.update({ booked_count: Math.max(0, slot.booked_count - 1) })
					.eq('id', booking.slot_id);
			}

			return { success: true };
		} catch (error) {
			console.error('Impossible de supprimer la demande de rendez-vous', error);
			return fail(503, { error: 'Service momentanément indisponible. La demande n’a pas été supprimée.' });
		}
	}
};
