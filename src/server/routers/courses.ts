import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

const findCourseById = async (id: number) => {
  return await db.course.findUnique({
    where: { id },
    include: {
      lessons: true,
      homeworks: true,
    },
  });
};

const findCourseBySlug = async (slug: string) => {
  return await db.course.findUnique({
    where: { slug },
    include: {
      lessons: true,
      homeworks: true,
    },
  });
};

export const coursesRouter = t.router({
  listCourses: publicProcedure.query(async () => {
    return await db.course.findMany();
  }),
  editCourse: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        thumbnailPath: z.string().optional(),
        authorId: z.string().optional(),
        disabled: z.boolean().optional(),
        slug: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.course.update({
        where: { id: input.id },
        data: input,
      });
    }),
  createCourse: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        authorId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.course.create({
        data: {
          title: input.title,
          description: input.description,
          authorId: input.authorId,
        },
      });
    }),
  getCourseById: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await findCourseById(input);
  }),
  getCourseBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await findCourseBySlug(input);
    }),
  getCourseDataWithUserProgress: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseSlug: z.string(),
      })
    )
    .query(async ({ input: { courseSlug, userId } }) => {
      const course = await db.course.findFirst({
        where: {
          slug: courseSlug,
        },
        include: {
          lessons: true,
        },
      });
      const lessons = await db.lesson.findMany({
        where: {
          courseId: course?.id,
        },
      });
      const lessonProgress = await db.lessonProgress.findMany({
        where: {
          userId: userId,
          courseId: course?.id,
          completed: true,
        },
      });
      const totalLessons = lessons.length;
      const completedLessons = lessonProgress.length;
      const courseProgress = (completedLessons / totalLessons) * 100;

      return {
        totalLessons,
        completedLessons,
        courseProgress,
        lessons,
        lessonProgress,
        course,
      };
    }),
  getCourseLessonsBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.course.findUnique({
        where: { slug: input },
      });
    }),
  getUserLessonProgress: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.number(),
      })
    )
    .query(async ({ input: { userId, courseId } }) => {
      const lessonProgress = await db.lessonProgress.findMany({
        where: {
          userId: userId,
          courseId: courseId,
          completed: true,
        },
      });

      return lessonProgress;
    }),
});
