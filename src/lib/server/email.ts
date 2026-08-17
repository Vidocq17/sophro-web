import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

export async function sendBookingConfirmation(booking: {
	email: string;
	firstName: string;
	date: string;
	startTime: string;
}): Promise<void> {
	const resend = new Resend(env.RESEND_API_KEY);
	const formattedDate = new Date(booking.date).toLocaleDateString('fr-FR', {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	});

	const { error } = await resend.emails.send({
		from: "L'Essence de Soi <rendezvous@lessencedesoi.fr>",
		to: booking.email,
		subject: 'Confirmation de votre rendez-vous',
		html: `<p>Bonjour ${booking.firstName},</p><p>Votre rendez-vous est confirmé le ${formattedDate} à ${booking.startTime.slice(0, 5)}.</p><p>À très bientôt.</p>`
	});

	if (error) {
		console.error('sendBookingConfirmation failed:', error);
	}
}
