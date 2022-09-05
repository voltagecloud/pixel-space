import { PrismaClient } from '@prisma/client';
import { gridSize } from '../src/lib/constants.js';

const prisma = new PrismaClient();

for (let id = 0; id < gridSize; id++) {
	await prisma.pixel.upsert({ where: { id }, create: { id }, update: { } });
}
