<script lang="ts">
  import draw from "./draw";
</script>

<ul use:draw>
	{#each Array(480) as _, index}
		{@const id = `pixel-${index}`}
		<li>
			<input type="checkbox" {id} />
			<label for={id}>{index}</label>
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		@apply grid w-full select-none;
		gap: 3px;
		grid-template-columns: repeat(20, minmax(0, 1fr));
	}
	li {
		@apply flex border-dotted border;
	}
	label {
		@apply flex-1 cursor-pointer hover:ring;
		@apply pl-[1px] text-xs text-slate-300;
	}
	input:checked + label {
		@apply bg-orange-500;
	}
	input {
		@apply hidden;
	}
</style>
