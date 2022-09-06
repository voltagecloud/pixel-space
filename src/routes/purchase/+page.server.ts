import { gridSize } from '$lib/constants';
import type { Action } from './$types';

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
		location: `/purchase/${purchase.id}`
	};
};
