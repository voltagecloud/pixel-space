import { dev } from '$app/environment';
import type { Purchase } from '@prisma/client';
import { error, invalid, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals: { prisma } }) => {
	let purchase: Purchase;
	try {
		purchase = await prisma.purchase.findUniqueOrThrow({
			where: { id: params.purchaseId }
		});
	} catch (e) {
		throw error(404, String(e));
	}
	if (purchase.complete) {
		throw redirect(301, `/grid#${purchase.color.substring(1)}`);
	}
	const pixelCount = await prisma.pixel.count({
		where: { purchases: { some: { id: purchase.id } } }
	});

	return { purchase, pixelCount };
};

export const actions: Actions = {
	default: async ({ params, locals: { prisma }, request }) => {
		const data = await request.formData();
		const hash = String(data.get('paymentHash'));
	
		const purchase = await prisma.purchase.findUniqueOrThrow({
			where: { id: params.purchaseId }
		});
	
		const free = dev && !hash;
	
		if (!free) {
			const payment = await prisma.payment.findUniqueOrThrow({
				where: { hash }
			});
	
			if (payment.purchaseId !== purchase.id) {
				return invalid(400, { paymentHash: 'Invalid' });
			}
	
			if (!payment.paid) {
				return invalid(402, { paymentHash: 'Unpaid' });
			}
		}
	
		if (!purchase.complete) {
			const { pixels } = await prisma.purchase.update({
				where: { id: purchase.id },
				data: { complete: true },
				include: { pixels: { select: { id: true } } }
			});
			await prisma.pixel.updateMany({
				where: { id: { in: pixels.map((p) => p.id) } },
				data: { color: purchase.color }
			});
		}
	
		throw redirect(303, `/grid#${purchase.color.substring(1)}`);
	}
};
