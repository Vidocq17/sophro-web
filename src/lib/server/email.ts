import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

const PRACTITIONER_EMAIL = 'Fiona@labullecalme.fr';

function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

async function send(payload: { from: string; to: string; subject: string; html: string }): Promise<boolean> {
	const resend = new Resend(env.RESEND_API_KEY);
	try {
		const { error } = await resend.emails.send(payload);
		if (error) {
			console.error('Échec de l’envoi de l’email', error);
			return false;
		}
		return true;
	} catch (error) {
		console.error('Service email indisponible', error);
		return false;
	}
}

export async function sendBookingRequestReceived(booking: {
	email: string;
	firstName: string;
	date: string;
	startTime: string;
}): Promise<boolean> {
	return send({
		from: "La Bulle Calme <contact@labullecalme.fr>",
		to: booking.email,
		subject: 'Votre demande de rendez-vous a bien été enregistrée',
		html: `<p>Bonjour ${booking.firstName},</p><p>Votre demande de rendez-vous pour le ${formatDate(booking.date)} à ${booking.startTime.slice(0, 5)} a bien été enregistrée. Fiona vous confirmera ce créneau très prochainement.</p>`
	});
}

export async function notifyPractitionerOfBookingRequest(booking: {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string | null;
	date: string;
	startTime: string;
}): Promise<boolean> {
	return send({
		from: "La Bulle Calme <contact@labullecalme.fr>",
		to: PRACTITIONER_EMAIL,
		subject: 'Nouvelle demande de rendez-vous',
		html: `<p>${booking.firstName} ${booking.lastName} demande un rendez-vous le ${formatDate(booking.date)} à ${booking.startTime.slice(0, 5)}.</p><p>Email : ${booking.email}<br>Téléphone : ${booking.phone}</p>${booking.message ? `<p>Message : ${booking.message}</p>` : ''}<p>À valider dans l'espace admin ici : <a href="https://labullecalme.fr/admin">Espace Admin</a>.</p>`
	});
}

export async function sendBookingConfirmation(booking: {
	email: string;
	firstName: string;
	date: string;
	startTime: string;
}): Promise<boolean> {
	return send({
		from: "La Bulle Calme <contact@labullecalme.fr>",
		to: booking.email,
		subject: 'Confirmation de votre rendez-vous',
		html: `<p>Bonjour ${booking.firstName},</p><p>Votre rendez-vous est confirmé le ${formatDate(booking.date)} à ${booking.startTime.slice(0, 5)}.</p><p>À très bientôt.</p>`
	});
}
