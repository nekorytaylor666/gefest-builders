const { PrismaClient, UserRole } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.create({
    data: {
      id: "1",
      fullName: "admin",
      email: "admin@example.com",
      phoneNumber: "1234567890",
      updatedAt: new Date(),
      createdAt: new Date(),
      role: UserRole.ADMIN,
    },
  });

  const course = await prisma.course.create({
    data: {
      authorId: adminUser.id,
      lessons: {
        create: [
          {
            authorId: adminUser.id,
            title: "Структура программы",
            mdxContentPath: "chatgpt-course/lessons/1/content.mdx",
            thumbnailPath: "chatgpt-course/lessons/1/lesson_thumbnail.png",
            order: 1,
          },
        ],
      },
      title: "Как работает ChatGPT на самом деле?",
      slug: "chatgpt-course",
      thumbnailPath: "chatgpt-course/course_thumbnail.png",
      description:
        "Этот курс расскажет вам о том, как работает ChatGPT на самом деле.",
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
