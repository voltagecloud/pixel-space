<script lang="ts">
	import { browser } from '$app/environment';

	export let drawColor: string;
	export let drawn: number[];

	$: if (browser) {
		location.hash = drawColor.substring(1);
	}
</script>

{#if browser}
<div class="sm:flex items-center justify-between lg:block">
	<label class="inline-flex items-center gap-2">
		<input type="color" name="color" bind:value={drawColor} />
		<code>{drawColor}</code>
	</label>

	<p class="my-4">
		<strong class="font-mono align-middle">
			{drawn.length} pixels drawn
		</strong>
		<button type="submit" disabled={!drawn.length}>Submit</button>
	</p>
</div>
{/if}
