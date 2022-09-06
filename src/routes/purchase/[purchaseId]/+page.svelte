<script lang="ts">
	import { tick } from 'svelte';

	import type { PageData } from './$types';
	import Payment from '$lib/Payment.svelte';

	export let data: PageData;

	const { purchase, pixelCount } = data;

	let form: HTMLFormElement;
	let paymentHash = '';

	async function handlePaid({ detail }: CustomEvent<string>) {
		paymentHash = detail;
		await tick();
		form.submit();
	}
</script>

<p class="text-4xl">
	Color <strong class="font-mono">{pixelCount}</strong> pixels
	<span class="inline-flex items-baseline gap-2">
		<span
			class="w-6 h-6 inline-block border rounded"
			style={`background-color: ${purchase.color}`}
		/>
		<code>{purchase.color}</code>
	</span>
</p>

<form method="post" bind:this={form} class="my-4">
	<input type="hidden" name="paymentHash" value={paymentHash} />
</form>

{#if paymentHash}
	<p>Processing your purchase...</p>
{:else}
	<Payment purchaseId={purchase.id} {pixelCount} on:paid={handlePaid} />
	<p class="mt-4">
		<a href={`/grid${purchase.color}`}>Cancel purchase</a>
	</p>
{/if}
