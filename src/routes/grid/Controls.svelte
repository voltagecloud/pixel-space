<script lang="ts">
	import { browser } from '$app/environment';

	export let drawColor: string;
	export let drawn: number[];

	$: if (browser) {
		location.hash = drawColor.substring(1);
	}
</script>

{#if browser}
	<label class="inline-flex items-center gap-2">
		<input type="color" name="color" bind:value={drawColor} />
		<code>{drawColor}</code>
	</label>

	<p class="my-4 font-mono text-5xl">
		{drawn.length}
	</p>

	<button class="bg-blue-400" type="submit" disabled={!drawn.length}>Submit</button>
{/if}
