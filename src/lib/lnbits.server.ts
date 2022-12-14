// server side only! we don't want to leak invoiceKey
import { env } from '$env/dynamic/private';

async function lnbits<T>(
	method: 'GET' | 'POST',
	path: string,
	params: Record<string, unknown> = {}
) {
	if (!env.LNBITS_ORIGIN || !env.LNBITS_INVOICE_KEY) {
		throw new Error('LNBITS environment is missing');
	}

	const result = await fetch(`${env.LNBITS_ORIGIN}${path}`, {
		method,
		body: method !== 'GET' ? JSON.stringify(params) : undefined,
		headers: { 'X-Api-Key': env.LNBITS_INVOICE_KEY, 'Content-Type': 'application/json' }
	});

	if (!result.ok) {
		throw new Error(result.statusText);
	}
	return result.json() as Promise<T>;
}

export type LnInvoice = {
	payment_hash: string;
	payment_request: string;
};

export function createInvoice(params: {
	amount: number;
	memo?: string;
	unit?: string;
	webhook?: string;
}) {
	return lnbits<LnInvoice>('POST', '/api/v1/payments', { ...params, out: false });
}

export function checkInvoice(paymentHash: string) {
	return lnbits<{ paid: boolean }>('GET', `/api/v1/payments/${paymentHash}`);
}

export default lnbits;
