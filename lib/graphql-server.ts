import { GraphQLClient } from "graphql-request";
import { redirect } from "next/navigation";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { GraphQLErrorResponse } from "@/global";
import { getSession } from "next-auth/react";

const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_BACKEND_URL as string
);

export async function graphqlServer(customHeaders?: Record<string, string>) {
  const session = await getSession();
  const authToken = session?.authTokens.accessToken;

  if (authToken) {
    graphqlClient.setHeader("Authorization", `Bearer ${authToken}`);
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
>(
  query: TypedDocumentNode<T, V>,
  variables?: V,
  customHeaders?: Record<string, string>
): Promise<T> => {
  const gql = await graphqlServer(customHeaders);

  try {
    const data = await gql.request<T>(query, variables);

    return data;
  } catch (err) {
    const error = err as GraphQLErrorResponse;

    const errors = error.response.errors.map(
      (err) => (err?.extensions?.originalError?.error as string) ?? err.message
    );

    const unauthenticatedError = errors.find(
      (err: string) =>
        err.includes("Unauthenticated") || err.includes("Unauthorized")
    );

    if (unauthenticatedError) {
      redirect("/login?logout=1");
    }

    throw Error(errors.join(", "));
  }
};
