import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const sendMock = vi.fn();
vi.mock('resend', () => ({
	Resend: vi.fn().mockImplementation(function (this: { emails: { send: typeof sendMock } }) {
		this.emails = { send: sendMock };
	})
}));

import {
	sendBookingRequestReceived,
	notifyPractitionerOfBookingRequest,
	sendBookingConfirmation
} from '$lib/server/email';

beforeEach(() => {
	sendMock.mockReset();
	sendMock.mockResolvedValue({ data: { id: 'email-1' }, error: null });
	vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => vi.restoreAllMocks());

describe('sendBookingRequestReceived', () => {
	it('tells the patient their request was received, not confirmed', async () => {
		const sent = await sendBookingRequestReceived({
			email: 'sophie@example.com',
			firstName: 'Sophie',
			date: '2026-09-04',
			startTime: '09:00'
		});
		expect(sent).toBe(true);
		expect(sendMock).toHaveBeenCalledWith(
			expect.objectContaining({ to: 'sophie@example.com', subject: expect.stringContaining('demande') })
		);
	});

	it('does not throw when the email provider fails', async () => {
		sendMock.mockResolvedValue({ data: null, error: { message: 'boom' } });
		await expect(
			sendBookingRequestReceived({ email: 'sophie@example.com', firstName: 'Sophie', date: '2026-09-04', startTime: '09:00' })
		).resolves.toBe(false);
	});
});

describe('notifyPractitionerOfBookingRequest', () => {
	it('sends the request details to the practitioner', async () => {
		const sent = await notifyPractitionerOfBookingRequest({
			firstName: 'Sophie',
			lastName: 'Martin',
			email: 'sophie@example.com',
			phone: '0612345678',
			message: null,
			date: '2026-09-04',
			startTime: '09:00'
		});
		expect(sent).toBe(true);
		expect(sendMock).toHaveBeenCalledWith(
			expect.objectContaining({ to: 'Fiona@labullecalme.fr', subject: expect.stringContaining('demande') })
		);
	});
});

describe('sendBookingConfirmation', () => {
	it('sends the confirmation email once the practitioner validates', async () => {
		const sent = await sendBookingConfirmation({
			email: 'sophie@example.com',
			firstName: 'Sophie',
			date: '2026-09-04',
			startTime: '09:00'
		});
		expect(sent).toBe(true);
		expect(sendMock).toHaveBeenCalledWith(
			expect.objectContaining({ to: 'sophie@example.com', subject: expect.stringContaining('Confirmation') })
		);
	});

	it('does not throw when the email provider rejects the request', async () => {
		sendMock.mockRejectedValue(new Error('network unavailable'));
		await expect(
			sendBookingConfirmation({ email: 'sophie@example.com', firstName: 'Sophie', date: '2026-09-04', startTime: '09:00' })
		).resolves.toBe(false);
	});
});
