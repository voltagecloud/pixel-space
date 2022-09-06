<script lang="ts">
	import { minChargePerPixel } from '$lib/constants';
	import QrCode from '$lib/QrCode.svelte';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import type { LnInvoice } from './lnbits.server';

	interface $$Events {
		paid: CustomEvent<string>;
	}

	export let purchaseId: string;
	export let pixelCount: number;

	const minimum = pixelCount * minChargePerPixel;
	const maximum = Math.min(minimum * 100, 16777215);

	let amount = minimum * 2;
	let invoice: Promise<LnInvoice> | null = null;

	const dispatch = createEventDispatcher();

	function postJson<T>(url: string, data: unknown) {
		return fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' }
		}).then((res) => res.json() as T);
	}

	let timeout: NodeJS.Timeout;

	function getInvoice() {
		invoice = postJson<LnInvoice>('/payment/create', { purchaseId, amount });
		timeout = setTimeout(checkPayment, 1);
	}

	let checking = false;

	async function checkPayment() {
		if (!invoice) return getInvoice();
		const { payment_hash: hash } = await invoice;
		checking = true;
		const { paid } = await postJson<{ paid: boolean }>(`/payment/check`, { hash });
		checking = false;
		if (paid) {
			dispatch('paid', hash);
		} else {
			timeout = setTimeout(checkPayment, 5000);
		}
	}

	onDestroy(() => clearTimeout(timeout));
</script>

{#if invoice}
	{#await invoice}
		<p>Loading invoice...</p>
	{:then lni}
		{#if checking}
			<p>Checking for payment...</p>
		{:else}
			<p>Please pay the invoice!</p>
		{/if}
		<div class="max-w-sm">
			<QrCode value={lni.payment_request} />
		</div>
	{:catch error}
		<p class="text-red-600">{error}</p>
	{/await}
{:else}
	<form on:submit|preventDefault={getInvoice} class="flex flex-col gap-4 items-start">
		<label class="flex items-center gap-2">
			<span>Payment amount:</span>
			<input type="range" min={minimum} max={maximum} bind:value={amount} />
			<span>{amount.toLocaleString()} sats</span>
		</label>
		<button type="submit">Get invoice</button>
	</form>
{/if}
