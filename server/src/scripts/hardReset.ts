import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hardReset() {
  console.log('Starting database hard reset...');
  
  // Delete all data in safe order (child tables first)
  await prisma.draft.deleteMany();
  await prisma.entry.deleteMany();
  await prisma.user.deleteMany();

  // Optional: Seed initial admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
    }
  });

  console.log('Hard reset complete!');
  await prisma.$disconnect();
}

hardReset().catch(e => {
  console.error('Reset failed:', e);
  process.exit(1);
});
