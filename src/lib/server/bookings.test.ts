import { describe, it, expect, vi, beforeEach } from 'vitest';

const rpcMock = vi.fn();

vi.mock('$lib/server/supabase', () => ({
	getSupabaseAdmin: () => ({
		rpc: rpcMock,
		from: () => ({
			select: () => ({
				gte: () => ({
					lt: () => ({
						order: () =>
							Promise.resolve({
								data: [
									{
										id: 'slot-1',
										date: '2026-09-04',
										start_time: '09:00',
										end_time: '10:00',
										session_type: 'individuelle',
										format: 'cabinet',
										capacity: 1,
										booked_count: 0
									},
									{
										id: 'slot-2',
										date: '2026-09-04',
										start_time: '14:00',
										end_time: '15:00',
										session_type: 'individuelle',
										format: 'cabinet',
										capacity: 1,
										booked_count: 1
									}
								],
								error: null
							})
					})
				})
			})
		})
	})
}));

import { getAvailableSlots, createBooking } from '$lib/server/bookings';

beforeEach(() => rpcMock.mockReset());

describe('getAvailableSlots', () => {
	it('excludes fully booked slots', async () => {
		const slots = await getAvailableSlots('2026-09');
		expect(slots.map((s) => s.id)).toEqual(['slot-1']);
	});
});

describe('createBooking', () => {
	it('returns ok with the new booking id on success', async () => {
		rpcMock.mockResolvedValue({ data: { id: 'booking-1' }, error: null });
		const result = await createBooking({
			slotId: 'slot-1',
			firstName: 'Sophie',
			lastName: 'Martin',
			email: 'sophie@example.com',
			phone: '0612345678',
			message: null
		});
		expect(result).toEqual({ ok: true, bookingId: 'booking-1' });
		expect(rpcMock).toHaveBeenCalledWith('book_slot', {
			p_slot_id: 'slot-1',
			p_first_name: 'Sophie',
			p_last_name: 'Martin',
			p_email: 'sophie@example.com',
			p_phone: '0612345678',
			p_message: null
		});
	});

	it('returns SLOT_FULL when the RPC raises P0001', async () => {
		rpcMock.mockResolvedValue({ data: null, error: { code: 'P0001', message: 'SLOT_FULL' } });
		const result = await createBooking({
			slotId: 'slot-2',
			firstName: 'Marc',
			lastName: 'Petit',
			email: 'marc@example.com',
			phone: '0698765432',
			message: null
		});
		expect(result).toEqual({ ok: false, reason: 'SLOT_FULL' });
	});
});
