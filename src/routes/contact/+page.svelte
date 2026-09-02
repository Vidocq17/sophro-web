<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { site } from '$lib/data/site';
</script>

<Seo
	title="Contact et accès | Sophrologue à Charenton-le-Pont"
	description="Contactez Fiona Bemont, sophrologue au 19 rue de la République à Charenton-le-Pont. Rendez-vous en semaine de 18 h à 22 h et le week-end sur rendez-vous."
	path="/contact"
/>

<section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap-desktop">
	<p class="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4">Contact et accès</p>
	<h1 class="font-headline-display text-headline-display text-primary mb-6">Votre sophrologue à Charenton-le-Pont</h1>
	<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
		Retrouvez un espace d'écoute et de pratique à Charenton-le-Pont, avec des horaires adaptés aux personnes
		disponibles en soirée. Des séances en visioconférence sont également proposées le week-end.
	</p>
</section>

<section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-gap-mobile md:pb-section-gap-desktop">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		<div class="bg-primary-container/25 rounded-[2.5rem] p-8 md:p-12">
			<h2 class="font-headline-lg text-headline-lg text-primary mb-7">Coordonnées du cabinet</h2>
			<address class="not-italic space-y-5 text-on-surface-variant">
				<div>
					<p class="font-semibold text-on-surface">{site.practitioner} · {site.name}</p>
					<p>{site.streetAddress}<br />{site.postalCode} {site.city}</p>
				</div>
				<p><a class="text-primary font-semibold hover:underline" href={site.phoneHref}>{site.phoneDisplay}</a></p>
				<p><a class="text-primary font-semibold hover:underline break-all" href={site.emailHref}>{site.email}</a></p>
			</address>
			<a class="inline-flex mt-8 items-center justify-center px-7 py-3 rounded-full bg-surface text-primary font-semibold hover:shadow-md transition-shadow" href={site.mapsUrl} target="_blank" rel="noreferrer">
				Afficher l'itinéraire
			</a>
		</div>

		<div class="bg-surface-container-low rounded-[2.5rem] p-8 md:p-12">
			<h2 class="font-headline-lg text-headline-lg text-primary mb-7">Horaires des séances</h2>
			<div class="space-y-6 text-on-surface-variant">
				<div>
					<h3 class="font-headline-md text-headline-md text-on-surface mb-2">En semaine</h3>
					<p>{site.weekdayHours}, sur rendez-vous.</p>
				</div>
				<div>
					<h3 class="font-headline-md text-headline-md text-on-surface mb-2">Le week-end</h3>
					<p>{site.weekendHours}.</p>
				</div>
			</div>
			<div class="mt-8"><Button href="/rendez-vous">Choisir un créneau</Button></div>
		</div>
	</div>
</section>

<section class="bg-surface-container-low py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<h2 class="font-headline-lg text-headline-lg text-primary mb-6">Un cabinet accessible depuis le Val-de-Marne</h2>
		<p class="text-on-surface-variant leading-relaxed max-w-3xl">
			Situé à Charenton-le-Pont dans le Val-de-Marne (94), le cabinet reçoit notamment les personnes venant de
			{site.nearbyCities.slice(0, -1).join(', ')} et {site.nearbyCities.at(-1)}. Si vous ne pouvez pas vous déplacer,
			la visioconférence permet de suivre une séance depuis chez vous.
		</p>
	</div>
</section>

<section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap-desktop text-center">
	<h2 class="font-headline-lg text-headline-lg text-primary mb-5">Une question avant de réserver ?</h2>
	<p class="text-on-surface-variant mb-8">Appelez-moi ou écrivez-moi afin que nous échangions sur votre besoin.</p>
	<div class="flex flex-wrap justify-center gap-4">
		<a class="px-7 py-3 rounded-full bg-primary text-on-primary font-semibold" href={site.phoneHref}>Appeler Fiona</a>
		<a class="px-7 py-3 rounded-full bg-secondary-container text-on-secondary-container font-semibold" href={site.emailHref}>Envoyer un email</a>
	</div>
</section>
