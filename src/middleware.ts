import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

async function getSession(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

function redirectIfNotAuthenticated(session: any, req: NextRequest) {
  if (!session) {
  } else {
    return NextResponse.next();
  }
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const session = await getSession(req);
    console.log(session?.user?.app_metadata);
    const hasAdminClaim = session?.user?.app_metadata.claims_admin;
    if (session && hasAdminClaim) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // If the user is not authenticated, redirect them to the login page
  }
  // Получаем текущий URL
  if (req.nextUrl.pathname.startsWith("/courses")) {
    const session = await getSession(req);
    console.log("custom claims", session?.user?.app_metadata); // show custom claims
    return redirectIfNotAuthenticated(session, req);
  }
}
