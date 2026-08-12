import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

function hostnameOf(request: NextRequest) {
  const raw =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.hostname;
  return raw.split(",")[0]?.trim().split(":")[0] ?? "";
}

function isAdminHost(host: string) {
  return host === "admin.rkdreality.com" || host.startsWith("admin.");
}

export function middleware(request: NextRequest) {
  const host = hostnameOf(request);
  const {pathname} = request.nextUrl;

  if (!isAdminHost(host)) return NextResponse.next();

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio")
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/studio" : `/studio${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
