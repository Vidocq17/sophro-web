<script lang="ts">
	let {
		href = undefined,
		variant = 'primary',
		type = 'button',
		class: extraClass = '',
		children
	}: {
		href?: string;
		variant?: 'primary' | 'secondary';
		type?: 'button' | 'submit';
		class?: string;
		children: import('svelte').Snippet;
	} = $props();

	const base =
		'inline-flex items-center justify-center px-8 py-4 rounded-full font-label-md text-label-md transition-all active:scale-95';
	const variants = {
		primary: 'bg-primary text-on-primary hover:shadow-lg',
		secondary:
			'bg-secondary-container text-on-secondary-container border border-secondary/10 hover:bg-secondary-container/80'
	};
</script>

{#if href}
	<a {href} class="{base} {variants[variant]} {extraClass}">
		{@render children()}
	</a>
{:else}
	<button {type} class="{base} {variants[variant]} {extraClass}">
		{@render children()}
	</button>
{/if}
