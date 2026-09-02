<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Disponibilités | Admin</title>
</svelte:head>

<h1 class="font-headline-lg text-headline-lg text-primary mb-8">Gérer les disponibilités</h1>

{#if data.loadError}
	<div role="alert" class="bg-secondary-container text-on-secondary-container rounded-xl p-5 mb-8">
		Impossible de charger les disponibilités. <a class="font-semibold underline" href="/admin/disponibilites">Réessayer</a>.
	</div>
{/if}

<form method="POST" action="?/create" use:enhance class="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12 items-end">
	<div>
		<label class="text-xs font-bold uppercase" for="date">Date</label>
		<input id="date" name="date" type="date" required class="w-full bg-surface-container-low rounded-lg p-2" />
	</div>
	<div>
		<label class="text-xs font-bold uppercase" for="startTime">Début</label>
		<input id="startTime" name="startTime" type="time" required class="w-full bg-surface-container-low rounded-lg p-2" />
	</div>
	<div>
		<label class="text-xs font-bold uppercase" for="endTime">Fin</label>
		<input id="endTime" name="endTime" type="time" required class="w-full bg-surface-container-low rounded-lg p-2" />
	</div>
	<div>
		<label class="text-xs font-bold uppercase" for="sessionType">Type</label>
		<select id="sessionType" name="sessionType" class="w-full bg-surface-container-low rounded-lg p-2">
			<option value="individuelle">Individuelle</option>
			<option value="collective">Collective</option>
		</select>
	</div>
	<div>
		<label class="text-xs font-bold uppercase" for="format">Format</label>
		<select id="format" name="format" class="w-full bg-surface-container-low rounded-lg p-2">
			<option value="cabinet">Cabinet</option>
			<option value="visio">Visio</option>
		</select>
	</div>
	<div>
		<label class="text-xs font-bold uppercase" for="capacity">Capacité</label>
		<input id="capacity" name="capacity" type="number" min="1" value="1" class="w-full bg-surface-container-low rounded-lg p-2" />
	</div>
	<button type="submit" class="col-span-2 md:col-span-6 bg-primary text-on-primary py-3 rounded-xl font-label-md text-label-md">Ajouter le créneau</button>
</form>

{#if form?.error}
	<p role="alert" class="text-error text-sm mb-6">{form.error}</p>
{/if}

<div class="space-y-3">
	{#each data.slots as slot (slot.id)}
		<div class="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
			<span>
				{new Date(slot.date).toLocaleDateString('fr-FR')} · {slot.start_time.slice(0, 5)}–{slot.end_time.slice(0, 5)} ·
				{slot.session_type} · {slot.format} · {slot.booked_count}/{slot.capacity} réservé(s)
			</span>
			<form method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="id" value={slot.id} />
				<button type="submit" class="text-error text-sm">Supprimer</button>
			</form>
		</div>
	{/each}
</div>
