import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";
import { UserRole, app_role } from "@prisma/client";

export const userRouter = t.router({
  getUserByExternalId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.user.findUnique({
        where: { externalSourceUserId: input },
      });
    }),
  getUserData: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.user.findUnique({
      where: { id: input },
    });
  }),
  getUserLessonProgress: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.lessonProgress.findMany({
        where: { userId: input },
      });
    }),
  buyPremium: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Assuming there's a "premium" field on the User model to update
      const userRole = await db.user_roles.findFirst({
        where: { user_id: input.userId },
      });
      if (!userRole) {
        return await db.user_roles.create({
          data: { user_id: input.userId, role: app_role.moderator },
        });
      }
      const roleId = userRole?.id;

      const updatedUser = await db.user_roles.update({
        where: { id: roleId },
        data: { role: app_role.moderator },
      });

      return updatedUser;
    }),
});
