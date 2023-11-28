import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const coursesRouter = t.router({
  listCourses: publicProcedure.query(async () => {
    return await db.course.findMany({
      include: {
        lessons: true,
      },
    });
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
        thumbnailPath: z.string().optional(),
        authorId: z.string(),
        slug: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.course.create({
        data: input,
      });
    }),
  getCourseById: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await db.course.findUnique({
      where: { id: input },
      include: {
        lessons: true,
        homeworks: true,
      },
    });
  }),
  getCourseBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.course.findUnique({
        where: { slug: input },
        include: {
          lessons: true,
          homeworks: true,
        },
      });
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
});
