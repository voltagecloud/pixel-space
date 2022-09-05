import { minChargePerPixel } from '$lib/constants';
import { createInvoice } from '$lib/lnbits.server';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { prisma } }) => {
	const input = await request.json();
	const { purchaseId, amount } = input as { purchaseId: string; amount: number };

	const purchase = await prisma.purchase.findUniqueOrThrow({
		where: { id: purchaseId }
	});

	if (purchase.complete) {
		throw error(400, 'Purchase already complete');
	}

	const pixelCount = await prisma.pixel.count({
		where: { purchases: { some: { id: purchaseId } } }
	});

	if (amount < pixelCount * minChargePerPixel) {
		throw error(402, `${amount} is less than ${minChargePerPixel} per pixel`);
	}

	// create a new payment for the given purchase
  const memo = `${purchase.color} x${pixelCount}`;
	const invoice = await createInvoice({ amount, memo });

	await prisma.payment.create({
		data: { amount, purchaseId, hash: invoice.payment_hash }
	});

	return json(invoice);
};
