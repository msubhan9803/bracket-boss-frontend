/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A custom scalar to handle numeric IDs as integers */
  CustomID: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Action = {
  __typename?: 'Action';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  name: Scalars['String']['output'];
  policies?: Maybe<Array<Policy>>;
  updatedDate: Scalars['DateTime']['output'];
};

export type Bracket = {
  __typename?: 'Bracket';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  name: BracketType;
  updated_at: Scalars['DateTime']['output'];
};

export enum BracketType {
  DoubleElimination = 'double_elimination',
  RoundRobin = 'round_robin',
  SingleElimination = 'single_elimination'
}

export type Club = {
  __typename?: 'Club';
  createdDate: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['CustomID']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedDate: Scalars['DateTime']['output'];
  userRoleClub?: Maybe<Array<UserRoleClub>>;
  users?: Maybe<Array<User>>;
};

export type Court = {
  __typename?: 'Court';
  club: Club;
  id: Scalars['CustomID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CourtListResponse = {
  __typename?: 'CourtListResponse';
  courts: Array<Court>;
  totalRecords: Scalars['Int']['output'];
};

export type CreateClubInputDto = {
  description: Scalars['String']['input'];
  logo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateClubResponseDto = {
  __typename?: 'CreateClubResponseDto';
  club: Club;
  message: Scalars['String']['output'];
};

export type CreateCourtInputDto = {
  clubId: Scalars['Float']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateTournamentInputDto = {
  bracketId: Scalars['Float']['input'];
  clubId: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  end_date: Scalars['DateTime']['input'];
  isPrivate: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type LoginInputDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponseDto = {
  __typename?: 'LoginResponseDto';
  authTokens: RefreshTokenResponseDto;
  user: User;
};

export type MessageResponseDto = {
  __typename?: 'MessageResponseDto';
  message: Scalars['String']['output'];
};

export type Module = {
  __typename?: 'Module';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  name: Scalars['String']['output'];
  rolePolicyModule?: Maybe<Array<ModulePolicyRole>>;
  updated_at: Scalars['DateTime']['output'];
};

export type ModulePolicyRole = {
  __typename?: 'ModulePolicyRole';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  module: Module;
  policy: Policy;
  role: Role;
  updated_at: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClub: CreateClubResponseDto;
  createCourt: Court;
  createTournament: Tournament;
  login: LoginResponseDto;
  refreshToken: RefreshTokenResponseDto;
  register: MessageResponseDto;
  resetPassword: MessageResponseDto;
  sendForgotPasswordEmail: MessageResponseDto;
  updateTournament: Tournament;
  updateUserClub: UpdateUserResponseDto;
  updateUserRole: UpdateUserRoleResponseDto;
  uploadFile: UploadFileResponseDto;
  verifyEmail: MessageResponseDto;
  verifyOtp: OtpVerifyResponseDto;
};


export type MutationCreateClubArgs = {
  input: CreateClubInputDto;
};


export type MutationCreateCourtArgs = {
  input: CreateCourtInputDto;
};


export type MutationCreateTournamentArgs = {
  input: CreateTournamentInputDto;
};


export type MutationLoginArgs = {
  input: LoginInputDto;
};


export type MutationRegisterArgs = {
  input: RegisterInputDto;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateTournamentArgs = {
  input: UpdateTournamentInput;
};


export type MutationUpdateUserClubArgs = {
  input: UpdateUserClubDto;
};


export type MutationUpdateUserRoleArgs = {
  input: UpdateUserRoleDto;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInputDto;
};


export type MutationVerifyOtpArgs = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type OtpVerifyResponseDto = {
  __typename?: 'OtpVerifyResponseDto';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type PermissionByRoleIdResponse = {
  __typename?: 'PermissionByRoleIdResponse';
  id: Scalars['String']['output'];
  moduleId: Scalars['String']['output'];
  moduleName: Scalars['String']['output'];
  policyId: Scalars['String']['output'];
  policyName: Scalars['String']['output'];
  roleId: Scalars['String']['output'];
};

export type Policy = {
  __typename?: 'Policy';
  actions?: Maybe<Array<Action>>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rolePolicyModule?: Maybe<Array<ModulePolicyRole>>;
  updatedDate: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllBrackets: Array<Bracket>;
  getAllClubs: Array<Club>;
  getAllCourts: CourtListResponse;
  getAllStepsByRole: Array<Step>;
  getAllTournaments: TournamentListResponse;
  getClubById: Club;
  getCourtById: Court;
  getPermissionsByRoleId: Array<PermissionByRoleIdResponse>;
  getStepsOfUser: Array<Step>;
  getTournamentById: Tournament;
  getUserById: UserWithRoleClub;
  getUsers: Array<User>;
};


export type QueryGetAllCourtsArgs = {
  clubId?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryGetAllStepsByRoleArgs = {
  input: StepsByRoleDto;
};


export type QueryGetAllTournamentsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryGetClubByIdArgs = {
  clubId: Scalars['Float']['input'];
};


export type QueryGetCourtByIdArgs = {
  courtId: Scalars['Float']['input'];
};


export type QueryGetPermissionsByRoleIdArgs = {
  roleId: Scalars['Float']['input'];
};


export type QueryGetTournamentByIdArgs = {
  tournamentId: Scalars['Float']['input'];
};


export type QueryGetUserByIdArgs = {
  clubId?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['Float']['input'];
};

export type RefreshTokenResponseDto = {
  __typename?: 'RefreshTokenResponseDto';
  accessToken: Scalars['String']['output'];
  expiresIn: Scalars['Float']['output'];
  refreshToken: Scalars['String']['output'];
};

export type RegisterInputDto = {
  clubId?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  name: Scalars['String']['output'];
  rolePolicyModule?: Maybe<Array<ModulePolicyRole>>;
  steps?: Maybe<Array<Step>>;
  updatedDate: Scalars['DateTime']['output'];
  userRoleClub?: Maybe<Array<UserRoleClub>>;
};

export type SortInput = {
  direction: Scalars['String']['input'];
  field: Scalars['String']['input'];
};

export type Sport = {
  __typename?: 'Sport';
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['CustomID']['output'];
  name: SportName;
  updated_at: Scalars['DateTime']['output'];
};

export enum SportName {
  Pickleball = 'pickleball'
}

export type Step = {
  __typename?: 'Step';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: StepNames;
  roles?: Maybe<Array<Role>>;
  updatedDate: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

export enum StepNames {
  ClubInformationInsertion = 'club_information_insertion',
  ClubSelection = 'club_selection',
  EmailVerification = 'email_verification',
  Registration = 'registration',
  UserTypeSelection = 'user_type_selection'
}

export type StepsByRoleDto = {
  roleId: Scalars['Float']['input'];
};

export type Tournament = {
  __typename?: 'Tournament';
  bracket: Bracket;
  club: Club;
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  end_date: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  isPrivate: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  sport: Sport;
  start_date: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type TournamentListResponse = {
  __typename?: 'TournamentListResponse';
  totalRecords: Scalars['Int']['output'];
  tournaments: Array<Tournament>;
};

export type UpdateTournamentInput = {
  bracketId: Scalars['Float']['input'];
  clubId: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  end_date: Scalars['DateTime']['input'];
  id: Scalars['Float']['input'];
  isPrivate: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  start_date: Scalars['DateTime']['input'];
};

export type UpdateUserClubDto = {
  clubId: Scalars['Float']['input'];
};

export type UpdateUserResponseDto = {
  __typename?: 'UpdateUserResponseDto';
  message: Scalars['String']['output'];
  user: User;
};

export type UpdateUserRoleDto = {
  roleId: Scalars['Float']['input'];
};

export type UpdateUserRoleResponseDto = {
  __typename?: 'UpdateUserRoleResponseDto';
  message: Scalars['String']['output'];
  userRoleClub: UserRoleClub;
};

export type UploadFileResponseDto = {
  __typename?: 'UploadFileResponseDto';
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  clubs?: Maybe<Array<Club>>;
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['CustomID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  otpSecret: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
  steps?: Maybe<Array<Step>>;
  updated_at: Scalars['DateTime']['output'];
  userRoleClub?: Maybe<Array<UserRoleClub>>;
};

export type UserRoleClub = {
  __typename?: 'UserRoleClub';
  club?: Maybe<Club>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  role?: Maybe<Role>;
  updated_at: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type UserWithRoleClub = {
  __typename?: 'UserWithRoleClub';
  user: User;
  userRoleClub?: Maybe<UserRoleClub>;
};

export type VerifyEmailInputDto = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInputDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'MessageResponseDto', message: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInputDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponseDto', authTokens: { __typename?: 'RefreshTokenResponseDto', accessToken: string, expiresIn: number, refreshToken: string }, user: { __typename?: 'User', id: any, email: string, name: string, created_at: any, profileImage?: string | null, updated_at: any } } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenResponseDto', accessToken: string, expiresIn: number, refreshToken: string } };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInputDto;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'MessageResponseDto', message: string } };

export type SendForgotPasswordEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendForgotPasswordEmailMutation = { __typename?: 'Mutation', sendForgotPasswordEmail: { __typename?: 'MessageResponseDto', message: string } };

export type VerifyOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'OtpVerifyResponseDto', message: string, token: string } };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'MessageResponseDto', message: string } };

export type CreateClubMutationVariables = Exact<{
  input: CreateClubInputDto;
}>;


export type CreateClubMutation = { __typename?: 'Mutation', createClub: { __typename?: 'CreateClubResponseDto', message: string, club: { __typename?: 'Club', id: any, logo: string, name: string, description: string, createdDate: any, updatedDate: any, users?: Array<{ __typename?: 'User', id: any, name: string, email: string }> | null } } };

export type CreateCourtMutationVariables = Exact<{
  input: CreateCourtInputDto;
}>;


export type CreateCourtMutation = { __typename?: 'Mutation', createCourt: { __typename?: 'Court', id: any, location: string, name: string, club: { __typename?: 'Club', id: any, name: string } } };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'UploadFileResponseDto', url: string } };

export type CreateTournamentMutationVariables = Exact<{
  input: CreateTournamentInputDto;
}>;


export type CreateTournamentMutation = { __typename?: 'Mutation', createTournament: { __typename?: 'Tournament', created_at: any, description: string, end_date: any, id: any, isPrivate: boolean, name: string, start_date: any, updated_at: any } };

export type UpdateUserRoleMutationVariables = Exact<{
  input: UpdateUserRoleDto;
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: { __typename?: 'UpdateUserRoleResponseDto', message: string, userRoleClub: { __typename?: 'UserRoleClub', created_at: any, id: any, updated_at: any, role?: { __typename?: 'Role', id: any } | null } } };

export type UpdateUserClubMutationVariables = Exact<{
  input: UpdateUserClubDto;
}>;


export type UpdateUserClubMutation = { __typename?: 'Mutation', updateUserClub: { __typename?: 'UpdateUserResponseDto', message: string, user: { __typename?: 'User', id: any, email: string, name: string } } };

export type GetAllBracketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBracketsQuery = { __typename?: 'Query', getAllBrackets: Array<{ __typename?: 'Bracket', id: any, name: BracketType }> };

export type GetAllClubsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllClubsQuery = { __typename?: 'Query', getAllClubs: Array<{ __typename?: 'Club', createdDate: any, description: string, id: any, logo: string, name: string, slug: string, updatedDate: any }> };

export type GetAllCourtsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type GetAllCourtsQuery = { __typename?: 'Query', getAllCourts: { __typename?: 'CourtListResponse', totalRecords: number, courts: Array<{ __typename?: 'Court', id: any, name: string, location: string, club: { __typename?: 'Club', name: string } }> } };

export type GetAllTournamentsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type GetAllTournamentsQuery = { __typename?: 'Query', getAllTournaments: { __typename?: 'TournamentListResponse', totalRecords: number, tournaments: Array<{ __typename?: 'Tournament', id: any, name: string, description: string, start_date: any, end_date: any, isPrivate: boolean, created_at: any, updated_at: any, bracket: { __typename?: 'Bracket', name: BracketType }, club: { __typename?: 'Club', name: string }, sport: { __typename?: 'Sport', name: SportName } }> } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: any, email: string, name: string }> };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'UserWithRoleClub', user: { __typename?: 'User', created_at: any, email: string, id: any, isEmailVerified: boolean, name: string, otpSecret: string, profileImage?: string | null, updated_at: any, steps?: Array<{ __typename?: 'Step', id: string, name: StepNames }> | null, clubs?: Array<{ __typename?: 'Club', id: any }> | null }, userRoleClub?: { __typename?: 'UserRoleClub', id: any, role?: { __typename?: 'Role', id: any } | null } | null } };

