<script lang="ts">
	import { qrcanvas } from 'qrcanvas';

	export let value: unknown;

	let container: HTMLDivElement;

	$: container && updateQrCode(String(value));

	function updateQrCode(data: string) {
		container.innerHTML = '';
		container.appendChild(qrcanvas({ data, effect: { type: "round" } }));
	}
</script>

<figure class="flex flex-col my-4 border rounded shadow-md">
	<div class="border-b p-4 flex overflow-hidden" bind:this={container} />
	<figcaption class="p-4 break-words font-mono text-xs">{value}</figcaption>
</figure>

<style lang="postcss">
	div > :global(canvas) {
		flex: 1;
	}
</style>