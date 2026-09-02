import type { BookingInput, CreateBookingResult } from './bookings';

type SlotDetails = { date: string; start_time: string };

type Dependencies = {
	findSlot: (id: string) => Promise<SlotDetails | null>;
	create: (input: BookingInput) => Promise<CreateBookingResult>;
	sendConfirmation: (booking: {
		email: string;
		firstName: string;
		date: string;
		startTime: string;
	}) => Promise<boolean>;
	reportError: (message: string, error: unknown) => void;
};

export async function processBooking(input: BookingInput, dependencies: Dependencies) {
	try {
		const slot = await dependencies.findSlot(input.slotId);
		if (!slot) return { status: 'unavailable' } as const;

		const outcome = await dependencies.create(input);
		if (!outcome.ok) {
			return { status: outcome.reason === 'SLOT_FULL' ? 'slot-full' : 'unavailable' } as const;
		}

		const emailSent = await dependencies.sendConfirmation({
			email: input.email,
			firstName: input.firstName,
			date: slot.date,
			startTime: slot.start_time
		});
		return { status: 'confirmed', emailSent } as const;
	} catch (error) {
		dependencies.reportError('Échec de la réservation', error);
		return { status: 'unavailable' } as const;
	}
}
