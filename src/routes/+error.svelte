<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/data/site';
</script>

<svelte:head>
	<title>Un imprévu est survenu | L'Essence de Soi</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="min-h-[65vh] flex items-center justify-center px-margin-mobile py-section-gap-mobile">
	<div class="max-w-xl text-center bg-surface-container-low rounded-[2.5rem] p-8 md:p-12">
		<span class="material-symbols-outlined text-primary text-5xl mb-5" aria-hidden="true">spa</span>
		<h1 class="font-headline-display text-headline-display text-primary mb-5">
			{page.status === 404 ? 'Cette page reste introuvable' : 'Un imprévu est survenu'}
		</h1>
		<p class="text-on-surface-variant mb-8">
			{page.status === 404
				? "La page demandée n'existe pas ou a été déplacée."
				: 'Vous pouvez réessayer dans quelques instants ou envoyer directement un message à Fiona.'}
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a href="/" class="px-7 py-3 rounded-full bg-primary text-on-primary font-semibold">Retour à l'accueil</a>
			<a href={site.phoneHref.replace('tel:', 'sms:')} class="px-7 py-3 rounded-full bg-secondary-container text-on-secondary-container font-semibold">Envoyer un SMS</a>
		</div>
	</div>
</section>
