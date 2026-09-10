<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	const weekdays = [
		{ value: 1, label: 'Lun' },
		{ value: 2, label: 'Mar' },
		{ value: 3, label: 'Mer' },
		{ value: 4, label: 'Jeu' },
		{ value: 5, label: 'Ven' },
		{ value: 6, label: 'Sam' },
		{ value: 0, label: 'Dim' }
	];
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
	<fieldset class="col-span-2 md:col-span-6">
		<legend class="text-xs font-bold uppercase mb-2">Jours de la semaine</legend>
		<div class="flex flex-wrap gap-3">
			{#each weekdays as day (day.value)}
				<label class="flex items-center gap-1.5 bg-surface-container-low rounded-lg px-3 py-2 cursor-pointer">
					<input type="checkbox" name="weekdays" value={day.value} />
					{day.label}
				</label>
			{/each}
		</div>
	</fieldset>
	<div>
		<label class="text-xs font-bold uppercase" for="startDate">À partir du</label>
		<input id="startDate" name="startDate" type="date" required class="w-full bg-surface-container-low rounded-lg p-2" />
	</div>
	<div>
		<label class="text-xs font-bold uppercase" for="weeks">Nombre de semaines</label>
		<input id="weeks" name="weeks" type="number" min="1" value="1" required class="w-full bg-surface-container-low rounded-lg p-2" />
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
		<label class="text-xs font-bold uppercase" for="capacity">Capacité</label>
		<input id="capacity" name="capacity" type="number" min="1" max="10" value="1" required class="w-full bg-surface-container-low rounded-lg p-2" />
		<p class="text-xs text-on-surface-variant mt-1">Max 10 personnes pour une séance collective.</p>
	</div>
	<button type="submit" class="col-span-2 md:col-span-6 bg-primary text-on-primary py-3 rounded-xl font-label-md text-label-md">Ajouter les créneaux</button>
</form>

{#if form?.error}
	<p role="alert" class="text-error text-sm mb-6">{form.error}</p>
{/if}

<div class="space-y-3">
	{#each data.slots as slot (slot.id)}
		<div class="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
			<span>
				{new Date(slot.date).toLocaleDateString('fr-FR')} · {slot.start_time.slice(0, 5)}–{slot.end_time.slice(0, 5)} ·
				{slot.booked_count}/{slot.capacity} réservé(s)
			</span>
			<form method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="id" value={slot.id} />
				<button type="submit" class="bg-error text-on-error px-4 py-1.5 rounded-full text-sm">Supprimer</button>
			</form>
		</div>
	{/each}
</div>
