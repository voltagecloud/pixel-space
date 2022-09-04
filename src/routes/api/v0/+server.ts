import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { prisma } }) => {
  const pixels = await prisma.pixel.findMany();
  return json({ pixels });
};
