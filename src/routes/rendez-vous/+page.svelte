<script lang="ts">
	import { enhance } from '$app/forms';
	import Seo from '$lib/components/Seo.svelte';
	import { site } from '$lib/data/site';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const sessionTypeInfo = {
		individuelle: { label: 'Séance Individuelle', description: 'Accompagnement personnalisé', price: '60€', duration: '1 heure' },
		collective: { label: 'Séance Collective', description: 'Énergie et partage de groupe', price: '20€', duration: '1h15' }
	} as const;

	const formatInfo = {
		visio: { label: 'Visioconférence' },
		présentiel: { label: 'À domicile' }
	} as const;

	let selectedType = $state<'individuelle' | 'collective'>('individuelle');
	let selectedFormat = $state<'visio' | 'présentiel'>('visio');
	let selectedSlotId = $state<string | null>(null);
	let submitting = $state(false);

	function enhanceBooking() {
		submitting = true;
		return async ({ update }: { update: () => Promise<void> }) => {
			try {
				await update();
			} finally {
				submitting = false;
			}
		};
	}

	const slotsByDate = $derived(
		data.slots
			.reduce<Record<string, typeof data.slots>>((acc, slot) => {
				(acc[slot.date] ??= []).push(slot);
				return acc;
			}, {})
	);

	let selectedDate = $state<string | null>(null);
	$effect(() => {
		const dates = Object.keys(slotsByDate);
		if (!selectedDate || !dates.includes(selectedDate)) {
			selectedDate = dates[0] ?? null;
		}
	});

	function previousMonth() {
		const [y, m] = data.month.split('-').map(Number);
		const d = new Date(y, m - 2, 1);
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
	}
	function nextMonth() {
		const [y, m] = data.month.split('-').map(Number);
		const d = new Date(y, m, 1);
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
	}
</script>

<Seo
	title="Prendre rendez-vous avec une sophrologue à Charenton"
	description="Réservez votre séance avec Fiona Benguigui, sophrologue à Charenton-le-Pont : rendez-vous en soirée la semaine, à Charenton ou en visio le week-end."
	path="/rendez-vous"
/>

<section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter mb-16 text-center">
	<h1 class="font-headline-display text-headline-display text-primary mb-4">Réservez votre instant de sérénité</h1>
	<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
		Choisissez votre créneau pour une séance à Charenton-le-Pont ou en visioconférence selon les disponibilités.
	</p>
</section>

