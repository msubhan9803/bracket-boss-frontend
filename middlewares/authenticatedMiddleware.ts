import { MiddlewareFunctionProps } from "@rescale/nemo";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const authenticatedMiddleware = async ({
  request,
}: MiddlewareFunctionProps) => {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};
