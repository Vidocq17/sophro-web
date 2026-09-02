import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/data/site';

const routes = ['/', '/a-propos', '/pourquoi-consulter', '/accompagnements', '/contact', '/rendez-vous'];

export const prerender = true;

export const GET: RequestHandler = () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE_URL}${r}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
