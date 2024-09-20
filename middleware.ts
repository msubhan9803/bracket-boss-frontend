import {
  createMiddleware,
  type MiddlewareConfig,
  MiddlewareFunctionProps,
} from "@rescale/nemo";
import { NextResponse } from "next/server";
import { getAuthToken } from "./services/cookie-handler.service";

const isTokenExpired = (expiresIn: number) => {
  return Date.now() > expiresIn;
};

export const guestMiddleware = async ({ request }: MiddlewareFunctionProps) => {
  const token = getAuthToken({ isServer: true });

  if (token?.accessToken && !isTokenExpired(token.expiresIn)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

export const authenticatedMiddleware = async ({
  request,
}: MiddlewareFunctionProps) => {
  const token = getAuthToken({ isServer: true });

  if (!token?.accessToken || isTokenExpired(token.expiresIn)) {
    return NextResponse.redirect(new URL("/login?logout=1", request.url));
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