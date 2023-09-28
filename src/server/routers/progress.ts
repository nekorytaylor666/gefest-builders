import { db } from "@/lib/db";
import { z } from "zod";
import { t, publicProcedure } from "../trpc";

export const progressRouter = t.router({
  markLessonAsCompleted: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        lessonId: z.number(),
        courseId: z.number(),
      })
    )
    .mutation(async ({ input: { userId, lessonId, courseId } }) => {
      const existingProgress = await db.lessonProgress.findFirst({
        where: {
          userId,
          lessonId,
          courseId,
        },
      });

      if (!existingProgress) {
        return await db.lessonProgress.create({
          data: {
            userId,
            lessonId,
            courseId,
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
