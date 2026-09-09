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
		'inline-flex items-center justify-center px-8 py-4 rounded-full font-label-md text-label-md duration-400 ease-out active:scale-[0.98] hover:-translate-y-0.5 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-[transform,box-shadow,color,background-color,opacity]';
	const variants = {
		primary:
			'bg-primary text-on-primary shadow-[0_8px_22px_rgba(81,99,84,0.12)] hover:bg-on-primary-container hover:shadow-[0_10px_24px_rgba(81,99,84,0.18)]',
		secondary:
			'bg-secondary-container text-on-secondary-container border border-secondary/10 hover:bg-secondary-container/80 hover:shadow-[0_8px_20px_rgba(81,99,84,0.08)]'
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
