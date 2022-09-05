import type { PageServerLoad, Action } from './$types';

export const load: PageServerLoad = async ({ params, locals: { prisma } }) => {
	const purchase = await prisma.purchase.findUniqueOrThrow({
		where: { id: Number(params.purchaseId) },
    include: { pixels: { select: { id: true }} }
	});
	return { purchase };
};

export const POST: Action = async ({ params, locals: { prisma } }) => {
	const purchase = await prisma.purchase.update({
		where: { id: Number(params.purchaseId) },
		data: { complete: true },
    include: { pixels: { select: { id: true }} }
	});

	await prisma.pixel.updateMany({
		where: { id: { in: purchase.pixels.map(p => p.id) }},
		data: { color: purchase.color }
	});

	return {
		location: `/grid#${purchase.color.substring(1)}`
	}
};
