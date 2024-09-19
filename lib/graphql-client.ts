import { GraphQLClient } from "graphql-request";
import { redirect } from "next/navigation";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { GraphQLErrorResponse } from "@/global";
import { getAuthToken } from "@/services/cookie-handler.service";

const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_BACKEND_URL as string
);

interface GraphQLServerOptions {
  customHeaders?: Record<string, string>;
}

interface GraphQLRequestHandlerOptions<T, V> {
  query: TypedDocumentNode<T, V>;
  variables?: V;
  options?: GraphQLServerOptions;
}

export async function graphqlServer({
  customHeaders,
}: GraphQLServerOptions): Promise<GraphQLClient> {
  let token = getAuthToken();

  if (token?.accessToken) {
    graphqlClient.setHeader("Authorization", `Bearer ${token.accessToken}`);
  }

  if (customHeaders) {
    for (const [header, value] of Object.entries(customHeaders)) {
      graphqlClient.setHeader(header, value);
    }
  }

  return graphqlClient;
}

export const graphqlRequestHandler = async <
  T,
  V extends { [key: string]: any }
>({
  query,
  variables,
  options,
}: GraphQLRequestHandlerOptions<T, V>): Promise<T> => {
  const gql = await graphqlServer(options ?? {});

  try {
    const data = await gql.request<T>(query, variables);
    return data;
  } catch (err) {
    const error = err as GraphQLErrorResponse;

    const errors = error?.response?.errors?.map(
      (err) => (err?.extensions?.originalError?.error as string) ?? err.message
    );

    const unauthenticatedError = errors?.find(
      (err: string) =>
        err.includes("Unauthenticated") || err.includes("Unauthorized")
    );

    if (unauthenticatedError) {
      redirect("/login?logout=1");
    }

    throw new Error(errors?.join(", ") ?? "An unknown error occurred");
  }
};
