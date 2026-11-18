import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Cookie-only check : real session and role checks are done server-side
export function proxy(request: NextRequest) {
  const hasSession = getSessionCookie(request);
  const isLoginPage = request.nextUrl.pathname === "/connexion";

  if (!hasSession && !isLoginPage) {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }
  if (hasSession && isLoginPage) {
    return NextResponse.redirect(new URL("/accueil", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Everything except the API, Next internals and static files
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};