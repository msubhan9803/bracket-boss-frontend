import { MiddlewareFunctionProps } from "@rescale/nemo";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const guestMiddleware = async ({ request }: MiddlewareFunctionProps) => {
  const token = await getToken({ req: request });

  if (token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};
