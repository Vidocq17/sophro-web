export const SITE_URL = 'https://lessence-de-soi.fr';

export const site = {
	name: "L'Essence de Soi",
	practitioner: 'Fiona Bemont',
	url: SITE_URL,
	phoneDisplay: '07 86 00 24 86',
	phoneInternational: '+33786002486',
	phoneHref: 'tel:+33786002486',
	email: 'FionaSophro16@gmail.com',
	emailHref: 'mailto:FionaSophro16@gmail.com',
	streetAddress: '19 rue de la République',
	postalCode: '94220',
	city: 'Charenton-le-Pont',
	addressDisplay: '19 rue de la République, 94220 Charenton-le-Pont',
	mapsUrl:
		'https://www.google.com/maps/search/?api=1&query=19%20rue%20de%20la%20R%C3%A9publique%2C%2094220%20Charenton-le-Pont',
	weekdayHours: 'Du lundi au vendredi, de 18 h à 22 h',
	weekendHours: 'Le week-end, en visioconférence ou à Charenton-le-Pont, sur rendez-vous',
	nearbyCities: ['Saint-Maurice', 'Maisons-Alfort', 'Alfortville', 'Créteil', 'Joinville-le-Pont', 'Vincennes', 'Saint-Mandé']
} as const;

export function buildLocalBusinessJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `${SITE_URL}/#cabinet`,
		name: site.name,
		description:
			'Séances de sophrologie à Charenton-le-Pont et en visioconférence pour la gestion du stress, du sommeil et des émotions.',
		url: SITE_URL,
		telephone: site.phoneInternational,
		email: site.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: site.streetAddress,
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
		],
		priceRange: '€€'
	};
}
