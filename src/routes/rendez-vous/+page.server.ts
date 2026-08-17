import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { getAvailableSlots, createBooking } from '$lib/server/bookings';
import { validateBookingInput } from '$lib/server/validation';
import { sendBookingConfirmation } from '$lib/server/email';
import { getSupabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async ({ url }) => {
	const month = url.searchParams.get('mois') ?? new Date().toISOString().slice(0, 7);
	const slots = await getAvailableSlots(month);
	return { slots, month };
};

export const actions: Actions = {
	book: async ({ request }) => {
		const formData = await request.formData();
		const result = validateBookingInput(Object.fromEntries(formData));

		if (!result.ok) {
			return fail(400, { errors: result.errors });
		}

		const { data: slot } = await getSupabaseAdmin()
			.from('availability_slots')
			.select('date, start_time')
			.eq('id', result.value.slotId)
			.single();

		const outcome = await createBooking(result.value);

		if (!outcome.ok) {
			const errors: Record<string, string> = {
				slotId: "Ce créneau vient d'être réservé, merci d'en choisir un autre."
			};
			return fail(409, { errors });
		}

		if (slot) {
			await sendBookingConfirmation({
				email: result.value.email,
				firstName: result.value.firstName,
				date: slot.date,
				startTime: slot.start_time
			});
		}

		return { success: true };
	}
};
