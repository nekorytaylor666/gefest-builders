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
          review: true,
          homework: true,
        },
      });
    }),
  getSubmissionById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await db.submission.findUnique({
        where: { id: input },
        include: {
          user: true,
          review: true,
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
          review: true,
        },
      });
    }),
  deleteSubmission: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const submission = await db.submission.findUnique({
        where: { id: input },
        include: {
          review: true,
        },
      });
      if (submission?.review) {
        throw new Error("Submission is already graded");
      }
      return await db.submission.delete({
        where: { id: input },
      });
    }),
});
