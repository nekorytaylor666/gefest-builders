import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const cohortRouter = t.router({
  list: publicProcedure.query(async () => {
    return await db.cohort.findMany();
  }),
});
