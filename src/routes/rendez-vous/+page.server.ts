import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { getAvailableSlots, createBooking, getSlotDetails } from '$lib/server/bookings';
import { validateBookingInput } from '$lib/server/validation';
import { sendBookingRequestReceived, notifyPractitionerOfBookingRequest } from '$lib/server/email';
import { loadBookingPage } from '$lib/server/booking-page';
import { processBooking } from '$lib/server/booking-submission';

export const load: PageServerLoad = async ({ url }) => {
	return loadBookingPage(url, getAvailableSlots, console.error);
};

export const actions: Actions = {
	book: async ({ request }) => {
		const formData = await request.formData();
		const raw = Object.fromEntries(formData);
		const result = validateBookingInput(raw);
		const values = {
			firstName: String(raw.firstName ?? ''),
			lastName: String(raw.lastName ?? ''),
			email: String(raw.email ?? ''),
			phone: String(raw.phone ?? ''),
			message: String(raw.message ?? '')
		};

		if (!result.ok) {
			return fail(400, { errors: result.errors, values });
		}

		const outcome = await processBooking(result.value, {
			findSlot: getSlotDetails,
			create: createBooking,
			sendConfirmation: sendBookingRequestReceived,
			notifyPractitioner: notifyPractitionerOfBookingRequest,
			reportError: console.error
		});

		if (outcome.status === 'slot-full') {
			const errors: Record<string, string> = {
				slotId: "Ce créneau vient d'être réservé, merci d'en choisir un autre."
			};
			return fail(409, { errors });
		}

		if (outcome.status === 'unavailable') {
			return fail(503, {
				bookingUnavailable: true,
				values
			});
		}

		return { success: true, emailSent: outcome.emailSent };
	}
};
