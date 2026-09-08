import type { BookingInput } from '$lib/server/bookings';

export type ValidationResult =
	| { ok: true; value: BookingInput }
	| { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(raw: Record<string, FormDataEntryValue | null>, key: string): string {
	const v = raw[key];
	return typeof v === 'string' ? v.trim() : '';
}

export function validateBookingInput(raw: Record<string, FormDataEntryValue | null>): ValidationResult {
	const errors: Record<string, string> = {};

	const slotId = str(raw, 'slotId');
	if (!slotId) errors.slotId = 'Merci de choisir un créneau.';

	const firstName = str(raw, 'firstName');
	if (!firstName) errors.firstName = 'Le prénom est requis.';

	const lastName = str(raw, 'lastName');
	if (!lastName) errors.lastName = 'Le nom est requis.';

	const email = str(raw, 'email');
	if (!email || !EMAIL_RE.test(email)) errors.email = 'Adresse email invalide.';

	const phone = str(raw, 'phone');
	if (!phone) errors.phone = 'Le téléphone est requis.';

	const sessionType = str(raw, 'sessionType');
	if (sessionType !== 'individuelle' && sessionType !== 'collective') {
		errors.sessionType = 'Merci de choisir un type de séance.';
	}

	const format = str(raw, 'format');
	if (format !== 'visio' && format !== 'présentiel') {
		errors.format = 'Merci de choisir un format.';
	}

	if (Object.keys(errors).length > 0) return { ok: false, errors };

	const message = str(raw, 'message');

	return {
		ok: true,
		value: {
			slotId,
			firstName,
			lastName,
			email,
			phone,
			message: message || null,
			sessionType: sessionType as 'individuelle' | 'collective',
			format: format as 'visio' | 'présentiel'
		}
	};
}
