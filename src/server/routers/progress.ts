import { db } from "@/lib/db";
import { z } from "zod";
import { t, publicProcedure } from "../trpc";

export const progressRouter = t.router({
  markLessonAsCompleted: publicProcedure
    .input(
      z.object({
        lessonId: z.string(),
        courseId: z.string(),
      })
    )
    .mutation(async ({ input: { lessonId, courseId }, ctx }) => {
      const user = ctx.session?.user;
      if (!user) {
        throw new Error("You must be logged in to add an activity");
      }
      const existingProgress = await db.lessonProgress.findFirst({
        where: {
          userId: user.id,
          lessonId: Number(lessonId),
          courseId: Number(courseId),
        },
      });

      if (!existingProgress) {
        return await db.lessonProgress.create({
          data: {
            userId: user.id,
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
