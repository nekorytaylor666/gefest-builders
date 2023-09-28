import { publicProcedure, router } from "./trpc";
import { coursesRouter } from "./routers/courses";
import { lessonsRouter } from "./routers/lessons";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { userRouter } from "./routers/user";
import { progressRouter } from "./routers/progress";

export const appRouter = router({
  courses: coursesRouter,
  lessons: lessonsRouter,
  user: userRouter,
  progress: progressRouter,
});

export type AppRouter = typeof appRouter;

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;