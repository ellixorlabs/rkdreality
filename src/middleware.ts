import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

function isAdminHost(host: string) {
  return host === "admin.rkdreality.com" || host.startsWith("admin.");
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const {pathname} = request.nextUrl;

  if (isAdminHost(host) && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/studio";
    return NextResponse.redirect(url);
  }

  const requestHeaders = new Headers(request.headers);
  if (pathname.startsWith("/studio") || isAdminHost(host)) {
    requestHeaders.set("x-rkd-studio", "1");
  }

  return NextResponse.next({
    request: {headers: requestHeaders},
  });
}

export const config = {
  matcher: ["/", "/studio/:path*"],
};
