import { PrismaClient } from '@prisma/client';
import { gridSize } from '../src/lib/constants.js';

const prisma = new PrismaClient({ log: ['query'] });

await Promise.all([
  prisma.pixel.deleteMany(),
  prisma.purchase.deleteMany()
]);

for (let i = 0; i < gridSize; i++) {
  await prisma.pixel.create({ data: { id: i }});
}
