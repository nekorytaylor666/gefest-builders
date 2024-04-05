import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { setAuthClaims } from "./lib/claims";
import jwt from "jsonwebtoken"; // Ensure this import is at the top of your file

async function getSession(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const jwtToken = jwt.decode(session?.access_token);
    console.log("token", jwtToken);
  }

  return session;
}

function redirectIfNotAuthenticated(session: any, req: NextRequest) {
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    return NextResponse.next();
  }
}

async function setPremiumClaim(req: NextRequest, session: any) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Проверяем, есть ли параметр "premium" в URL
  const url = new URL(req.url);
  const premiumParam = url.searchParams.get("premium");

  const hasPremiumParam = url.searchParams.has("premium");
  const hasPremiumClaim = session?.user?.app_metadata.premium;

  if (hasPremiumParam && !hasPremiumClaim) {
    // Устанавливаем claim "premium" в true
    const { data, error } = await supabase.rpc("set_claim", {
      claim: "premium",
      uid: session.user.id,
      value: true,
    });

    // Обновляем сессию
    const res = await supabase.auth.refreshSession();
  }
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const session = await getSession(req);

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
    await setPremiumClaim(req, session);

    return redirectIfNotAuthenticated(session, req);
  }
  if (req.nextUrl.pathname === "/") {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.redirect(new URL("/courses", req.url));
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
