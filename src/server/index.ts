import { publicProcedure, router } from "./trpc";
import { coursesRouter } from "./routers/courses";
import { lessonsRouter } from "./routers/lessons";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { userRouter } from "./routers/user";
import { progressRouter } from "./routers/progress";
import { homeworkRouter } from "./routers/homework";
import { submissionsRouter } from "./routers/submissions";
import { reviewRouter } from "./routers/review";
import { studentsRouter } from "./routers/students";
import { cohortRouter } from "./routers/cohorts";

export const appRouter = router({
  courses: coursesRouter,
  lessons: lessonsRouter,
  user: userRouter,
  progress: progressRouter,
  homework: homeworkRouter,
  review: reviewRouter,
  students: studentsRouter,
  cohorts: cohortRouter,
  submissions: submissionsRouter,
});

export type AppRouter = typeof appRouter;

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
