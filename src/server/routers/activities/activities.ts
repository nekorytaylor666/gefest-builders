import { z } from "zod";
import { t, publicProcedure } from "../../trpc";
import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";
import { findExistingActivity } from "./activityHelpers";

export const activityRouter = t.router({
  list: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    const userId = user?.id;

    return db.activity.findMany({
      where: { userId },
      include: { type: true },
    });
  }),
  add: publicProcedure
    .input(
      z.object({
        activityTypeName: z.nativeEnum($Enums.ActivityName),
        experience: z.number(),
        metadata: z.record(z.string(), z.any()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session?.user;

      if (!user) {
        throw new Error("You must be logged in to add an activity");
      }

      const existingActivity = await findExistingActivity(
        user.id,
        input.activityTypeName,
        input.metadata
      );

      if (existingActivity) {
        throw new Error(
          "Activity with the same metadata and user ID already exists"
        );
      }

      const activity = await db.activity.create({
        data: {
          userId: user.id,
          activityTypeName: input.activityTypeName,
          experience: input.experience,
          metadata: input.metadata,
        },
      });
      return activity;
    }),
});
