import { describe, expect, test } from 'vitest';
import { buildLocalBusinessJsonLd, site } from './site';

describe('local business SEO data', () => {
	test('publishes complete contact and location data for search engines', () => {
		const jsonLd = buildLocalBusinessJsonLd();

		expect(jsonLd).toMatchObject({
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			name: "L'Essence de Soi",
			url: 'https://lessence-de-soi.fr',
			telephone: '+33786002486',
			email: 'FionaSophro16@gmail.com',
			address: {
				'@type': 'PostalAddress',
				streetAddress: '19 rue de la République',
				postalCode: '94220',
				addressLocality: 'Charenton-le-Pont',
				addressCountry: 'FR'
			}
		});
		expect(jsonLd.openingHoursSpecification).toHaveLength(1);
	});

	test('exposes crawlable contact links', () => {
		expect(site.phoneHref).toBe('tel:+33786002486');
		expect(site.emailHref).toBe('mailto:FionaSophro16@gmail.com');
		expect(site.mapsUrl).toContain('19%20rue%20de%20la%20R%C3%A9publique');
	});
});
