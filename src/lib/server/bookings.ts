import { getSupabaseAdmin } from '$lib/server/supabase';

export type Slot = {
	id: string;
	date: string;
	start_time: string;
	end_time: string;
	session_type: 'individuelle' | 'collective';
	format: 'cabinet' | 'visio';
	capacity: number;
	booked_count: number;
};

export type BookingInput = {
	slotId: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string | null;
};

export type CreateBookingResult =
	| { ok: true; bookingId: string }
	| { ok: false; reason: 'SLOT_FULL' | 'UNKNOWN' };

export async function getAvailableSlots(month: string): Promise<Slot[]> {
	const monthStart = `${month}-01`;
	const [year, monthNum] = month.split('-').map(Number);
	const nextMonth =
		monthNum === 12 ? `${year + 1}-01-01` : `${year}-${String(monthNum + 1).padStart(2, '0')}-01`;

	const { data, error } = await getSupabaseAdmin()
		.from('availability_slots')
		.select('id, date, start_time, end_time, session_type, format, capacity, booked_count')
		.gte('date', monthStart)
		.lt('date', nextMonth)
		.order('date', { ascending: true });

	if (error) throw error;

	return (data ?? []).filter((slot) => slot.booked_count < slot.capacity);
}

export async function createBooking(input: BookingInput): Promise<CreateBookingResult> {
	const { data, error } = await getSupabaseAdmin().rpc('book_slot', {
		p_slot_id: input.slotId,
		p_first_name: input.firstName,
		p_last_name: input.lastName,
		p_email: input.email,
		p_phone: input.phone,
		p_message: input.message
	});

	if (error) {
		if (error.code === 'P0001') return { ok: false, reason: 'SLOT_FULL' };
		return { ok: false, reason: 'UNKNOWN' };
	}

	return { ok: true, bookingId: (data as { id: string }).id };
}
