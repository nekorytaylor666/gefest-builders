import {
  createClientComponentClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { type inferAsyncReturnType, initTRPC } from "@trpc/server";
import { error } from "console";
import { cookies } from "next/headers";

import superjson from "superjson";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log(error);
  }
  return {
    session: data.session,
    ...opts,
  };
};

export const t = initTRPC
  .context<typeof createTRPCContext>()
  .create({ transformer: superjson });
export const router = t.router;

export const publicProcedure = t.procedure;
