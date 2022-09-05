import { checkInvoice } from '$lib/lnbits.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals: { prisma } }) => {
	const payment = await prisma.payment.findUnique({ where: { hash: params.hash } });

	if (payment && !payment.paid) {
		const check = await checkInvoice(payment.hash);
		if (check.paid) {
      payment.paid = true;
      prisma.payment.update({
        where: { id: payment.id },
        data: { paid: true }
      });
		}
	}

	return json({ payment });
};