export type GetStepsOfUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStepsOfUserQuery = { __typename?: 'Query', getStepsOfUser: Array<{ __typename?: 'Step', id: string, name: StepNames }> };

export type GetPermissionsByRoleIdQueryVariables = Exact<{
  roleId: Scalars['Float']['input'];
}>;


export type GetPermissionsByRoleIdQuery = { __typename?: 'Query', getPermissionsByRoleId: Array<{ __typename?: 'PermissionByRoleIdResponse', id: string, roleId: string, moduleId: string, moduleName: string, policyId: string, policyName: string }> };


export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInputDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInputDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyEmailInputDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const SendForgotPasswordEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendForgotPasswordEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendForgotPasswordEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const CreateClubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClubInputDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClub"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"updatedDate"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateClubMutation, CreateClubMutationVariables>;
export const CreateCourtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCourt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCourtInputDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCourt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCourtMutation, CreateCourtMutationVariables>;
export const UploadFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadFileMutation, UploadFileMutationVariables>;
export const CreateTournamentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTournament"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTournamentInputDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<CreateTournamentMutation, CreateTournamentMutationVariables>;
export const UpdateUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserRoleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"userRoleClub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
export const UpdateUserClubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserClub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserClubDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserClub"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserClubMutation, UpdateUserClubMutationVariables>;
export const GetAllBracketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllBrackets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllBrackets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllBracketsQuery, GetAllBracketsQueryVariables>;
export const GetAllClubsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllClubs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllClubs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"updatedDate"}}]}}]}}]} as unknown as DocumentNode<GetAllClubsQuery, GetAllClubsQueryVariables>;
export const GetAllCourtsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCourts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCourts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalRecords"}}]}}]}}]} as unknown as DocumentNode<GetAllCourtsQuery, GetAllCourtsQueryVariables>;
export const GetAllTournamentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTournaments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTournaments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalRecords"}},{"kind":"Field","name":{"kind":"Name","value":"tournaments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"bracket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTournamentsQuery, GetAllTournamentsQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"otpSecret"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"clubs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userRoleClub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetStepsOfUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStepsOfUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStepsOfUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetStepsOfUserQuery, GetStepsOfUserQueryVariables>;
export const GetPermissionsByRoleIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPermissionsByRoleId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPermissionsByRoleId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"moduleId"}},{"kind":"Field","name":{"kind":"Name","value":"moduleName"}},{"kind":"Field","name":{"kind":"Name","value":"policyId"}},{"kind":"Field","name":{"kind":"Name","value":"policyName"}}]}}]}}]} as unknown as DocumentNode<GetPermissionsByRoleIdQuery, GetPermissionsByRoleIdQueryVariables>;