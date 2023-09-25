import { publicProcedure, router } from "./trpc";
import { coursesRouter } from "./routers/courses";
import { lessonsRouter } from "./routers/lessons";

export const appRouter = router({
  courses: coursesRouter,
  lessons: lessonsRouter,
});

export type AppRouter = typeof appRouter;
