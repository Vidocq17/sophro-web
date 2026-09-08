import { describe, expect, it, vi } from 'vitest';
import { processBooking } from './booking-submission';
import type { BookingInput } from './bookings';

const input: BookingInput = {
	slotId: 'slot-1',
	firstName: 'Sophie',
	lastName: 'Martin',
	email: 'sophie@example.com',
	phone: '0612345678',
	message: null,
	sessionType: 'individuelle',
	format: 'visio'
};

describe('processBooking', () => {
	it('reports a temporarily unavailable service when the database throws', async () => {
		const error = new Error('database offline');
		const reportError = vi.fn();
		const result = await processBooking(input, {
			findSlot: vi.fn().mockRejectedValue(error),
			create: vi.fn(),
			sendConfirmation: vi.fn(),
			notifyPractitioner: vi.fn(),
			reportError
		});

		expect(result).toEqual({ status: 'unavailable' });
		expect(reportError).toHaveBeenCalledWith('Échec de la réservation', error);
	});

	it('keeps a confirmed booking when the confirmation email fails', async () => {
		const result = await processBooking(input, {
			findSlot: vi.fn().mockResolvedValue({ date: '2026-09-04', start_time: '19:00' }),
			create: vi.fn().mockResolvedValue({ ok: true, bookingId: 'booking-1' }),
			sendConfirmation: vi.fn().mockResolvedValue(false),
			notifyPractitioner: vi.fn().mockResolvedValue(true),
			reportError: vi.fn()
		});

		expect(result).toEqual({ status: 'confirmed', emailSent: false });
	});

	it('identifies a slot taken by another visitor', async () => {
		const result = await processBooking(input, {
			findSlot: vi.fn().mockResolvedValue({ date: '2026-09-04', start_time: '19:00' }),
			create: vi.fn().mockResolvedValue({ ok: false, reason: 'SLOT_FULL' }),
			sendConfirmation: vi.fn(),
			notifyPractitioner: vi.fn(),
			reportError: vi.fn()
		});

		expect(result).toEqual({ status: 'slot-full' });
	});
});
