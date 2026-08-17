<script lang="ts">
	const links = [
		{ href: '/', label: 'Accueil' },
		{ href: '/pourquoi-consulter', label: 'Pourquoi consulter ?' },
		{ href: '/accompagnements', label: 'Accompagnements' },
		{ href: '/a-propos', label: 'À propos' }
	];
	let { currentPath = '' }: { currentPath?: string } = $props();
</script>

<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
	<nav
		aria-label="Navigation principale"
		class="max-w-container-max mx-auto px-margin-mobile md:px-gutter flex items-center justify-between h-20"
	>
		<a href="/" class="flex items-center gap-3">
			<span class="material-symbols-outlined text-primary text-3xl" aria-hidden="true">spa</span>
			<span class="font-headline-md text-headline-md font-medium text-primary">L'Essence de Soi</span>
		</a>
		<div class="hidden md:flex items-center gap-8">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={currentPath === link.href ? 'page' : undefined}
					class="font-label-md text-label-md transition-colors duration-300 {currentPath === link.href
						? 'text-primary font-bold border-b-2 border-primary'
						: 'text-on-surface-variant hover:text-primary'}"
				>
					{link.label}
				</a>
			{/each}
		</div>
		<a
			href="/rendez-vous"
			class="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-on-primary-container transition-all active:scale-95"
		>
			Prendre rendez-vous
		</a>
	</nav>
</header>
