import {
  createMiddleware,
  type MiddlewareConfig,
  MiddlewareFunctionProps,
} from "@rescale/nemo";
import { NextResponse } from "next/server";
import { getAuthToken, getSession } from "./services/cookie-handler.service";
import { getUserNextStepRedirection } from "./server-requests/user.server-request";
import { ONBOARDING_STEPS, PredefinedSystemRoles } from "./lib/app-types";
import { selectFirstRole } from "./services/user.service";

export enum StepNames {
  registration = "registration",
  email_verification = "email_verification",
  user_type_selection = "user_type_selection",
  club_information_insertion = "club_information_insertion",
  club_selection = "club_selection",
}

const nextStep = async () => {
  const steps = await getUserNextStepRedirection();
  const completedSteps = steps.map((step) => step.name.toString());

  const stepMapping = {
    [StepNames.registration]: ONBOARDING_STEPS.REGISTRATION,
    [StepNames.email_verification]: ONBOARDING_STEPS.STEP_1,
    [StepNames.user_type_selection]: ONBOARDING_STEPS.STEP_2,
    [StepNames.club_information_insertion]: ONBOARDING_STEPS.STEP_3_CLUB,
    [StepNames.club_selection]: ONBOARDING_STEPS.STEP_3_PLAYER,
    last_step: ONBOARDING_STEPS.LAST_STEP,
  };

  for (const step in stepMapping) {
    if (!completedSteps.includes(step)) {
      return stepMapping[step as keyof typeof stepMapping];
    } else {
      if (
        step === StepNames.user_type_selection &&
        completedSteps.includes(StepNames.user_type_selection) &&
        completedSteps.findIndex((s) => s === StepNames.user_type_selection) ===
          completedSteps.length - 1
      ) {
        const session = getSession({ isServer: true });

        if (session && session.id && session.roles) {
          const userRole = selectFirstRole(session.roles);

          if (userRole) {
            if (userRole.id === PredefinedSystemRoles.clubOwner) {
              return stepMapping.club_information_insertion;
            } else {
              return stepMapping.club_selection;
            }
          }
        }
      }
    }
  }

  return stepMapping.last_step;
};

export const guestMiddleware = async ({ request }: MiddlewareFunctionProps) => {
  const token = getAuthToken({ isServer: true });
  const url = new URL(request.url);

  if (url.searchParams.get("logout") === "1") {
    return NextResponse.next();
  }

  if (token?.accessToken) {
    const redirectUrl = await nextStep();
    console.log("🌺🌺🌺 Next Redirect Url: ", redirectUrl);

    return NextResponse.redirect(new URL(redirectUrl, request.url));
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
