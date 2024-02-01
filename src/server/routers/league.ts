import { db } from "@/lib/db";
import { publicProcedure, t } from "../trpc";

export const leagueRouter = t.router({
  current: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    const userId = user?.id;
    const userWithLeague = await db.user.findFirst({
      where: { id: userId },
      include: { league: true },
    });

    return userWithLeague?.league;
  }),
});
