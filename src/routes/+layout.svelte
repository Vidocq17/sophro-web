<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { buildLocalBusinessJsonLd } from '$lib/data/site';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
	const localBusinessJsonLd = buildLocalBusinessJsonLd();
	let isPageVisible = $state(false);

	onMount(() => {
		requestAnimationFrame(() => {
			isPageVisible = true;
		});
	});

	afterNavigate(() => {
		isPageVisible = false;
		requestAnimationFrame(() => {
			isPageVisible = true;
		});
	});
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href={favicon} />
	{@html `<script type="application/ld+json">${JSON.stringify(localBusinessJsonLd)}</script>`}
</svelte:head>

<a href="#main-content" class="sr-only-focusable fixed top-2 left-2 z-100 bg-primary text-on-primary px-4 py-2 rounded-lg">
	Aller au contenu principal
</a>
<Header currentPath={page.url.pathname} />
<main id="main-content" class="pt-20">
	<div class="page-shell" class:page-visible={isPageVisible}>
		{@render children()}
	</div>
</main>
<Footer />
