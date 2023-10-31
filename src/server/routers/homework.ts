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
});
