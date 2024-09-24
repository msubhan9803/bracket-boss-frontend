import { GraphQLClient } from "graphql-request";
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

interface FileUploadGraphQLRequestHandlerOptions<T, V> {
  query: string;
  variables?: V | {};
  options?: GraphQLServerOptions;
}

export async function graphqlServer({
  customHeaders,
}: GraphQLServerOptions): Promise<GraphQLClient> {
  let token = getAuthToken();

  graphqlClient.setHeader("x-apollo-operation-name", "custom-operation");

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

    const unauthenticatedError = errors?.some(
      (err: string) =>
        err.includes("Unauthenticated") || err.includes("Unauthorized")
    );

    if (unauthenticatedError) {
      window.location.href = "/login?logout=1";
    }

    throw new Error(errors?.join(", ") ?? "An unknown error occurred");
  }
};

export const fileUploadMutationHandler = async <
  T,
  V extends { [key: string]: any }
>({
  query,
  variables,
  file,
  options,
}: FileUploadGraphQLRequestHandlerOptions<T, V> & {
  file: File;
}): Promise<T> => {
  const formData = new FormData();

  const operations = JSON.stringify({
    query,
    operationName: "UploadFile",
    variables: { ...variables, file: null },
  });

  const map = JSON.stringify({
    "1": ["variables.file"],
  });

  formData.append("operations", operations);
  formData.append("map", map);

  formData.append("1", file);

  const token = getAuthToken();
  const headers: Record<string, string> = {
    "x-apollo-operation-name": "custom-operation",
    ...(token?.accessToken
      ? { Authorization: `Bearer ${token.accessToken}` }
      : {}),
  };

  if (options?.customHeaders) {
    Object.assign(headers, options.customHeaders);
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL as string,
      {
        method: "POST",
        body: formData,
        headers,
      }
    );

    const data = await response.json();
    if (response.ok) {
      return data.data as T;
    } else {
      const errors = data.errors.map((err: any) => err.message).join(", ");
      throw new Error(errors || "An unknown error occurred");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
