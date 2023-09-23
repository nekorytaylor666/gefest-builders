import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.create({
    data: {
      fullName: "admin",
      email: "admin@example.com",
      phoneNumber: "1234567890",
      updatedAt: new Date(),
      createdAt: new Date(),
      role: UserRole.ADMIN,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      fullName: "alice",
      email: "alice@example.com",
      phoneNumber: "1234567890",
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  });

  const course = await prisma.course.create({
    data: {
      authorId: adminUser.id,
      lessons: {
        create: [
          {
            creatorId: adminUser.id,
            title: "lesson1",
            mdxContentPath: "lesson1.mdx",
            order: 1,
          },
          {
            creatorId: adminUser.id,
            title: "lesson1",
            mdxContentPath: "lesson1.mdx",
            order: 2,
          },
        ],
      },
      title: "course1",
      description: "course1 description",
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
