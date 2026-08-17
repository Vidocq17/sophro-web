<script lang="ts">
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Connexion admin | L'Essence de Soi</title>
</svelte:head>

<section class="max-w-md mx-auto py-section-gap-mobile px-margin-mobile">
	<h1 class="font-headline-lg text-headline-lg text-primary mb-8">Connexion</h1>
	<form method="POST" class="space-y-6">
		<div>
			<label class="text-xs font-bold text-on-surface-variant uppercase tracking-wider" for="email">Email</label>
			<input id="email" name="email" type="email" required class="w-full bg-surface-container-low rounded-lg p-3" />
		</div>
		<div>
			<label class="text-xs font-bold text-on-surface-variant uppercase tracking-wider" for="password">Mot de passe</label>
			<input id="password" name="password" type="password" required class="w-full bg-surface-container-low rounded-lg p-3" />
		</div>
		{#if form?.error}
			<p role="alert" class="text-error text-sm">{form.error}</p>
		{/if}
		<button type="submit" class="w-full bg-primary text-on-primary py-3 rounded-xl font-label-md text-label-md">Se connecter</button>
	</form>
</section>
