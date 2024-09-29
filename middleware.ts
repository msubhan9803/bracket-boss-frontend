import {
  createMiddleware,
  type MiddlewareConfig,
  MiddlewareFunctionProps,
} from "@rescale/nemo";
import { NextResponse } from "next/server";
import { getAuthToken } from "./services/cookie-handler.service";
import { PageUrls } from "@/lib/app-types";
import {
  checkIfAllOnboardingStepsCompleted,
  getOnboardingNextStep,
} from "./services/user.service";

export const authRoutesMiddleware = async ({
  request,
}: MiddlewareFunctionProps) => {
  const token = getAuthToken({ isServer: true });
  const url = new URL(request.url);

  if (url.searchParams.get("logout") === "1") {
    return NextResponse.next();
  }

  if (token?.accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

export const onboardingRoutesMiddleware = async ({
  request,
}: MiddlewareFunctionProps) => {
  const token = getAuthToken({ isServer: true });

  if (!token?.accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { isAllStepsCompleted } = await checkIfAllOnboardingStepsCompleted();
  if (isAllStepsCompleted) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

export const portalRoutesMiddleware = async ({
  request,
}: MiddlewareFunctionProps) => {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/").filter((segment) => segment);
  const page = pathSegments.length > 0 ? pathSegments[0] : "home";

  const token = getAuthToken({ isServer: true });

  if (!token?.accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { isAllStepsCompleted } = await checkIfAllOnboardingStepsCompleted();
  if (!isAllStepsCompleted) {
    const redirectUrl = (await getOnboardingNextStep()) as string;

    if (redirectUrl !== PageUrls.DASHBOARD) {
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
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
  "/login": [authRoutesMiddleware],
  "/onboarding/register": [authRoutesMiddleware],

  "/onboarding/add-club-info": [onboardingRoutesMiddleware],
  "/onboarding/select-account-type": [onboardingRoutesMiddleware],
  "/onboarding/select-your-club": [onboardingRoutesMiddleware],
  "/onboarding/verify-email": [onboardingRoutesMiddleware],

  /*
   * Match all routes, but exclude the ones specified.
   * This example excludes `/`, `/login`, onboarding routes like `/onboarding/register`, etc..
   * Redirect to /login if user isn't authenticated
   */
  "/((?!login|onboarding/register|onboarding/add-club-info|onboarding/select-account-type|onboarding/select-your-club|onboarding/verify-email|$).*)":
    [portalRoutesMiddleware],
} satisfies MiddlewareConfig;

// Create middlewares helper
export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: ["/((?!api/|_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};
