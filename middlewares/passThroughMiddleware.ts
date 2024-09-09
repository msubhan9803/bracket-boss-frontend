import { NextResponse } from "next/server";

export const passThroughMiddleware = async () => {
  return NextResponse.next();
};
