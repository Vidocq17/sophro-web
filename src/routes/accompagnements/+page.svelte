<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { accompagnements } from '$lib/data/accompagnements';
</script>

<svelte:head>
	<title>Les Accompagnements | L'Essence de Soi - Sophrologie</title>
	<meta
		name="description"
		content="Découvrez les accompagnements personnalisés : stress, sommeil, émotions, burn-out, confiance, maternité, examens et plus."
	/>
</svelte:head>

<section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap-desktop">
	<span class="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">Votre chemin vers le bien-être</span>
	<h1 class="font-headline-display text-headline-display mb-6 max-w-3xl leading-tight">Accompagnements Personnalisés</h1>
	<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
		Chaque parcours est unique. Découvrez comment la sophrologie peut vous aider à traverser les différentes étapes
		de votre vie avec sérénité, force et équilibre.
	</p>
</section>

<section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-gap-mobile md:pb-section-gap-desktop">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
		{#each accompagnements as a (a.title)}
			<div class="bg-surface-container-low p-8 rounded-[32px] flex flex-col justify-between">
				<div>
					<div class="w-16 h-16 mb-6 rounded-2xl bg-primary-container/40 flex items-center justify-center text-primary">
						<span class="material-symbols-outlined text-4xl" aria-hidden="true">{a.icon}</span>
					</div>
					<h2 class="font-headline-md text-headline-md mb-4">{a.title}</h2>
					<p class="font-body-md text-body-md text-on-surface-variant mb-6">{a.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter mb-section-gap-mobile md:mb-section-gap-desktop">
	<div class="bg-primary-container/30 rounded-[48px] p-12 md:p-24 text-center">
		<h2 class="font-headline-lg text-headline-lg mb-6">Prêt à commencer votre voyage ?</h2>
		<p class="font-body-lg text-body-lg text-on-primary-container mb-10 max-w-2xl mx-auto">
			Chaque accompagnement débute par une séance de découverte pour définir vos besoins et vos objectifs personnels.
		</p>
		<Button href="/rendez-vous">Prendre rendez-vous</Button>
	</div>
</section>
