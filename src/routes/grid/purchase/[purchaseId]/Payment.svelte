<script lang="ts">
	import { minChargePerPixel } from '$lib/constants';
	import { createEventDispatcher } from 'svelte';

	interface $$Events {
		paid: CustomEvent<string>;
	}

	export let purchaseId: string;
	export let pixelCount: number;

	const minimum = pixelCount * minChargePerPixel;
	const maximum = Math.min(minimum * 100, 16777215);

	let amount = minimum * 2;
	let hash: string | null = null;

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		console.log(amount, purchaseId);

    if (hash) {
      dispatch('paid', hash);
    }
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 items-start">
	<label class="flex items-center gap-2">
		<span>Payment amount:</span>
		<input type="range" min={minimum} max={maximum} bind:value={amount} />
		<span>{amount.toLocaleString()} sats</span>
	</label>
	<button type="submit">Get invoice</button>
</form>
