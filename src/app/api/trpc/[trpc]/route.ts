import { appRouter } from "@/server";
import { createTRPCContext } from "@/server/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError(opts) {
      const { error, type, path, input, ctx, req } = opts;
      console.error("Error:", error);
      if (error.code === "INTERNAL_SERVER_ERROR") {
        // send to bug reporting
      }
    },
  });

export { handler as GET, handler as POST };
