<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

	function translateStatus(b: { status: BookingStatus | string }) {
		if (b.status === 'pending') {
			return 'En attente';
		}
		if (b.status === 'confirmed') {
			return 'Confirmé';
		}
		if (b.status === 'cancelled') {
			return 'Annulé';
		}
		return 'Inconnu';
	}
</script>

<svelte:head>
	<title>Rendez-vous | Admin</title>
</svelte:head>

<h1 class="font-headline-lg text-headline-lg text-primary mb-8">Prochains rendez-vous</h1>

{#if data.loadError}
	<div role="alert" class="bg-secondary-container text-on-secondary-container rounded-xl p-5">
		Impossible de charger les rendez-vous. Vérifiez la connexion au service puis
		<a class="font-semibold underline" href="/admin">réessayez</a>.
	</div>
{:else if data.bookings.length === 0}
	<p class="text-on-surface-variant">Aucun rendez-vous pour le moment.</p>
{:else}
	<div class="overflow-x-auto">
		<table class="w-full text-left">
			<thead>
				<tr class="text-xs uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/30">
					<th class="py-3 pr-4">Date</th>
					<th class="py-3 pr-4">Heure</th>
					<th class="py-3 pr-4">Type</th>
					<th class="py-3 pr-4">Format</th>
					<th class="py-3 pr-4">Client</th>
					<th class="py-3 pr-4">Contact</th>
					<th class="py-3 pr-4">Statut</th>
					<th class="py-3 pr-4">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.bookings as b (b.id)}
					<tr class="border-b border-outline-variant/10">
						<td class="py-3 pr-4">{new Date(b.date).toLocaleDateString('fr-FR')}</td>
						<td class="py-3 pr-4">{b.startTime.slice(0, 5)}</td>
						<td class="py-3 pr-4">{b.sessionType}</td>
						<td class="py-3 pr-4">{b.format}</td>
						<td class="py-3 pr-4">{b.firstName} {b.lastName}</td>
						<td class="py-3 pr-4">{b.email}<br />{b.phone}</td>
						<td class="py-3 pr-4">{translateStatus(b)}</td>
						<td class="py-3 pr-4">
							{#if b.status === 'pending'}
								<div class="flex gap-3">
									<form method="POST" action="?/confirm" use:enhance>
										<input type="hidden" name="id" value={b.id} />
										<button type="submit" class="bg-primary text-on-primary px-4 sm:px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-on-primary-container transition-all active:scale-95">Valider</button>
									</form>
									<form method="POST" action="?/remove" use:enhance>
										<input type="hidden" name="id" value={b.id} />
										<button type="submit" class="bg-error text-on-error px-4 sm:px-6 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 transition-all active:scale-95">Supprimer</button>
									</form>
									<!-- TODO: ajouter un mail en cas de refus ? -->
								</div>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
