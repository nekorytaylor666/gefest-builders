import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const coursesRouter = t.router({
  listCourses: publicProcedure.query(async () => {
    return await db.course.findMany({
      include: {
        lessons: true,
      },
    });
  }),
  createCourse: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        thumbnailPath: z.string().optional(),
        authorId: z.number(),
        slug: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.course.create({
        data: input,
      });
    }),
  getCourseById: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await db.course.findUnique({
      where: { id: input },
    });
  }),
  getCourseBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.course.findUnique({
        where: { slug: input },
        include: {
          lessons: true,
          author: true,
        },
      });
    }),
  getCourseLessonsBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.course.findUnique({
        where: { slug: input },
      });
    }),
});
