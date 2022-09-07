import type { PageServerLoad } from './$types';
import { gridSize } from '$lib/constants';

export const load: PageServerLoad = async ({ locals: { prisma } }) => {
	const pixels = await prisma.pixel.findMany({ take: gridSize });
	return {
		size: gridSize,
		pixelColors: pixels.reduce(
			(prev, val) =>
				val.color
					? {
							...prev,
							[val.id]: val.color
					  }
					: prev,
			{}
		)
	};
};
