import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const sendMock = vi.fn();
vi.mock('resend', () => ({
	Resend: vi.fn().mockImplementation(function (this: { emails: { send: typeof sendMock } }) {
		this.emails = { send: sendMock };
	})
}));

import { sendBookingConfirmation } from '$lib/server/email';

beforeEach(() => {
	sendMock.mockReset();
	vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => vi.restoreAllMocks());

describe('sendBookingConfirmation', () => {
	it('sends an email with the booking details', async () => {
		sendMock.mockResolvedValue({ data: { id: 'email-1' }, error: null });
		const sent = await sendBookingConfirmation({ email: 'sophie@example.com', firstName: 'Sophie', date: '2026-09-04', startTime: '09:00' });
		expect(sent).toBe(true);
		expect(sendMock).toHaveBeenCalledWith(
			expect.objectContaining({ to: 'sophie@example.com', subject: expect.stringContaining('rendez-vous') })
		);
	});

	it('does not throw when the email provider fails', async () => {
		sendMock.mockResolvedValue({ data: null, error: { message: 'boom' } });
		await expect(
			sendBookingConfirmation({ email: 'sophie@example.com', firstName: 'Sophie', date: '2026-09-04', startTime: '09:00' })
		).resolves.toBe(false);
	});

	it('does not throw when the email provider rejects the request', async () => {
		sendMock.mockRejectedValue(new Error('network unavailable'));
		await expect(
			sendBookingConfirmation({ email: 'sophie@example.com', firstName: 'Sophie', date: '2026-09-04', startTime: '09:00' })
		).resolves.toBe(false);
	});
});