{#if data.slotsUnavailable}
	<section class="max-w-2xl mx-auto px-margin-mobile md:px-gutter">
		<div role="alert" class="bg-secondary-container/70 border border-secondary/15 rounded-[2rem] p-8 md:p-10 text-center">
			<span class="material-symbols-outlined text-primary text-4xl mb-4" aria-hidden="true">sms</span>
			<h2 class="font-headline-lg text-headline-lg text-primary mb-4">Créneaux momentanément indisponibles</h2>
			<p class="text-on-surface-variant mb-7">
				Envoyez un message au <a class="font-semibold text-primary hover:underline" href="sms:+33786002486">{site.phoneDisplay}</a>
				pour prendre rendez-vous.
			</p>
			<a class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-on-primary font-semibold" href="sms:+33786002486">
				Envoyer un SMS
			</a>
		</div>
	</section>
{:else}
<section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
		<div class="lg:col-span-5 space-y-6">
			<fieldset class="bg-primary-container/20 p-8 rounded-xl">
				<legend class="font-headline-md text-headline-md text-primary mb-6">Type de séance</legend>
				{#each Object.entries(sessionTypeInfo) as [value, info] (value)}
					<label
						class="flex items-center p-4 mb-4 bg-surface rounded-lg cursor-pointer border {selectedType === value
							? 'border-primary ring-1 ring-primary'
							: 'border-transparent'}"
					>
						<input class="sr-only" type="radio" name="sessionTypeChoice" value={value} bind:group={selectedType} />
						<span class="flex-1">
							<span class="block font-label-md text-label-md text-on-surface">{info.label}</span>
							<span class="block text-sm text-on-surface-variant mt-1">{info.description}</span>
						</span>
						<span class="text-right">
							<span class="block font-label-md text-label-md text-primary">{info.price}</span>
							<span class="block text-xs text-on-surface-variant">{info.duration}</span>
						</span>
					</label>
				{/each}
			</fieldset>

			<fieldset class="bg-primary-container/20 p-8 rounded-xl">
				<legend class="font-headline-md text-headline-md text-primary mb-6">Format</legend>
				{#each Object.entries(formatInfo) as [value, info] (value)}
					<label
						class="flex items-center p-4 mb-4 last:mb-0 bg-surface rounded-lg cursor-pointer border {selectedFormat === value
							? 'border-primary ring-1 ring-primary'
							: 'border-transparent'}"
					>
						<input class="sr-only" type="radio" name="formatChoice" value={value} bind:group={selectedFormat} />
						<span class="flex-1 font-label-md text-label-md text-on-surface">{info.label}</span>
					</label>
				{/each}
			</fieldset>
		</div>

		<div class="lg:col-span-7 bg-white shadow-sm rounded-xl overflow-hidden">
			<div class="p-8 border-b border-surface-variant/30 flex items-center justify-between">
				<div>
					<h2 class="font-headline-md text-headline-md text-on-surface">Choisir une date</h2>
					<p class="text-sm text-on-surface-variant">Disponibilités pour {data.month}</p>
				</div>
				<div class="flex gap-2">
					<a href="?mois={previousMonth()}" class="p-2 hover:bg-surface rounded-full transition-colors" aria-label="Mois précédent">
						<span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
					</a>
					<a href="?mois={nextMonth()}" class="p-2 hover:bg-surface rounded-full transition-colors" aria-label="Mois suivant">
						<span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
					</a>
				</div>
			</div>
			<div class="p-8">
				{#if Object.keys(slotsByDate).length === 0}
					<p class="text-on-surface-variant">Aucun créneau disponible pour ce mois. Essayez le mois suivant.</p>
				{:else}
					<div class="flex flex-wrap gap-3 mb-8" role="list" aria-label="Dates disponibles">
						{#each Object.keys(slotsByDate) as date (date)}
							<button
								type="button"
								class="px-4 py-2 rounded-full border font-medium {selectedDate === date
									? 'bg-primary text-white border-primary'
									: 'border-surface-variant text-on-surface-variant hover:border-primary hover:text-primary'}"
								onclick={() => (selectedDate = date)}
								aria-pressed={selectedDate === date}
							>
								{new Date(date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
							</button>
						{/each}
					</div>

					{#if selectedDate}
						<p class="font-label-md text-label-md text-on-surface mb-4">
							Créneaux disponibles pour le {new Date(selectedDate).toLocaleDateString('fr-FR', {
								weekday: 'long',
								day: 'numeric',
								month: 'long'
							})}
						</p>
						<div class="flex flex-wrap gap-3" role="radiogroup" aria-label="Heure du rendez-vous">
							{#each slotsByDate[selectedDate] as slot (slot.id)}
								<button
									type="button"
									class="px-6 py-2 rounded-full border font-medium {selectedSlotId === slot.id
										? 'bg-primary/10 border-2 border-primary text-primary font-bold'
										: 'border-surface-variant text-on-surface-variant hover:border-primary hover:text-primary'}"
									onclick={() => (selectedSlotId = slot.id)}
									aria-pressed={selectedSlotId === slot.id}
								>
									{slot.start_time.slice(0, 5)}
								</button>
							{/each}
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</section>

<section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter mt-section-gap-desktop">
	<div class="bg-surface-container-low p-10 rounded-2xl max-w-2xl mx-auto">
		<h2 class="font-headline-md text-headline-md text-on-surface mb-8">Informations personnelles</h2>

		{#if form?.success}
			<p role="status" class="p-4 rounded-lg bg-primary-container text-on-primary-container">
				{#if form.emailSent}
					Merci ! Votre rendez-vous est confirmé et un email vous a été envoyé.
				{:else}
					Votre rendez-vous est bien confirmé. L'email n'a pas pu être envoyé, pensez à noter le créneau choisi.
				{/if}
			</p>
		{:else}
			<form method="POST" action="?/book" use:enhance={enhanceBooking} aria-busy={submitting}>
				{#if form?.bookingUnavailable}
					<div role="alert" class="p-4 rounded-lg bg-secondary-container text-on-secondary-container mb-6">
						La réservation en ligne est momentanément indisponible. Envoyez un message au
						<a class="font-semibold underline" href="sms:+33786002486">{site.phoneDisplay}</a>.
					</div>
				{/if}
				<input type="hidden" name="slotId" value={selectedSlotId ?? ''} />
				<input type="hidden" name="sessionType" value={selectedType} />
				<input type="hidden" name="format" value={selectedFormat} />
				{#if form?.errors?.slotId}
					<p role="alert" class="text-error text-sm mb-4">{form.errors.slotId}</p>
				{/if}

				<div class="grid grid-cols-2 gap-4 mb-6">
					<div>
						<label class="text-xs font-bold text-on-surface-variant uppercase tracking-wider" for="firstName">Prénom</label>
						<input id="firstName" name="firstName" value={form?.values?.firstName ?? ''} class="w-full bg-surface border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/20" type="text" autocomplete="given-name" required />
						{#if form?.errors?.firstName}<p role="alert" class="text-error text-sm mt-1">{form.errors.firstName}</p>{/if}
					</div>
					<div>
						<label class="text-xs font-bold text-on-surface-variant uppercase tracking-wider" for="lastName">Nom</label>
						<input id="lastName" name="lastName" value={form?.values?.lastName ?? ''} class="w-full bg-surface border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/20" type="text" autocomplete="family-name" required />
						{#if form?.errors?.lastName}<p role="alert" class="text-error text-sm mt-1">{form.errors.lastName}</p>{/if}
					</div>
				</div>

				<div class="mb-6">
					<label class="text-xs font-bold text-on-surface-variant uppercase tracking-wider" for="email">Email</label>
					<input id="email" name="email" value={form?.values?.email ?? ''} class="w-full bg-surface border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/20" type="email" autocomplete="email" required />
					{#if form?.errors?.email}<p role="alert" class="text-error text-sm mt-1">{form.errors.email}</p>{/if}
				</div>

				<div class="mb-6">
					<label class="text-xs font-bold text-on-surface-variant uppercase tracking-wider" for="phone">Téléphone</label>
					<input id="phone" name="phone" value={form?.values?.phone ?? ''} class="w-full bg-surface border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/20" type="tel" autocomplete="tel" required />
					{#if form?.errors?.phone}<p role="alert" class="text-error text-sm mt-1">{form.errors.phone}</p>{/if}
				</div>

				<div class="mb-6">
					<label class="text-xs font-bold text-on-surface-variant uppercase tracking-wider" for="message">Message ou besoins spécifiques (Optionnel)</label>
					<textarea id="message" name="message" class="w-full bg-surface border-none rounded-lg p-3 focus:ring-2 focus:ring-primary/20" rows="3">{form?.values?.message ?? ''}</textarea>
				</div>

				<button class="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-md text-headline-md hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait" type="submit" disabled={submitting}>
					{submitting ? 'Confirmation en cours…' : 'Confirmer le rendez-vous'}
				</button>
			</form>
		{/if}
	</div>
</section>
{/if}
