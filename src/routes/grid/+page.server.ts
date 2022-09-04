import type { PageServerLoad } from './$types';

const gridSize = 6000;

export const load: PageServerLoad = async ({ request, locals: { prisma } }) => {
	const pixels = await prisma.pixel.findMany({ take: gridSize });
	const { searchParams } = new URL(request.url);
  return {
		size: gridSize,
		drawColor: `#${searchParams.get('color') || 'ff5000'}`,
		pixelColors: pixels.reduce(
			(prev, val) => ({
				...prev,
				[val.id]: val.color
			}),
			{}
		)
	};
};
