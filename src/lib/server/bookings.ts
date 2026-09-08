import { getSupabaseAdmin } from '$lib/server/supabase';

export type Slot = {
	id: string;
	date: string;
	start_time: string;
	end_time: string;
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
	sessionType: 'individuelle' | 'collective';
	format: 'visio' | 'présentiel';
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
		.select('id, date, start_time, end_time, capacity, booked_count')
		.gte('date', monthStart)
		.lt('date', nextMonth)
		.order('date', { ascending: true });

	if (error) throw error;

	return (data ?? []).filter((slot) => slot.booked_count < slot.capacity);
}

export async function getSlotDetails(id: string): Promise<{ date: string; start_time: string } | null> {
	const { data, error } = await getSupabaseAdmin()
		.from('availability_slots')
		.select('date, start_time')
		.eq('id', id)
		.single();

	if (error) throw error;
	return data;
}

export async function createBooking(input: BookingInput): Promise<CreateBookingResult> {
	const { data, error } = await getSupabaseAdmin().rpc('book_slot', {
		p_slot_id: input.slotId,
		p_first_name: input.firstName,
		p_last_name: input.lastName,
		p_email: input.email,
		p_phone: input.phone,
		p_message: input.message,
		p_session_type: input.sessionType,
		p_format: input.format
	});

	if (error) {
		if (error.code === 'P0001') return { ok: false, reason: 'SLOT_FULL' };
		return { ok: false, reason: 'UNKNOWN' };
	}

	return { ok: true, bookingId: (data as { id: string }).id };
}
