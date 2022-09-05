<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { purchase, pixelCount } = data;
</script>

<p class="text-4xl">
	Color <strong>{pixelCount} pixels</strong> with <code>{purchase.color}</code>...
</p>

<form class="my-4 flex gap-4 items-center" method="post">
	<button type="submit">Yes, do it</button>
	<span>or</span>
	<a href={`/grid${purchase.color}`}>Cancel</a>
</form>
