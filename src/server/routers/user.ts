import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const userRouter = t.router({
  getUserData: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await db.user.findUnique({
      where: { id: input },
      include: {
        courseProgress: {
          include: {
            course: true,
          },
        },
        lessonProgress: {
          include: {
            lesson: true,
          },
        },
      },
    });
  }),
  getUserCourseProgress: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await db.courseProgress.findMany({
        where: { userId: input },
      });
    }),
  getUserLessonProgress: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await db.lessonProgress.findMany({
        where: { userId: input },
      });
    }),
});
