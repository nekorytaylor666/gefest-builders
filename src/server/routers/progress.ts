import { db } from "@/lib/db";
import { z } from "zod";
import { t, publicProcedure } from "../trpc";

export const progressRouter = t.router({
  markLessonAsCompleted: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        lessonId: z.string(),
        courseId: z.string(),
      })
    )
    .mutation(async ({ input: { userId, lessonId, courseId } }) => {
      const existingProgress = await db.lessonProgress.findFirst({
        where: {
          userId,
          lessonId: Number(lessonId),
          courseId: Number(courseId),
        },
      });

      if (!existingProgress) {
        return await db.lessonProgress.create({
          data: {
            userId,
            lessonId: Number(lessonId),
            courseId: Number(courseId),
            completed: true,
          },
        });
      }
    }),
  getProgressOfCourseByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.number(),
      })
    )
    .query(async ({ input: { userId, courseId } }) => {
      return await db.lessonProgress.findMany({
        where: {
          userId: userId,
          courseId: courseId,
        },
      });
    }),
});
