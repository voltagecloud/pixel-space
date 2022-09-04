<script lang="ts">
	export let drawColor: string;
	export let drawn: number[];
</script>

<label class="inline-flex items-center gap-2">
	<input type="color" name="color" bind:value={drawColor} />
	<code>{drawColor}</code>
</label>

<p class="my-4 font-mono text-5xl">
	{drawn.length}
</p>

<button class="bg-blue-400" type="submit" disabled={!drawn.length}>Submit</button>
