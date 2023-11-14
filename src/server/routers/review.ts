import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";
import { ReviewType } from "@prisma/client";

export const reviewRouter = t.router({
  createReview: publicProcedure
    .input(
      z.object({
        submissionId: z.number(),
        userId: z.string(),
        type: z.nativeEnum(ReviewType),
        comment: z.string().optional(),
        mark: z.number().optional(),
      })
    )
    .mutation(
      async ({ input: { submissionId, userId, type, comment, mark } }) => {
        return db.review.create({
          data: {
            submissionId,
            userId,
            type,
            comment,
            mark,
          },
        });
      }
    ),

  getReviewForSubmission: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return db.review.findUnique({
        where: {
          submissionId: input,
        },
      });
    }),
  removeReviewFromSubmission: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const submission = await db.submission.findUnique({
        where: { id: input },
        include: {
          review: true,
        },
      });
      if (!submission?.review) {
        throw new Error("Submission is not reviewed");
      }
      return await db.review.delete({
        where: { id: submission.review.id },
      });
    }),
});
