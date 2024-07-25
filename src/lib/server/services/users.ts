// src/lib/services/users.ts
import { prisma } from '$lib/server/config/prisma';

export const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};
