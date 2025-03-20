import { PrismaClient } from '@prisma/client';
import { seedTeachStudent } from './seed/seedTeachStudent';

const prisma = new PrismaClient();

async function main() {
  await seedTeachStudent(prisma);
}

main();
