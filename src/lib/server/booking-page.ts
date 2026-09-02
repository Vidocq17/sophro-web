import type { Slot } from './bookings';

type FetchSlots = (month: string) => Promise<Slot[]>;
type ReportError = (message: string, error: unknown) => void;

export async function loadBookingPage(url: URL, fetchSlots: FetchSlots, reportError: ReportError) {
	const month = url.searchParams.get('mois') ?? new Date().toISOString().slice(0, 7);

	try {
		const slots = await fetchSlots(month);
		return { slots, month, slotsUnavailable: false };
	} catch (error) {
		reportError('Impossible de charger les créneaux de rendez-vous', error);
		return { slots: [], month, slotsUnavailable: true };
	}
}
