import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { db } from "@/lib/db";

export const studentsRouter = t.router({
  getTotalNumberOfStudents: publicProcedure.query(async () => {
    const totalStudents = await db.user.count({
      where: { role: "USER" },
    });
    return totalStudents;
  }),
  list: publicProcedure
    .input(
      z.object({
        skip: z.number().optional(),
        take: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const { skip = 0, take = 10 } = input;
      const students = await db.user.findMany({
        where: { role: "USER" },
        skip,
        take,

        include: {
          userCohorts: {
            include: {
              cohort: true,
            },
          },
        },
      });
      return students;
    }),
  edit: publicProcedure
    .input(
      z.object({
        studentId: z.string(),
        data: z.object({
          name: z.string().optional(),
          email: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      return await db.user.update({
        where: { id: input.studentId },
        data: input.data,
      });
    }),
  addCohort: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        cohortId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, cohortId } = input;

      const existingUserCohort = await db.userCohort.findUnique({
        where: { userId_cohortId: { userId, cohortId } },
      });

      if (existingUserCohort) {
        throw new Error("User is already part of this cohort");
      }

      const userCohort = await db.userCohort.create({
        data: { userId, cohortId },
      });

      return userCohort;
    }),
  deleteCohort: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        cohortId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, cohortId } = input;

      const userCohort = await db.userCohort.findUnique({
        where: { userId_cohortId: { userId, cohortId } },
      });

      if (!userCohort) {
        throw new Error("User is not part of this cohort");
      }

      return await db.userCohort.delete({
        where: { userId_cohortId: { userId, cohortId } },
      });
    }),
});
