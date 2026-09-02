<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();
	const isLoginPage = $derived(page.url.pathname === '/admin/login');
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-10">
	{#if !isLoginPage}
		<nav class="flex items-center justify-between mb-10 pb-6 border-b border-outline-variant/30">
			<div class="flex gap-6">
				<a href="/admin" class="font-label-md text-label-md text-primary">Rendez-vous</a>
				<a href="/admin/disponibilites" class="font-label-md text-label-md text-on-surface-variant hover:text-primary">Disponibilités</a>
			</div>
			<form method="POST" action="/admin/logout">
				<button type="submit" class="font-label-md text-label-md text-on-surface-variant hover:text-primary">Déconnexion</button>
			</form>
		</nav>
	{/if}
	{@render children()}
</div>
