<script lang="ts">
	const links = [
		{ href: '/', label: 'Accueil' },
		{ href: '/pourquoi-consulter', label: 'Pourquoi consulter ?' },
		{ href: '/accompagnements', label: 'Accompagnements' },
		{ href: '/a-propos', label: 'À propos' },
		{ href: '/contact', label: 'Contact' }
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
			<span class="hidden sm:inline font-headline-md text-headline-md font-medium text-primary">La Bulle Calme</span>
		</a>
		<div class="hidden md:flex items-center gap-8">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={currentPath === link.href ? 'page' : undefined}
					class="group relative pb-1 font-label-md text-label-md transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out {currentPath === link.href
						? 'text-primary font-bold after:scale-x-100'
						: 'text-on-surface-variant hover:text-primary hover:after:scale-x-100'}"
				>
					{link.label}
				</a>
			{/each}
		</div>
		<div class="flex items-center gap-2">
		<a
			href="/rendez-vous"
			class="bg-primary text-on-primary px-4 sm:px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-on-primary-container transition-all active:scale-95"
		>
			<span class="hidden sm:inline">Prendre rendez-vous</span><span class="sm:hidden">Rendez-vous</span>
		</a>
		<details class="relative md:hidden">
			<summary class="list-none cursor-pointer p-2 rounded-full text-primary hover:bg-primary-container/30" aria-label="Ouvrir le menu">
				<span class="material-symbols-outlined block" aria-hidden="true">menu</span>
			</summary>
			<div class="absolute right-0 top-12 w-64 bg-surface rounded-2xl shadow-lg border border-outline-variant/30 p-3">
				{#each links as link (link.href)}
					<a href={link.href} aria-current={currentPath === link.href ? 'page' : undefined} class="group relative block px-4 py-3 rounded-xl text-on-surface-variant transition-colors duration-300 after:content-[''] after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:text-primary hover:after:scale-x-100 {currentPath === link.href ? 'text-primary font-bold after:scale-x-100' : ''}">
						{link.label}
					</a>
				{/each}
			</div>
		</details>
		</div>
	</nav>
</header>
