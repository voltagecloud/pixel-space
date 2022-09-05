// server side only! we don't want to leak invoiceKey
import { LNBITS_ORIGIN, LNBITS_INVOICE_KEY } from '$env/static/private';

if (!LNBITS_ORIGIN || !LNBITS_INVOICE_KEY) {
	throw new Error('LNBITS environment is missing');
}

export default async function (
	method: 'GET' | 'POST',
	path: string,
	params: Record<string, unknown> = {}
) {
	const result = await fetch(`${LNBITS_ORIGIN}${path}`, {
		method,
		body: method !== 'GET' ? JSON.stringify(params) : undefined,
		headers: { 'X-Api-Key': LNBITS_INVOICE_KEY }
	});

	return result.json();
}
