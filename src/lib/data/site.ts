export const SITE_URL = 'https://labullecalme.fr';

export const SOCIAL_IMAGE = {
	url: `${SITE_URL}/fiona-benguigui-sophrologue-charenton.webp`,
	width: 1200,
	height: 1600,
	alt: 'Fiona Benguigui, sophrologue à Charenton-le-Pont'
} as const;

export const site = {
	name: "La Bulle Calme",
	practitioner: 'Fiona Benguigui',
	url: SITE_URL,
	phoneDisplay: '07 86 00 24 85',
	phoneInternational: '+33786002485',
	phoneHref: 'tel:+33786002485',
	email: 'Fiona@labullecalme.fr',
	emailHref: 'mailto:Fiona@labullecalme.fr',
	postalCode: '94220',
	city: 'Charenton-le-Pont',
	mapsUrl:
		'https://www.google.com/maps/search/?api=1&query=La%20Bulle%20Calme%20sophrologue%2C%2094220%20Charenton-le-Pont',
	weekdayHours: 'Du lundi au vendredi, de 18 h à 22 h',
	weekendHours: 'Le week-end, en visioconférence ou à Charenton-le-Pont, sur rendez-vous',
	nearbyCities: ['Saint-Maurice', 'Maisons-Alfort', 'Alfortville', 'Créteil', 'Joinville-le-Pont', 'Vincennes', 'Saint-Mandé']
} as const;

export function buildLocalBusinessJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `${SITE_URL}/#sophrologue`,
		name: site.name,
		description:
			'Séances de sophrologie à domicile dans le Val-de-Marne et en visioconférence pour la gestion du stress, du sommeil et des émotions.',
		url: SITE_URL,
		image: SOCIAL_IMAGE.url,
		telephone: site.phoneInternational,
		email: site.email,
		address: {
			'@type': 'PostalAddress',
			postalCode: site.postalCode,
			addressLocality: site.city,
			addressRegion: 'Île-de-France',
			addressCountry: 'FR'
		},
		areaServed: [site.city, ...site.nearbyCities],
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '18:00',
				closes: '22:00'
			}
		]
	};
}

export function buildPersonJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${SITE_URL}/#fiona-benguigui`,
		name: site.practitioner,
		jobTitle: 'Sophrologue',
		url: `${SITE_URL}/a-propos`,
		image: SOCIAL_IMAGE.url,
		worksFor: { '@id': `${SITE_URL}/#sophrologue` }
	};
}
