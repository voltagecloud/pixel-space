import { checkInvoice } from '$lib/lnbits.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals: { prisma } }) => {
	let payment = await prisma.payment.findUnique({ where: { hash: params.hash } });

	if (payment && !payment.paid) {
		const { paid } = await checkInvoice(payment.hash);
		if (paid) {
      payment = await prisma.payment.update({
        where: { id: payment.id },
        data: { paid }
      });
		}
	}

	return json({ payment });
};
