import { checkInvoice } from '$lib/lnbits.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { prisma } }) => {
	const input = await request.json();
	const { hash } = input as { hash: string; };

	let payment = await prisma.payment.findUnique({ where: { hash } });

	if (payment && !payment.paid) {
		const { paid } = await checkInvoice(payment.hash);
		if (paid) {
      payment = await prisma.payment.update({
        where: { id: payment.id },
        data: { paid }
      });
		}
	}

	return json({ paid: payment?.paid });
};
