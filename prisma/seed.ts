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
            mdxContentPath: "html-css/lessons/1/content.mdx",
            thumbnailPath: "html-css/lessons/1/lesson_thumbnail.png",
            order: 1,
          },
          {
            authorId: adminUser.id,
            title: "Структура программы",
            mdxContentPath: "html-css/lessons/2/content.mdx",
            thumbnailPath: "html-css/lessons/2/lesson_thumbnail.png",
            order: 2,
          },
          {
            authorId: adminUser.id,
            title: "Структура программы",
            mdxContentPath: "html-css/lessons/3/content.mdx",
            thumbnailPath: "html-css/lessons/3/lesson_thumbnail.png",
            order: 3,
          },
          {
            authorId: adminUser.id,
            title: "Структура программы",
            mdxContentPath: "html-css/lessons/4/content.mdx",
            thumbnailPath: "html-css/lessons/4/lesson_thumbnail.png",
            order: 4,
          },
          {
            authorId: adminUser.id,
            title: "Структура программы",
            mdxContentPath: "html-css/lessons/5/content.mdx",
            thumbnailPath: "html-css/lessons/5/lesson_thumbnail.png",
            order: 5,
          },
        ],
      },
      title: "HTML и CSS",
      slug: "html-css",
      thumbnailPath: "html-css/course_thumbnail.png",
      description: "Начнем ваш путь в IT с разработки сайтов на HTML и CSS.",
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
