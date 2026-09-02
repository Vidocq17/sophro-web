import type { PageServerLoad } from './$types';
import { getSupabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async () => {
	try {
		const { data, error } = await getSupabaseAdmin()
			.from('bookings')
			.select('id, first_name, last_name, email, phone, status, availability_slots(date, start_time, session_type)')
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
			date: (b.availability_slots as unknown as { date: string }).date,
			startTime: (b.availability_slots as unknown as { start_time: string }).start_time,
			sessionType: (b.availability_slots as unknown as { session_type: string }).session_type
		}));

		return { bookings, loadError: false };
	} catch (error) {
		console.error('Impossible de charger les rendez-vous administrateur', error);
		return { bookings: [], loadError: true };
	}
};
