<script lang="ts">
	import { SITE_URL, SOCIAL_IMAGE } from '$lib/data/site';

	let {
		title,
		description,
		path = ''
	}: { title: string; description: string; path?: string } = $props();

	const canonical = $derived(`${SITE_URL}${path}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="fr_FR" />
	<meta property="og:site_name" content="La Bulle Calme" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={SOCIAL_IMAGE.url} />
	<meta property="og:image:width" content={String(SOCIAL_IMAGE.width)} />
	<meta property="og:image:height" content={String(SOCIAL_IMAGE.height)} />
	<meta property="og:image:alt" content={SOCIAL_IMAGE.alt} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={SOCIAL_IMAGE.url} />
	<meta name="twitter:image:alt" content={SOCIAL_IMAGE.alt} />
</svelte:head>
