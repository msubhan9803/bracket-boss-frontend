import { GraphQLClient } from "graphql-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { handleGraphQLErrors, initializeGraphQLClient, setHeaders } from "./graphql-utils";

const graphqlClient = initializeGraphQLClient();

interface GraphQLServerOptions {
  isServer: boolean;
  customHeaders?: Record<string, string>;
}

interface GraphQLRequestHandlerOptions<T, V> {
  query: TypedDocumentNode<T, V>;
  variables?: V;
  options: GraphQLServerOptions;
}

export async function graphqlServer({
  customHeaders,
}: GraphQLServerOptions): Promise<GraphQLClient> {
  setHeaders(graphqlClient, customHeaders, true);
  return graphqlClient;
}

export const graphqlRequestHandlerServer = async <
  T,
  V extends { [key: string]: any }
>({
  query,
  variables,
  options,
}: GraphQLRequestHandlerOptions<T, V>): Promise<T> => {
  const gql = await graphqlServer(options);

  try {
    const data = await gql.request<T>(query, variables);
    return data;
  } catch (err) {
    handleGraphQLErrors(err);
  }
  throw new Error("GraphQL request failed and no data was returned.");
};
