<script lang="ts">
	import { browser } from '$app/environment';

	export let drawColor: string;
	export let drawCount: number;

	$: if (browser) {
		location.hash = drawColor.substring(1);
	}
</script>

{#if browser}
	<div class="sm:flex items-center justify-between lg:block">
		<label class="inline-flex items-center gap-2">
			<input
				type="text"
				name="color"
				bind:value={drawColor}
				class="w-24 invalid:bg-red-300"
				pattern={`^#[A-Fa-f0-9]{6}$`}
			/>
			<input type="color" bind:value={drawColor} class="h-12 w-16" />
		</label>

		<p class="my-4">
			<button type="submit" disabled={!drawCount}>Save</button>
			<span class="font-mono align-middle">
				<strong>{drawCount}</strong> pixels
			</span>
		</p>
	</div>
{/if}
