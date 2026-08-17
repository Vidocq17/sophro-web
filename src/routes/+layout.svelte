<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<a href="#main-content" class="sr-only-focusable fixed top-2 left-2 z-[100] bg-primary text-on-primary px-4 py-2 rounded-lg">
	Aller au contenu principal
</a>
<Header currentPath={page.url.pathname} />
<main id="main-content" class="pt-20">
	{@render children()}
</main>
<Footer />
