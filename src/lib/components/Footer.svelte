<script lang="ts">
	import { site } from '$lib/data/site';
</script>

<footer class="bg-surface-container-low w-full py-section-gap-mobile md:py-section-gap-desktop">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
		<div>
			<div class="flex items-center gap-3 mb-5">
				<span class="material-symbols-outlined text-primary text-2xl" aria-hidden="true">spa</span>
				<span class="font-headline-md text-headline-md text-primary">{site.name}</span>
			</div>
			<p class="text-secondary leading-relaxed">{site.practitioner}, sophrologue à {site.city}.</p>
		</div>
		<div>
			<h2 class="font-label-md text-label-md uppercase tracking-widest text-primary mb-5">Navigation</h2>
			<ul class="space-y-3 text-secondary">
				<li><a class="hover:text-primary" href="/pourquoi-consulter">Découvrir la sophrologie</a></li>
				<li><a class="hover:text-primary" href="/accompagnements">Mes accompagnements</a></li>
				<li><a class="hover:text-primary" href="/a-propos">À propos de Fiona</a></li>
				<li><a class="hover:text-primary" href="/rendez-vous">Prendre rendez-vous</a></li>
			</ul>
		</div>
		<div>
			<h2 class="font-label-md text-label-md uppercase tracking-widest text-primary mb-5">Contact</h2>
			<address class="not-italic space-y-3 text-secondary">
				<p>{site.postalCode} {site.city}</p>
				<p><a class="hover:text-primary" href={site.phoneHref}>{site.phoneDisplay}</a></p>
				<p><a class="hover:text-primary break-all" href={site.emailHref}>{site.email}</a></p>
				<p><a class="font-semibold text-primary hover:underline" href="/contact">Accès et horaires</a></p>
			</address>
		</div>
		<div>
			<h2 class="font-label-md text-label-md uppercase tracking-widest text-primary mb-5">Disponibilités</h2>
			<p class="text-secondary mb-3">{site.weekdayHours}</p>
			<p class="text-secondary">Week-end sur rendez-vous, à Charenton ou en visio.</p>
		</div>
	</div>
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter mt-12 pt-8 border-t border-outline-variant/30 text-center space-y-3">
		<p class="text-secondary text-sm">La sophrologie est une méthode d'accompagnement et ne se substitue pas à un avis ou à un traitement médical.</p>
		<p class="text-secondary font-label-md text-label-md">© {new Date().getFullYear()} {site.name} · Sophrologue à Charenton-le-Pont</p>
	</div>
</footer>
