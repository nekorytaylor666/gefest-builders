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

  listReviewForSubmission: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return db.review.findMany({
        where: {
          submissionId: input,
        },
      });
    }),
});
