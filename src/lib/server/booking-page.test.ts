import { describe, expect, it, vi } from 'vitest';
import { loadBookingPage } from './booking-page';

describe('loadBookingPage', () => {
	it('keeps the booking page available when loading slots fails', async () => {
		const error = new Error('Supabase unavailable');
		const fetchSlots = vi.fn().mockRejectedValue(error);
		const reportError = vi.fn();

		const result = await loadBookingPage(
			new URL('https://labullecalme.fr/rendez-vous?mois=2026-09'),
			fetchSlots,
			reportError
		);

		expect(result).toEqual({ slots: [], month: '2026-09', slotsUnavailable: true });
		expect(reportError).toHaveBeenCalledWith('Impossible de charger les créneaux de rendez-vous', error);
	});

	it('returns available slots without reporting an error', async () => {
		const slots = [{ id: 'slot-1' }];
		const fetchSlots = vi.fn().mockResolvedValue(slots);
		const reportError = vi.fn();

		const result = await loadBookingPage(
			new URL('https://labullecalme.fr/rendez-vous?mois=2026-09'),
			fetchSlots,
			reportError
		);

		expect(result).toEqual({ slots, month: '2026-09', slotsUnavailable: false });
		expect(reportError).not.toHaveBeenCalled();
	});
});
