<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import draw from './draw';

	export let pixelColors: Record<number, string> = {};
	export let drawColor: string = 'currentColor';
	export let size = 1e4;
	export let cols = 1e2;

	interface $$Events {
		change: CustomEvent<number[]>;
	}

	const dispatch = createEventDispatcher();

	function handleChange(evt: Event) {
		const form = evt.currentTarget as HTMLUListElement;
		const checked = form.querySelectorAll<HTMLInputElement>('input:checked');
		dispatch(
			'change',
			Array.from(checked).map((input) => Number(input.value))
		);
	}
</script>

<ul
	use:draw
	on:change={handleChange}
	style={`grid-template-columns: repeat(${cols}, minmax(0, 1fr)); --pixel-drawn: ${drawColor}`}
>
	{#each Array(size) as _, index}
		{@const id = `pixel-${index}`}
		{@const color = pixelColors[index]}
		<li title={color ? `${id} (${color})` : id} class:blank={!color}>
			<input type="checkbox" {id} name="pixel" value={index} />
			<label for={id} style={color && `--pixel-color: ${color}`} />
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		@apply grid select-none gap-px flex-1 w-full;
	}
	li {
		@apply flex aspect-square hover:ring-1;
	}
	label {
		@apply flex flex-1 cursor-pointer overflow-hidden;
		background-color: var(--pixel-color);
	}
	li.blank > label {
		@apply border;
	}
	input:checked + label {
		border: none;
		background-color: var(--pixel-drawn);
	}
	input {
		@apply hidden;
	}
</style>
