import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const submissionsRouter = t.router({
  listHomeworkSubmissions: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await db.submission.findMany({
        where: { homeworkId: input },
        include: {
          user: true,
          reviews: true,
          homework: true,
        },
      });
    }),
  getSubmissionOfUserByHomeWorkId: publicProcedure
    .input(
      z.object({
        homeworkId: z.number(),
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await db.submission.findFirst({
        where: {
          homeworkId: input.homeworkId,
          userId: input.userId,
        },
        include: {
          user: true,
          reviews: true,
        },
      });
    }),
});
