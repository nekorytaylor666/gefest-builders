import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const userRouter = t.router({
  getUserByExternalId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.user.findUnique({
        where: { externalSourceUserId: input },
      });
    }),
  getUserData: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.user.findUnique({
      where: { id: input },
    });
  }),
  getUserLessonProgress: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.lessonProgress.findMany({
        where: { userId: input },
      });
    }),
});
