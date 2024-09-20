import {
  createMiddleware,
  type MiddlewareConfig,
  MiddlewareFunctionProps,
} from "@rescale/nemo";
import { NextResponse } from "next/server";
import { getAuthToken } from "./services/cookie-handler.service";

export const guestMiddleware = async ({ request }: MiddlewareFunctionProps) => {
  const token = getAuthToken({ isServer: true });
  const url = new URL(request.url);

  if (url.searchParams.get('logout') === '1') {
    return NextResponse.next();
  }

  if (token?.accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

export const authenticatedMiddleware = async ({
  request,
}: MiddlewareFunctionProps) => {
  const token = getAuthToken({ isServer: true });

  if (!token?.accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const passThroughMiddleware = async () => {
  return NextResponse.next();
};

const middlewares = {
  /*
   * Render homepage even if user is authenticated
   */
  "/": [passThroughMiddleware],

  /*
   * Redirect to /dashboard if user is authenticated
   */
  "/login": [guestMiddleware],
  "/onboarding/register": [guestMiddleware],

  /*
   * Match all routes, but exclude the ones specified.
   * This example excludes `/`, `/login`, `/onboarding/register`, etc..
   * Redirect to /login if user isn't authenticated
   */
  "/((?!login|onboarding/register|$).*)": [authenticatedMiddleware],
} satisfies MiddlewareConfig;

// Create middlewares helper
export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: ["/((?!api/|_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};
