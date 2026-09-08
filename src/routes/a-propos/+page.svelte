<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Seo from '$lib/components/Seo.svelte';

	const values = [
		{
			icon: 'favorite',
			title: 'Bienveillance',
			description:
				"Un accueil inconditionnel et sans jugement pour vous permettre d'être pleinement vous-même en toute sécurité."
		},
		{
			icon: 'verified',
			title: 'Rigueur',
			description:
				'Une pratique basée sur des protocoles éprouvés et une formation continue pour un accompagnement de haute qualité.'
		},
		{
			icon: 'nature_people',
			title: 'Épanouissement',
			description:
				'Vous transmettre les outils nécessaires pour que vous deveniez autonome dans votre quête de mieux-être.'
		}
	];

	const timeline = [
		{
			period: '2025 - présent',
			title: 'Formation et début de mon activité professionnelle',
			description:
				'Accompagnement de particuliers et animation de séances collectives autour de la gestion des émotions.'
		},
	];
</script>

<Seo
	title="Fiona Benguigui, sophrologue à Charenton-le-Pont"
	description="Découvrez Fiona Benguigui, sophrologue à Charenton-le-Pont, son approche bienveillante et sa pratique auprès des particuliers et des groupes."
	path="/a-propos"
/>

<section class="py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
		<div class="md:col-span-5">
			<img
				src="/fiona-benguigui-sophrologue-charenton.webp"
				alt="Fiona Benguigui, sophrologue à Charenton-le-Pont"
				width="1200"
				height="1600"
				fetchpriority="high"
				loading="eager"
				decoding="async"
				class="aspect-[4/5] w-full rounded-2xl shadow-sm object-cover object-top"
			/>
		</div>
		<div class="md:col-span-7 md:pl-12">
			<span class="text-primary font-label-md text-label-md uppercase tracking-widest mb-4 block">Mon Histoire</span>
			<h1 class="font-headline-display text-headline-display text-on-surface mb-6">Je suis Fiona Benguigui</h1>
			<p class="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
				Sophrologue et passionnée par l'humain, j'aide les personnes à retrouver leur équilibre intérieur
				et à cultiver leur résilience face aux défis du quotidien. Mon approche mêle rigueur professionnelle et
				douceur bienveillante.
			</p>
			<div class="flex flex-wrap gap-4">
				<span class="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-label-md text-label-md italic">Accompagnement personnalisé</span>
				<span class="bg-primary-container text-on-primary-container px-4 py-2 rounded-full font-label-md text-label-md italic">Amélioration du quotidien</span>
				<span class="bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-full font-label-md text-label-md italic">Gestion du Stress</span>
				<span class="bg-surface-container-low text-on-surface-container-low px-4 py-2 rounded-full font-label-md text-label-md italic">Épanouissement Personnel</span>
				<span class="bg-surface-container-high text-on-surface-container-high px-4 py-2 rounded-full font-label-md text-label-md italic">Gestion des émotions</span>
				<span class="bg-surface-container-medium text-on-surface-container-medium px-4 py-2 rounded-full font-label-md text-label-md italic">Estime de soi</span>
			</div>
		</div>
	</div>
</section>

<section class="bg-surface-container-low py-20">
	<div class="max-w-3xl mx-auto px-margin-mobile text-center">
		<blockquote class="font-headline-lg text-headline-lg md:text-4xl text-secondary italic mb-6">
			"Le bien-être n'est pas l'absence de tempête, mais la capacité à rester calme au centre de celle-ci."
		</blockquote>
		<cite class="font-label-md text-label-md text-outline">— Sagesse Intérieure</cite>
	</div>
</section>

<section class="py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<h2 class="font-headline-lg text-headline-lg text-primary mb-4 text-center">Ma Philosophie & Mes Valeurs</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
			{#each values as v (v.title)}
				<div class="bg-surface-container-low p-10 rounded-2xl">
					<span class="material-symbols-outlined text-primary text-4xl mb-6" aria-hidden="true">{v.icon}</span>
					<h3 class="font-headline-md text-headline-md mb-4">{v.title}</h3>
					<p class="font-body-md text-body-md text-on-surface-variant">{v.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-section-gap-mobile md:py-section-gap-desktop bg-surface-bright">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter flex flex-col md:flex-row gap-12">
		<div class="md:w-1/3">
			<h2 class="font-headline-lg text-headline-lg text-primary">Mon Parcours</h2>
		</div>
		<ol class="md:w-2/3 space-y-16">
			{#each timeline as item (item.title)}
				<li>
					<span class="font-label-md text-label-md text-secondary block mb-2">{item.period}</span>
					<h3 class="font-headline-md text-headline-md mb-3">{item.title}</h3>
					<p class="font-body-md text-body-md text-on-surface-variant">{item.description}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
		<div class="bg-primary rounded-3xl p-12 md:p-20 text-center">
			<h2 class="font-headline-display text-headline-display text-on-primary mb-6">Prêt à commencer votre voyage ?</h2>
			<p class="font-body-lg text-body-lg text-on-primary/80 mb-10 max-w-2xl mx-auto">
				Chaque séance est un pas de plus vers une vie plus sereine et consciente. Prenons le temps d'échanger sur
				vos besoins.
			</p>
			<Button href="/rendez-vous" variant="secondary">Prendre rendez-vous en ligne</Button>
		</div>
	</div>
</section>
