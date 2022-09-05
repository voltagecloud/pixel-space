import { gridSize } from '$lib/constants';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';

export const load: PageServerLoad = () => {
	throw redirect(301, '/grid');
};

export const POST: Action = async ({ locals: { prisma }, request }) => {
	const data = await request.formData();
	const color = String(data.get('color')).substring(0, 7);

  const connect = data
		.getAll('pixel')
		.map(Number)
		.filter((id) => id < gridSize)
    .map((id) => ({ id }));

	const purchase = await prisma.purchase.create({
		data: { color, pixels: { connect } }
	});

	return {
		location: `/grid/purchase/${purchase.id}`
	};
};
