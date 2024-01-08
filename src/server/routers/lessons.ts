import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const lessonsRouter = t.router({
  listLessons: publicProcedure.query(async () => {
    return await db.lesson.findMany();
  }),
  getLessonsByCourseId: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await db.lesson.findMany({
        where: { courseId: input },
        include: {
          lessonProgress: true,
        },
      });
    }),
  getLessonById: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await db.lesson.findUnique({
      where: { id: input },
    });
  }),
  getLessonByCourseIdAndLessonId: publicProcedure
    .input(
      z.object({
        courseId: z.number(),
        lessonId: z.number(),
      })
    )
    .query(async ({ input }) => {
      return await db.lesson.findUnique({
        where: { id: input.lessonId, courseId: input.courseId },
        include: {
          course: true,
        },
      });
    }),
  editLessonByLessonId: publicProcedure
    .input(
      z.object({
        lessonId: z.number(),
        data: z.object({
          title: z.string().optional(),
          mdxContentPath: z.string().optional(),
          courseId: z.number().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      return await db.lesson.update({
        where: { id: input.lessonId },
        data: input.data,
      });
    }),
  editLessonContent: publicProcedure
    .input(
      z.object({
        lessonId: z.number(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.lesson.update({
        where: { id: input.lessonId },
        data: { jsonContent: input.content },
      });
    }),
  createLesson: publicProcedure
    .input(
      z.object({
        title: z.string(),
        courseId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const lessonCount = await db.lesson.count({
        where: { courseId: input.courseId },
      });
      return await db.lesson.create({
        data: {
          title: input.title,
          authorId: "1",
          order: lessonCount + 1,
          courseId: input.courseId,
        },
      });
    }),
  getLessonsComments: publicProcedure
    .input(
      z.object({
        lessonId: z.number(),
      })
    )
    .query(async ({ input }) => {
      return await db.comment.findMany({
        where: { lessonId: input.lessonId },
        include: {
          replies: {
            include: {
              user: true,
            },
          },
          reactions: {
            include: {
              user: true,
            },
          },
        },
      });
    }),
});
