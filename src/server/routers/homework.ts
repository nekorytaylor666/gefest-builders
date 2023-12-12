import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const homeworkRouter = t.router({
  listCourseHomeworks: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await db.homework.findMany({
        where: { courseId: input },
      });
    }),

  getHomeworkById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await db.homework.findUnique({
        where: { id: input },
      });
    }),
  getHomeworkByCourseIdAndHomeworkId: publicProcedure
    .input(
      z.object({
        courseId: z.number(),
        homeworkId: z.number(),
      })
    )
    .query(async ({ input }) => {
      return await db.homework.findFirst({
        where: { courseId: input.courseId, id: input.homeworkId },
        include: {
          course: true,
        },
      });
    }),
  editHomeworkSubmission: publicProcedure
    .input(
      z.object({
        homeworkId: z.number(),

        data: z.object({
          title: z.string().optional(),
          mdxContentPath: z.string().optional(),
          courseId: z.number().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      return await db.homework.update({
        where: { id: input.homeworkId },
        data: { mdxContentPath: input.data.mdxContentPath },
      });
    }),
  createHomework: publicProcedure
    .input(
      z.object({
        title: z.string(),
        courseId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const homeworkCount = await db.homework.count({
        where: { courseId: input.courseId },
      });
      return await db.homework.create({
        data: {
          order: homeworkCount + 1,
          courseId: input.courseId,
          title: input.title,
        },
      });
    }),
  editHomeworkContent: publicProcedure
    .input(
      z.object({
        homeworkId: z.number(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.homework.update({
        where: { id: input.homeworkId },
        data: { jsonContent: input.content },
      });
    }),
});
