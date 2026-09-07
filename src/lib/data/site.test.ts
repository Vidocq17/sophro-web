import { describe, expect, test } from 'vitest';
import { buildLocalBusinessJsonLd, site } from './site';

describe('local business SEO data', () => {
	test('publishes complete contact and location data for search engines', () => {
		const jsonLd = buildLocalBusinessJsonLd();

		expect(jsonLd).toMatchObject({
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			name: "La Bulle Calme",
			url: 'https://labullecalme.fr',
			telephone: '+33786002486',
			email: 'fiona@labullecalme.com',
		});
		expect(jsonLd.openingHoursSpecification).toHaveLength(1);
	});

	test('exposes crawlable contact links', () => {
		expect(site.phoneHref).toBe('tel:+33786002486');
		expect(site.emailHref).toBe('mailto:fiona@labullecalme.com');
		expect(site.mapsUrl).toContain('19%20rue%20de%20la%20R%C3%A9publique');
	});
});
