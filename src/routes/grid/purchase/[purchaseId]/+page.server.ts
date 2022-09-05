import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { prisma } }) => {
	const purchase = await prisma.purchase.findUniqueOrThrow({
		where: { id: Number(params.purchaseId) },
    include: { pixels: { select: { id: true }} }
	});
	return { purchase };
};
