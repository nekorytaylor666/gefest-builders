import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const lessonsRouter = t.router({
  listLessons: publicProcedure.query(async () => {
    return await db.lesson.findMany();
  }),
});
