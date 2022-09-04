import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';

export const load: PageServerLoad = () => {
  throw redirect(301, '/grid');
};

export const POST: Action = async ({ locals: { prisma }, request }) => {
  const data = await request.formData();
  const color = String(data.get('color')).substring(0, 7);
  const checked = data.getAll('pixel').map(Number);
  console.log({ checked, color });

  for (const id of checked) {
    await prisma.pixel.upsert({
      where: { id },
      create: { id, color },
      update: { color }
    })    
  }

  return {
    location: `/grid?color=${color.substring(1)}`
  }
};
