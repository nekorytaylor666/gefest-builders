import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { setAuthClaims } from "./lib/claims";

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

  console.log(hasPremiumParam, premiumParam, url.searchParams.get("premium"));
  if (hasPremiumParam && !hasPremiumClaim) {
    // Устанавливаем claim "premium" в true
    const { data, error } = await supabase.rpc("set_claim", {
      claim: "premium",
      uid: session.user.id,
      value: true,
    });
    console.log(data, error);

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
}
