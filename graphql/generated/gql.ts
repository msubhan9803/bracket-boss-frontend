/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Register($input: RegisterInputDto!) {\n    register(input: $input) {\n      message\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Login($input: LoginInputDto!) {\n    login(input: $input) {\n      authTokens {\n        accessToken\n        expiresIn\n        refreshToken\n      }\n      user {\n        id\n        email\n        name\n        created_at\n        profileImage\n        updated_at\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation RefreshToken {\n    refreshToken {\n      accessToken\n      expiresIn\n      refreshToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n    }\n  }\n": types.GetUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($input: RegisterInputDto!) {\n    register(input: $input) {\n      message\n    }\n  }\n"): typeof import('./graphql').RegisterDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: LoginInputDto!) {\n    login(input: $input) {\n      authTokens {\n        accessToken\n        expiresIn\n        refreshToken\n      }\n      user {\n        id\n        email\n        name\n        created_at\n        profileImage\n        updated_at\n      }\n    }\n  }\n"): typeof import('./graphql').LoginDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshToken {\n    refreshToken {\n      accessToken\n      expiresIn\n      refreshToken\n    }\n  }\n"): typeof import('./graphql').RefreshTokenDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n    }\n  }\n"): typeof import('./graphql').GetUsersDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
