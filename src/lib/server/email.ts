import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

// Ancienne boîte Hostinger (désactivée) :
// const PRACTITIONER_EMAIL = 'Fiona@labullecalme.fr';
const PRACTITIONER_EMAIL = 'AvidanB1704@gmail.com';

function esc(value: string): string {
	return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

function toIcsDate(date: string, time: string): string {
	return `${date.replaceAll('-', '')}T${time.replaceAll(':', '').slice(0, 6)}`;
}

// ponytail: assumes a 1h slot since slot end_time isn't tracked on the booking; pass a real end time if that changes
function buildBookingIcs(booking: { firstName: string; lastName: string; date: string; startTime: string }): string {
	const start = new Date(`${booking.date}T${booking.startTime}`);
	const end = new Date(start.getTime() + 60 * 60 * 1000);
	const endTime = end.toTimeString().slice(0, 8);
	return [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//La Bulle Calme//Booking//FR',
		'BEGIN:VEVENT',
		`UID:${crypto.randomUUID()}@labullecalme`,
		`DTSTAMP:${toIcsDate(new Date().toISOString().slice(0, 10), new Date().toISOString().slice(11, 19))}Z`,
		`DTSTART:${toIcsDate(booking.date, booking.startTime)}`,
		`DTEND:${toIcsDate(booking.date, endTime)}`,
		`SUMMARY:RDV ${`${booking.firstName} ${booking.lastName}`.replace(/[\r\n]+/g, ' ')}`,
		'END:VEVENT',
		'END:VCALENDAR'
	].join('\r\n');
}

async function send(payload: {
	to: string;
	subject: string;
	html: string;
	attachments?: { filename: string; content: string; contentType?: string }[];
}): Promise<boolean> {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: { user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD }
		});
		await transporter.sendMail({ from: `La Bulle Calme <${env.GMAIL_USER}>`, ...payload });
		return true;
	} catch (error) {
		console.error('Échec de l’envoi de l’email', error);
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
		to: booking.email,
		subject: 'Votre demande de rendez-vous a bien été enregistrée',
		html: `<p>Bonjour ${esc(booking.firstName)},</p><p>Votre demande de rendez-vous pour le ${formatDate(booking.date)} à ${booking.startTime.slice(0, 5)} a bien été enregistrée. Fiona vous confirmera ce créneau très prochainement.</p>`
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
		to: PRACTITIONER_EMAIL,
		subject: 'Nouvelle demande de rendez-vous',
		html: `<p>${esc(booking.firstName)} ${esc(booking.lastName)} demande un rendez-vous le ${formatDate(booking.date)} à ${booking.startTime.slice(0, 5)}.</p><p>Email : ${esc(booking.email)}<br>Téléphone : ${esc(booking.phone)}</p>${booking.message ? `<p>Message : ${esc(booking.message)}</p>` : ''}<p>À valider dans l'espace admin ici : <a href="https://labullecalme.fr/admin">Espace Admin</a>.</p>`,
		attachments: [
			{
				filename: 'rendez-vous.ics',
				content: buildBookingIcs(booking),
				contentType: 'text/calendar'
			}
		]
	});
}

export async function sendBookingConfirmation(booking: {
	email: string;
	firstName: string;
	date: string;
	startTime: string;
}): Promise<boolean> {
	return send({
		to: booking.email,
		subject: 'Confirmation de votre rendez-vous',
		html: `<p>Bonjour ${esc(booking.firstName)},</p><p>Votre rendez-vous est confirmé le ${formatDate(booking.date)} à ${booking.startTime.slice(0, 5)}.</p><p>À très bientôt.</p>`
	});
}
