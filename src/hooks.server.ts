import { PrismaClient } from '@prisma/client';
import type { Handle } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const handle: Handle = function ({ event, resolve }) {
	event.locals = { prisma };
	return resolve(event);
};
