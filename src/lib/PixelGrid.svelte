<script lang="ts">
  import draw from "./draw";
</script>

<ul use:draw>
	{#each Array(4080) as _, index}
		{@const id = `pixel-${index}`}
		<li title={id}>
			<input type="checkbox" {id} />
			<label for={id}>{index}</label>
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		@apply grid select-none gap-px w-full;
		grid-template-columns: repeat(80, minmax(0, 1fr));
	}
	li {
		@apply flex aspect-square;
	}
	label {
		@apply flex-1 border overflow-hidden cursor-pointer hover:ring;
		@apply pl-[1px] text-[3px] text-slate-300;
	}
	input:checked + label {
		@apply bg-orange-500;
	}
	input {
		@apply hidden;
	}
</style>
