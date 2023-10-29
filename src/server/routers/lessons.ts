import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const lessonsRouter = t.router({
  listLessons: publicProcedure.query(async () => {
    return await db.lesson.findMany();
  }),
  getLessonsByCourseId: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await db.lesson.findMany({
        where: { courseId: input },
        include: {
          lessonProgress: true,
        },
      });
    }),
});
