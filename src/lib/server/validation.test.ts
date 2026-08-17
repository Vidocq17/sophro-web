import { describe, it, expect } from 'vitest';
import { validateBookingInput } from '$lib/server/validation';

const validRaw = {
	slotId: 'slot-1',
	firstName: 'Sophie',
	lastName: 'Martin',
	email: 'sophie@example.com',
	phone: '0612345678',
	message: 'Bonjour'
};

describe('validateBookingInput', () => {
	it('accepts a fully filled valid form', () => {
		const result = validateBookingInput(validRaw);
		expect(result).toEqual({
			ok: true,
			value: {
				slotId: 'slot-1',
				firstName: 'Sophie',
				lastName: 'Martin',
				email: 'sophie@example.com',
				phone: '0612345678',
				message: 'Bonjour'
			}
		});
	});

	it('treats an empty message as null', () => {
		const result = validateBookingInput({ ...validRaw, message: '' });
		expect(result.ok && result.value.message).toBeNull();
	});

	it('rejects a missing slotId', () => {
		const result = validateBookingInput({ ...validRaw, slotId: '' });
		expect(result).toEqual({ ok: false, errors: { slotId: 'Merci de choisir un créneau.' } });
	});

	it('rejects an invalid email', () => {
		const result = validateBookingInput({ ...validRaw, email: 'not-an-email' });
		expect(result).toEqual({ ok: false, errors: { email: 'Adresse email invalide.' } });
	});

	it('collects multiple errors at once', () => {
		const result = validateBookingInput({ ...validRaw, firstName: '', email: 'bad' });
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(Object.keys(result.errors)).toEqual(['firstName', 'email']);
		}
	});
});
