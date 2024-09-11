import {
  createMiddleware,
  type MiddlewareConfig,
} from "@rescale/nemo";
import { guestMiddleware } from "@/middlewares/guestMiddleware";
import { passThroughMiddleware } from "@/middlewares/passThroughMiddleware";
import { authenticatedMiddleware } from "@/middlewares/authenticatedMiddleware";

const middlewares = {
  /*
   * Render homepage even if user is authenticated
   */
  "/": [passThroughMiddleware],

  /*
   * Redirect to /dashboard if user is authenticated
   */
  "/login": [guestMiddleware],
  "/register": [guestMiddleware],

  /*
   * Match all routes, but exclude the ones specified.
   * This example excludes `/`, `/login`, `/register` etc..
   * Redirect to /login if user isn't authenticated
   */
  "/((?!login|register|$).*)": [authenticatedMiddleware],
} satisfies MiddlewareConfig;

// Create middlewares helper
export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: ["/((?!api/|_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};
