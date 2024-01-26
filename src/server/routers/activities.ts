import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const activityRouter = t.router({
  add: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    console.log(user);
    return user;
  }),
});
