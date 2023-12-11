import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  // Получаем текущий URL
  if (
    req.nextUrl.pathname.startsWith("/courses") ||
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const url = req.nextUrl.clone();

    if (!session) {
      // If the user is not authenticated, redirect them to the login page
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      return NextResponse.next();
    }
  }
}
