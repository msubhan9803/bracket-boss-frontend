import { GraphQLClient } from "graphql-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { getAuthToken } from "@/services/cookie-handler.service";
import { initializeGraphQLClient, setHeaders, handleGraphQLErrors } from "./graphql-utils";

const graphqlClient = initializeGraphQLClient();

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
  setHeaders(graphqlClient, customHeaders);
  return graphqlClient;
}

export const fileUploadMutationHandler = async <
  T,
  V extends { [key: string]: any }
>({
  query,
  variables,
  file,
  options,
}: FileUploadGraphQLRequestHandlerOptions<T, V> & { file: File }): Promise<T> => {
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
    ...(token?.accessToken ? { Authorization: `Bearer ${token.accessToken}` } : {}),
  };

  if (options?.customHeaders) {
    Object.assign(headers, options.customHeaders);
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
      method: "POST",
      body: formData,
      headers,
    });

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
    handleGraphQLErrors(err);
  }
};
