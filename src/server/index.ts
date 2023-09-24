import { publicProcedure, router } from "./trpc";
import { coursesRouter } from "./routers/courses";

export const appRouter = router({
  courses: coursesRouter,
});

export type AppRouter = typeof appRouter;
