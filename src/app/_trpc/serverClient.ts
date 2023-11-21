import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server";
import superjson from "superjson";
export const serverClient = appRouter.createCaller({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_BASE_URL + "/api/trpc",
    }),
  ],
});
