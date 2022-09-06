<script lang="ts">
	import { page } from '$app/stores';

	import PixelGrid from '$lib/PixelGrid.svelte';
	import type { PageData } from './$types';
	import Controls from './Controls.svelte';

	export let data: PageData;
	const { pixelColors, size } = data;

	let drawColor = $page.url.hash || '#ff5500';
	let drawCount = 0;
</script>

<form
	class="lg:absolute lg:inset-0 flex flex-col lg:flex-row"
	action="/purchase"
	method="post"
>
	<section class="flex-1 flex flex-col pb-4 lg:p-4 overflow-auto">
		<div class="flex-1 flex justify-center items-start">
			<PixelGrid
				{size}
				{drawColor}
				{pixelColors}
				on:change={({ detail }) => (drawCount = detail.length)}
			/>
		</div>
	</section>
	<aside class="border-t lg:border-t-0 lg:border-l pt-4 lg:p-4 lg:overflow-auto lg:basis-52">
		<Controls bind:drawColor {drawCount} />
	</aside>
</form>
