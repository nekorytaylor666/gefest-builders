import { serverClient } from "@/app/_trpc/serverClient";
import {
  AppRouteHandlerFn,
  AppRouteHandlerFnContext,
  handleAuth,
  handleProfile,
} from "@auth0/nextjs-auth0";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = handleAuth({
  profile: async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
    return await handleProfile(req, ctx, {
      refetch: true,
      afterRefetch: async (testReq: any, session: any) => {
        const user = await serverClient.user.getUserByExternalId(
          session.user.sub
        );
        session.user = {
          ...session.user,
          ...user,
        };
        return session;
      },
    });
  },
});
