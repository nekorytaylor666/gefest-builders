import {
  createClientComponentClient,
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { type inferAsyncReturnType, initTRPC } from "@trpc/server";
import { error } from "console";
import { cookies, headers } from "next/headers";

import superjson from "superjson";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  const supabase = createServerComponentClient({
    cookies,
  });
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log(error);
  }
  return {
    session: data.session,
    headers: heads,
  };
};

export const t = initTRPC
  .context<typeof createTRPCContext>()
  .create({ transformer: superjson });
export const router = t.router;

export const publicProcedure = t.procedure;
