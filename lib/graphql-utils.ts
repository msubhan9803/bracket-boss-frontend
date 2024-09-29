import { GraphQLClient } from "graphql-request";
import { getAuthToken } from "@/services/cookie-handler.service";
import { GraphQLErrorResponse } from "@/global";

export function initializeGraphQLClient(): GraphQLClient {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;
  return new GraphQLClient(backendUrl);
}

export function setHeaders(
  client: GraphQLClient,
  customHeaders?: Record<string, string>,
  isServer: boolean = false
): void {
  const token = getAuthToken({ isServer });

  client.setHeader("x-apollo-operation-name", "custom-operation");

  if (token?.accessToken) {
    client.setHeader("Authorization", `Bearer ${token.accessToken}`);
  }

  if (customHeaders) {
    Object.entries(customHeaders).forEach(([key, value]) => {
      client.setHeader(key, value);
    });
  }
}

export function handleGraphQLErrors(err: any, isServer: boolean = false) {
  const error = err as GraphQLErrorResponse;

  const errors = error?.response?.errors?.map(
    (err) => (err?.extensions?.originalError?.error as string) ?? err.message
  );

  const unauthenticatedError = errors?.some(
    (err: string) =>
      err.includes("Unauthenticated") || err.includes("Unauthorized")
  );

  if (unauthenticatedError) {
    /**
     * Doing nothing as there's error on next js end so leaving this as it is
     * And doing logout scenario on client side using useTokenValidation & TokenValidator
     */
    // if (isServer || typeof window === "undefined") {
    //   redirect("/login?logout=1");
    // } else {
    //   window.location.href = "/login?logout=1";
    // }
  } else {
    if (errors) {
      throw new Error(errors?.join(", ") ?? "An unknown error occurred");
    }
  }
}
