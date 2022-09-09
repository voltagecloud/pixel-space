export async function postJson<T>(url: string, data: unknown) {
	const res = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	});
	if (!res.ok) {
		throw await res.json().then(
			({ message }) => message,
			() => 'postJson failed'
		);
	}
	return res.json() as Promise<T>;
}
