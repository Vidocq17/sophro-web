import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const sendMock = vi.fn();
vi.mock('nodemailer', () => ({
	default: { createTransport: () => ({ sendMail: sendMock }) }
}));
vi.mock('$env/dynamic/private', () => ({
	env: { GMAIL_USER: 'AvidanB1704@gmail.com', GMAIL_APP_PASSWORD: 'x' }
}));

import {
	sendBookingRequestReceived,
	notifyPractitionerOfBookingRequest,
	sendBookingConfirmation
} from '$lib/server/email';

beforeEach(() => {
	sendMock.mockReset();
	sendMock.mockResolvedValue({ messageId: 'email-1' });
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
		sendMock.mockRejectedValue(new Error('boom'));
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
			expect.objectContaining({ to: 'AvidanB1704@gmail.com', subject: expect.stringContaining('demande') })
		);
	});
});

describe('html escaping', () => {
	it('escapes user-supplied fields in the practitioner email', async () => {
		await notifyPractitionerOfBookingRequest({
			firstName: '<script>x</script>',
			lastName: 'Martin',
			email: 'sophie@example.com',
			phone: '0612345678',
			message: '<b>hi</b>',
			date: '2026-09-04',
			startTime: '09:00'
		});
		const { html } = sendMock.mock.calls[0][0];
		expect(html).not.toContain('<script>');
		expect(html).not.toContain('<b>hi</b>');
		expect(html).toContain('&#60;script&#62;');
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
