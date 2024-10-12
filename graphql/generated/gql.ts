/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  mutation VerifyEmail($input: VerifyEmailInputDto!) {\n    verifyEmail(input: $input) {\n      message\n    }\n  }\n": types.VerifyEmailDocument,
    "\n  mutation SendForgotPasswordEmail($email: String!) {\n    sendForgotPasswordEmail(email: $email) {\n      message\n    }\n  }\n": types.SendForgotPasswordEmailDocument,
    "\n  mutation VerifyOtp($email: String!, $otp: String!) {\n    verifyOtp(email: $email, otp: $otp) {\n      message\n      token\n    }\n  }\n": types.VerifyOtpDocument,
    "\n  mutation ResetPassword($newPassword: String!) {\n    resetPassword(newPassword: $newPassword) {\n      message\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  mutation CreateClub($input: CreateClubInputDto!) {\n    createClub(input: $input) {\n      club {\n        id\n        logo\n        name\n        description\n        createdDate\n        updatedDate\n        users {\n          id\n          name\n          email\n        }\n      }\n      message\n    }\n  }\n": types.CreateClubDocument,
    "\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation UpdateUserRole($input: UpdateUserRoleDto!) {\n    updateUserRole(input: $input) {\n      message\n      userRoleClub {\n        created_at\n        id\n        role {\n          id\n        }\n        updated_at\n      }\n    }\n  }\n": types.UpdateUserRoleDocument,
    "\n  mutation UpdateUserClub($input: UpdateUserClubDto!) {\n    updateUserClub(input: $input) {\n      message\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n": types.UpdateUserClubDocument,
    "\n  query GetAllClubs {\n    getAllClubs {\n      createdDate\n      description\n      id\n      logo\n      name\n      slug\n      updatedDate\n    }\n  }\n": types.GetAllClubsDocument,
    "\n  query GetAllTournaments(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllTournaments(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      totalRecords\n      tournaments {\n        id\n        name\n        description\n        start_date\n        end_date\n        isPrivate\n        created_at\n        updated_at\n        bracket {\n          name\n        }\n        club {\n          name\n        }\n        sport {\n          name\n        }\n      }\n    }\n  }\n": types.GetAllTournamentsDocument,
    "\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n    }\n  }\n": types.GetUsersDocument,
    "\n  query GetUserById($userId: Float!) {\n    getUserById(userId: $userId) {\n      user {\n        created_at\n        email\n        id\n        isEmailVerified\n        name\n        otpSecret\n        profileImage\n        updated_at\n        steps {\n          id\n          name\n        }\n        clubs {\n          id\n        }\n      }\n      userRoleClub {\n        id\n        role {\n          id\n        }\n      }\n    }\n  }\n": types.GetUserByIdDocument,
    "\n  query GetStepsOfUser {\n    getStepsOfUser {\n      id\n      name\n    }\n  }\n": types.GetStepsOfUserDocument,
    "\n  query GetPermissionsByRoleId($roleId: Float!) {\n    getPermissionsByRoleId(roleId: $roleId) {\n      id\n      roleId\n      moduleId\n      moduleName\n      policyId\n      policyName\n    }\n  }\n": types.GetPermissionsByRoleIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($input: RegisterInputDto!) {\n    register(input: $input) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: RegisterInputDto!) {\n    register(input: $input) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: LoginInputDto!) {\n    login(input: $input) {\n      authTokens {\n        accessToken\n        expiresIn\n        refreshToken\n      }\n      user {\n        id\n        email\n        name\n        created_at\n        profileImage\n        updated_at\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInputDto!) {\n    login(input: $input) {\n      authTokens {\n        accessToken\n        expiresIn\n        refreshToken\n      }\n      user {\n        id\n        email\n        name\n        created_at\n        profileImage\n        updated_at\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshToken {\n    refreshToken {\n      accessToken\n      expiresIn\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken {\n    refreshToken {\n      accessToken\n      expiresIn\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyEmail($input: VerifyEmailInputDto!) {\n    verifyEmail(input: $input) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyEmail($input: VerifyEmailInputDto!) {\n    verifyEmail(input: $input) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendForgotPasswordEmail($email: String!) {\n    sendForgotPasswordEmail(email: $email) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation SendForgotPasswordEmail($email: String!) {\n    sendForgotPasswordEmail(email: $email) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyOtp($email: String!, $otp: String!) {\n    verifyOtp(email: $email, otp: $otp) {\n      message\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyOtp($email: String!, $otp: String!) {\n    verifyOtp(email: $email, otp: $otp) {\n      message\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($newPassword: String!) {\n    resetPassword(newPassword: $newPassword) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($newPassword: String!) {\n    resetPassword(newPassword: $newPassword) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateClub($input: CreateClubInputDto!) {\n    createClub(input: $input) {\n      club {\n        id\n        logo\n        name\n        description\n        createdDate\n        updatedDate\n        users {\n          id\n          name\n          email\n        }\n      }\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation CreateClub($input: CreateClubInputDto!) {\n    createClub(input: $input) {\n      club {\n        id\n        logo\n        name\n        description\n        createdDate\n        updatedDate\n        users {\n          id\n          name\n          email\n        }\n      }\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserRole($input: UpdateUserRoleDto!) {\n    updateUserRole(input: $input) {\n      message\n      userRoleClub {\n        created_at\n        id\n        role {\n          id\n        }\n        updated_at\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserRole($input: UpdateUserRoleDto!) {\n    updateUserRole(input: $input) {\n      message\n      userRoleClub {\n        created_at\n        id\n        role {\n          id\n        }\n        updated_at\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserClub($input: UpdateUserClubDto!) {\n    updateUserClub(input: $input) {\n      message\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserClub($input: UpdateUserClubDto!) {\n    updateUserClub(input: $input) {\n      message\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllClubs {\n    getAllClubs {\n      createdDate\n      description\n      id\n      logo\n      name\n      slug\n      updatedDate\n    }\n  }\n"): (typeof documents)["\n  query GetAllClubs {\n    getAllClubs {\n      createdDate\n      description\n      id\n      logo\n      name\n      slug\n      updatedDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTournaments(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllTournaments(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      totalRecords\n      tournaments {\n        id\n        name\n        description\n        start_date\n        end_date\n        isPrivate\n        created_at\n        updated_at\n        bracket {\n          name\n        }\n        club {\n          name\n        }\n        sport {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllTournaments(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllTournaments(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      totalRecords\n      tournaments {\n        id\n        name\n        description\n        start_date\n        end_date\n        isPrivate\n        created_at\n        updated_at\n        bracket {\n          name\n        }\n        club {\n          name\n        }\n        sport {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserById($userId: Float!) {\n    getUserById(userId: $userId) {\n      user {\n        created_at\n        email\n        id\n        isEmailVerified\n        name\n        otpSecret\n        profileImage\n        updated_at\n        steps {\n          id\n          name\n        }\n        clubs {\n          id\n        }\n      }\n      userRoleClub {\n        id\n        role {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($userId: Float!) {\n    getUserById(userId: $userId) {\n      user {\n        created_at\n        email\n        id\n        isEmailVerified\n        name\n        otpSecret\n        profileImage\n        updated_at\n        steps {\n          id\n          name\n        }\n        clubs {\n          id\n        }\n      }\n      userRoleClub {\n        id\n        role {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStepsOfUser {\n    getStepsOfUser {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetStepsOfUser {\n    getStepsOfUser {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPermissionsByRoleId($roleId: Float!) {\n    getPermissionsByRoleId(roleId: $roleId) {\n      id\n      roleId\n      moduleId\n      moduleName\n      policyId\n      policyName\n    }\n  }\n"): (typeof documents)["\n  query GetPermissionsByRoleId($roleId: Float!) {\n    getPermissionsByRoleId(roleId: $roleId) {\n      id\n      roleId\n      moduleId\n      moduleName\n      policyId\n      policyName\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;