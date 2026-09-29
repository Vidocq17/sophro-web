import { describe, expect, test } from 'vitest';
import { buildLocalBusinessJsonLd, buildPersonJsonLd, site } from './site';

describe('local business SEO data', () => {
	test('publishes complete contact and location data for search engines', () => {
		const jsonLd = buildLocalBusinessJsonLd();

		expect(jsonLd).toMatchObject({
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			name: "La Bulle Calme",
			url: 'https://labullecalme.fr',
			telephone: '+33786002485',
			email: 'Fiona@labullecalme.fr',
			address: {
				'@type': 'PostalAddress',
				postalCode: '94220',
				addressLocality: 'Charenton-le-Pont',
				addressCountry: 'FR'
			}
		});
		expect(jsonLd.openingHoursSpecification).toHaveLength(1);
		expect(jsonLd).not.toHaveProperty('priceRange');
	});

	test('links the practitioner to the business by @id', () => {
		expect(buildPersonJsonLd().worksFor['@id']).toBe(buildLocalBusinessJsonLd()['@id']);
	});

	test('exposes crawlable contact links', () => {
		expect(site.phoneHref).toBe('tel:+33786002485');
		expect(site.emailHref).toBe('mailto:Fiona@labullecalme.fr');
		expect(site.mapsUrl).toContain('Charenton-le-Pont');
	});
});
