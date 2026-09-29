<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Seo from '$lib/components/Seo.svelte';

	const pillars = [
		{
			icon: 'air',
			title: 'La Respiration',
			description: 'Apprendre à utiliser votre souffle comme une ancre pour apaiser instantanément votre système nerveux.'
		},
		{
			icon: 'accessibility_new',
			title: 'La Détente Musculaire',
			description: "Pratiquez des contractions musculaires pour libérer les tensions du corps."
		},
		{
			icon: 'psychology',
			title: 'La Visualisation',
			description: 'Sollicitez vos ressources positives pour améliorer votre quotidien.'
		}
	];

	const steps = [
		{ title: "L'accueil", description: "Un moment d'échange pour définir vos besoins du jour." },
		{ title: 'Relaxation', description: 'Exercices de respiration contrôlée et de détente musculaire douce.' },
		{ title: 'Visualisation', description: "Suggestion d'images positives guidées par ma voix." },
		{ title: 'Partage', description: 'Libération de la parole sur vos ressentis de la séance.' }
	];

	const faq = [
		{
			q: 'Combien de séances sont nécessaires ?',
			a: "Le nombre de séances varie selon votre objectif. En général, un protocole complet s'étalonne sur 8 à 12 séances, mais des bénéfices se font ressentir dès la première rencontre."
		},
		{
			q: 'Est-ce remboursé par la Sécurité Sociale ?',
			a: "La sophrologie n'est pas remboursée par la Sécurité Sociale, mais de plus en plus de mutuelles prennent en charge tout ou partie des séances. N'hésitez pas à vous renseigner auprès de la vôtre."
		},
		{
			q: 'Faut-il une tenue particulière ?',
			a: "Non, une tenue de ville confortable suffit. La sophrologie se pratique debout ou assis, rarement allongé, sans besoin de se changer ou d'utiliser de matériel spécifique."
		},
		{
			q: 'Quels sont les résultats attendus ?',
			a: 'Une meilleure gestion des émotions, une réduction du stress physique, un sommeil plus réparateur et une plus grande clarté mentale face aux défis quotidiens.'
		}
	];

	const faqJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	};
</script>

<Seo
	title="Pourquoi consulter une sophrologue à Charenton-le-Pont ? | La Bulle Calme"
	description="Découvrez la sophrologie, ses exercices de respiration et de détente, le déroulement d'une séance à Charenton-le-Pont et les réponses aux questions fréquentes."
	path="/pourquoi-consulter"
/>
<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>`}
</svelte:head>

<section class="relative py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<span class="text-primary font-label-md text-label-md uppercase tracking-widest mb-4 block">Comprendre la sophrologie</span>
		<h1 class="font-headline-display text-headline-display text-on-surface mb-6">Pourquoi consulter une sophrologue ?</h1>
		<p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8">
			La sophrologie est une méthode psychocorporelle conçue pour harmoniser le corps et l'esprit. Elle s'appuie sur
			la respiration, la détente musculaire et la visualisation positive.
		</p>
	</div>
</section>

<section class="bg-surface-container-low py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<h2 class="font-headline-lg text-headline-lg text-on-surface mb-16 text-center">Qu'est-ce que la sophrologie ?</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
			{#each pillars as p (p.title)}
				<div class="flex flex-col items-center text-center">
					<div class="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mb-6">
						<span class="material-symbols-outlined text-primary text-3xl" aria-hidden="true">{p.icon}</span>
					</div>
					<h3 class="font-headline-md text-headline-md mb-4">{p.title}</h3>
					<p class="font-body-md text-body-md text-on-surface-variant">{p.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<h2 class="font-headline-lg text-headline-lg text-on-surface mb-4 text-center">Pour qui est-ce fait ?</h2>
		<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto text-center mb-10">
			La sophrologie est une pratique accessible à tous. Que vous soyiez un enfant, un adolescend, un adulte ou un sénior, les exercices sont personnalisés selon vos capacités et vos besoins.
		</p>
		<ul class="flex flex-wrap justify-center gap-6">
			<li><a class="flex items-center gap-3 text-primary hover:underline" href="/accompagnements#stress-anxiete"><span class="w-2 h-2 rounded-full bg-primary"></span>Gestion du stress et de l'anxiété</a></li>
			<li><a class="flex items-center gap-3 text-primary hover:underline" href="/accompagnements#sommeil-fatigue"><span class="w-2 h-2 rounded-full bg-primary"></span>Amélioration du sommeil</a></li>
			<li><a class="flex items-center gap-3 text-primary hover:underline" href="/accompagnements#preparation-examens"><span class="w-2 h-2 rounded-full bg-primary"></span>Préparation future ( examens, permis de conduire, meetings... )</a></li>
		</ul>
	</div>
</section>

<section class="bg-surface-bright py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<h2 class="font-headline-lg text-headline-lg text-on-surface mb-4 text-center">Le déroulement d'une séance</h2>
		<p class="text-on-surface-variant max-w-2xl mx-auto text-center mb-16">Un temps pour vous, d'environ une heure, structuré pour votre progression.</p>
		<ol class="grid grid-cols-1 md:grid-cols-4 gap-4">
			{#each steps as s, i (s.title)}
				<li class="p-6 rounded-2xl border border-outline-variant/30 text-center">
					<div class="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold" aria-hidden="true">{i + 1}</div>
					<h3 class="font-headline-md text-headline-md mb-2">{s.title}</h3>
					<p class="text-sm text-on-surface-variant">{s.description}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter max-w-3xl">
		<h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Vos questions fréquentes</h2>
		<div class="space-y-4">
			{#each faq as f (f.q)}
				<details class="group cursor-pointer bg-surface-container rounded-2xl p-6">
					<summary class="flex items-center justify-between list-none font-headline-md text-headline-md text-on-surface">
						{f.q}
						<span class="material-symbols-outlined transition-transform duration-300 ease-out group-open:rotate-180" aria-hidden="true">expand_more</span>
					</summary>
					<p class="mt-4 text-on-surface-variant leading-relaxed">{f.a}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<section class="py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<div class="bg-primary-container/20 rounded-[48px] p-12 md:p-20 text-center">
			<h2 class="font-headline-display text-headline-display text-on-surface mb-6">Prêt(e) à commencer votre voyage ?</h2>
			<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
				Réservez votre première séance de découverte et définissons ensemble votre chemin vers la sérénité.
			</p>
			<Button href="/rendez-vous">Prendre rendez-vous</Button>
		</div>
	</div>
</section>
