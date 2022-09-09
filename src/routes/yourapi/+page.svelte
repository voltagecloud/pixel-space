<h1 class="text-4xl">Use your API</h1>

<ul class="list-outside list-disc pl-4">
	<li>
		<h2>GET /grid</h2>
		Response:
		<pre>{JSON.stringify({ rows: 10, cols: 10, pixels: { 1: '#aabbcc' } })}</pre>
	</li>
	<li>
		<h2>POST /purchase</h2>
		Payload:
		<pre>{JSON.stringify({ pixels: [1, 2, 3], color: '#aabbcc' })}</pre>

		Response:
		<pre>{JSON.stringify({ purchaseId: '123-456-789' })}</pre>
	</li>
	<li>
		<h2>POST /payment/create</h2>
		Payload:
		<pre>{JSON.stringify({ purchaseId: '123-456-789', amount: 150 })}</pre>

		Response:
		<pre>{JSON.stringify({ hash: '…', request: 'LNBC…' })}</pre>
	</li>
	<li>
		<h2>POST /payment/check</h2>
		Payload:
		<pre>{JSON.stringify({ hash: '…' })}</pre>

		Response:
		<pre>{JSON.stringify({ paid: false })}</pre>
	</li>
</ul>

<style lang="postcss">
	li {
		@apply my-4;
	}
	li > h2 {
		@apply font-mono font-bold;
	}
	pre {
		@apply border rounded p-1;
	}
</style>
