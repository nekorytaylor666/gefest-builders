import { z } from "zod";
import { t, publicProcedure } from "../../trpc";
import { db } from "@/lib/db";
import { $Enums, Activity } from "@prisma/client";
import { findExistingActivity } from "./activityHelpers";
import { redis } from "@/lib/redis";
import {
  getTop10Scores,
  getUserPositionAndSurroundings,
  updateScore,
} from "./leaderbord/leaderbord";
import { TRPCError } from "@trpc/server";

function calculateLastStreak(groupedByDay: Record<string, Activity[]>) {
  let currentStreak = 0;

  const entries = Object.entries(groupedByDay);
  for (let index = 0; index < entries.length; index++) {
    const [key, value] = entries[index];
    if (value.length) {
      currentStreak++;
    } else {
      break;
    }
  }

  return currentStreak;
}
export const activityRouter = t.router({
  list: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    const userId = user?.id;

    return db.activity.findMany({
      where: { userId },
      include: { type: true },
    });
  }),
  getActivityStreakAndDetails: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    const userId = user?.id;
    const activities = await db.activity.findMany({
      where: { userId },
      select: { id: true, createdAt: true, activityTypeName: true },
    });

    // Создаем объект с ключами для последних 100 дней
    const last100Days: Record<string, any[]> = {};
    for (let i = 0; i < 100; i++) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      last100Days[day.toISOString().split("T")[0]] = [];
    }

    // Группируем активности по дням
    const groupedByDay = activities.reduce(
      (acc: Record<string, any[]>, activity) => {
        const day = activity.createdAt.toISOString().split("T")[0];
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(activity);
        return acc;
      },
      last100Days
    );

    const streak = calculateLastStreak(groupedByDay);
    return {
      streak,
      groupedByDay,
    };
  }),
  userRanking: publicProcedure.query(async ({ input, ctx }) => {
    const user = ctx.session?.user;
    if (!user) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: "You must be logged in to add an activity",
      });
    }
    const userId = user?.id;

    const scores = await getUserPositionAndSurroundings(userId);
    return scores;
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
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          // optional: pass the original error to retain stack trace
          cause: "You must be logged in to add an activity",
        });
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

      await updateScore(user.id, input.experience);
      return activity;
    }),
});
