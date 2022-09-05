import type { Purchase } from '@prisma/client';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';

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

export const POST: Action = async ({ params, locals: { prisma } }) => {
	const purchase = await prisma.purchase.update({
		where: { id: params.purchaseId },
		data: { complete: true },
		include: { pixels: { select: { id: true } } }
	});

	await prisma.pixel.updateMany({
		where: { id: { in: purchase.pixels.map((p) => p.id) } },
		data: { color: purchase.color }
	});

	return {
		location: `/grid#${purchase.color.substring(1)}`
	};
};
