<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { testimonials } from '$lib/data/testimonials';
	import { accompagnements } from '$lib/data/accompagnements';
	import { site } from '$lib/data/site';

	const highlights = accompagnements.slice(0, 4);
</script>

<Seo
	title="Sophrologue à Charenton-le-Pont (94220) | La Bulle Calme"
	description="Fiona Benguigui, sophrologue à Charenton-le-Pont, vous accompagne pour le stress, le sommeil et les émotions. Séances en soirée et en visio le week-end."
/>

<section class="relative min-h-[80vh] flex items-center">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<div class="max-w-2xl">
			<p class="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4">Fiona Benguigui · Charenton-le-Pont</p>
			<h1 class="font-headline-display text-headline-display text-primary mb-6">
				Sophrologue à Charenton-le-Pont
			</h1>
			<p class="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
				Je vous accompagne avec bienveillance pour mieux gérer votre stress, retrouver un sommeil plus serein et
				accueillir vos émotions. Les séances ont lieu chez vous ou en visioconférence.
			</p>
			<div class="flex flex-wrap gap-4">
				<Button href="/rendez-vous">Prendre rendez-vous</Button>
				<Button href="/pourquoi-consulter" variant="secondary">Découvrir la sophrologie</Button>
			</div>
		</div>
	</div>
</section>

<section class="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-low">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<div class="text-center max-w-2xl mx-auto mb-16">
			<h2 class="font-headline-lg text-headline-lg text-primary mb-4">Mes Accompagnements</h2>
			<p class="font-body-md text-body-md text-on-surface-variant">
				Des séances adaptées à chaque étape de votre vie et à chaque besoin spécifique.
			</p>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each highlights as item (item.title)}
				<a href="/accompagnements#{item.slug}" class="block bg-surface rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
					<div class="w-16 h-16 bg-primary-container rounded-2xl mb-6 flex items-center justify-center">
						<span class="material-symbols-outlined text-on-primary-container text-3xl" aria-hidden="true"
							>{item.icon}</span
						>
					</div>
					<h3 class="font-headline-md text-headline-md text-primary mb-3">{item.title}</h3>
					<p class="text-sm text-on-surface-variant">{item.description}</p>
					<span class="inline-block mt-5 text-sm font-semibold text-primary">Découvrir cet accompagnement →</span>
				</a>
			{/each}
		</div>
		<div class="text-center mt-10">
			<Button href="/accompagnements" variant="secondary">Voir tous les accompagnements</Button>
		</div>
	</div>
</section>

<section class="py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
		<div>
			<p class="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4">Un cabinet proche de vous</p>
			<h2 class="font-headline-lg text-headline-lg text-primary mb-6">Votre sophrologue à Charenton et dans l'est parisien</h2>
			<p class="text-on-surface-variant leading-relaxed mb-5">
				Le cabinet accueille les habitants de Charenton-le-Pont et des communes voisines du Val-de-Marne :
				Saint-Maurice, Maisons-Alfort, Alfortville, Créteil et Joinville-le-Pont. Il est également facilement
				accessible depuis Vincennes et Saint-Mandé.
			</p>
			<p class="text-on-surface-variant leading-relaxed">
				Les rendez-vous sont proposés en semaine de 18 h à 22 h. Le week-end, les séances ont lieu sur rendez-vous,
				en visioconférence ou à Charenton-le-Pont.
			</p>
		</div>
		<div class="bg-primary-container/30 rounded-[2.5rem] p-8 md:p-12 text-center">
			<h3 class="font-headline-md text-headline-md text-primary mb-5">Cabinet La Bulle Calme</h3>
			<address class="not-italic space-y-3 text-on-surface-variant">
				<p><a class="text-primary font-semibold hover:underline" href={site.phoneHref}>{site.phoneDisplay}</a></p>
				<p><a class="text-primary font-semibold hover:underline" href={site.emailHref}>{site.email}</a></p>
			</address>
			<div class="mt-7"><Button href="/contact" variant="secondary">Voir l'accès et les horaires</Button></div>
		</div>
	</div>
</section>

<section class="py-section-gap-mobile md:py-section-gap-desktop bg-primary text-on-primary rounded-[4rem] mx-4 md:mx-10 my-10">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<div class="text-center mb-16">
			<h2 class="font-headline-lg text-headline-lg mb-4">Paroles de patients</h2>
			<p class="opacity-80">Ils ont retrouvé leur équilibre.</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each testimonials as t (t.name)}
				<div class="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
					<p class="italic mb-6 text-sm leading-relaxed">"{t.quote}"</p>
					<p class="font-bold text-primary-fixed">{t.name}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<div class="bg-secondary-container rounded-[3rem] p-12 md:p-20 text-center">
			<h2 class="font-headline-lg text-headline-lg text-primary mb-6">Prêt(e) à prendre soin de vous ?</h2>
			<p class="text-on-secondary-container max-w-xl mx-auto mb-10 text-body-lg">
				Le premier pas vers le changement commence par une respiration. Réservez votre première séance dès
				maintenant.
			</p>
			<Button href="/rendez-vous">Prendre rendez-vous</Button>
		</div>
	</div>
</section>
