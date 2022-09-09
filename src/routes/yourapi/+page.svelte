<h1 class="text-4xl">Use your own JSON API</h1>

<p>It should conform to the following spec...</p>

<ul class="list-outside list-disc pl-4">
	<li>
		<h2>GET /grid</h2>
		<p>Sample Response:</p>
		<pre>{JSON.stringify({ rows: 10, cols: 10, pixels: { 1: '#aabbcc' } })}</pre>
	</li>
	<li>
		<h2>POST /purchase</h2>
		<p>Sample Payload:</p>
		<pre>{JSON.stringify({ pixels: [1, 2, 3], color: '#aabbcc' })}</pre>

		<p>Sample Response:</p>
		<pre>{JSON.stringify({ purchaseId: '123-456-789' })}</pre>
	</li>
	<li>
		<h2>POST /payment/create</h2>
		<p>Sample Payload:</p>
		<pre>{JSON.stringify({ purchaseId: '123-456-789', amount: 150 })}</pre>

		<p>Sample Response:</p>
		<pre>{JSON.stringify({ hash: 'abcd…', request: 'lnbc…' })}</pre>
	</li>
	<li>
		<h2>POST /payment/check</h2>
		<p>Sample Payload:</p>
		<pre>{JSON.stringify({ hash: 'abcd…' })}</pre>

		<p>Sample Response:</p>
		<pre>{JSON.stringify({ paid: false })}</pre>
	</li>
</ul>

<style lang="postcss">
	li {
		@apply my-8;
	}
	li > h2 {
		@apply font-mono font-bold;
	}
	li > p {
		@apply text-xs text-gray-400 mt-2;
	}
	pre {
		@apply border rounded p-1 inline-block;
	}
</style>
