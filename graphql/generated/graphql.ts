/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
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

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponseDto;
  refreshToken: RefreshTokenResponseDto;
  register: RegisterResponseDto;
};


export type MutationLoginArgs = {
  input: LoginInputDto;
};


export type MutationRegisterArgs = {
  input: RegisterInputDto;
};

export type Query = {
  __typename?: 'Query';
  getAllStepsByRole: Array<Step>;
  getStepsOfUser: Array<Step>;
  getUsers: Array<User>;
};


export type QueryGetAllStepsByRoleArgs = {
  input: StepsByRoleDto;
};


export type QueryGetStepsOfUserArgs = {
  input: StepsOfUserDto;
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

export type RegisterResponseDto = {
  __typename?: 'RegisterResponseDto';
  message: Scalars['String']['output'];
};

export type Step = {
  __typename?: 'Step';
  id: Scalars['ID']['output'];
  name: StepNames;
};

export enum StepNames {
  ClubInformationInsertion = 'CLUB_INFORMATION_INSERTION',
  ClubSelection = 'CLUB_SELECTION',
  EmailVerification = 'EMAIL_VERIFICATION',
  Registration = 'REGISTRATION',
  UserTypeSelection = 'USER_TYPE_SELECTION'
}

export type StepsByRoleDto = {
  role: Scalars['String']['input'];
};

export type StepsOfUserDto = {
  userId: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  otpSecret: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInputDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponseDto', message: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInputDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponseDto', authTokens: { __typename?: 'RefreshTokenResponseDto', accessToken: string, expiresIn: number, refreshToken: string }, user: { __typename?: 'User', id: string, email: string, name: string, created_at: any, profileImage?: string | null, updated_at: any } } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenResponseDto', accessToken: string, expiresIn: number, refreshToken: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, email: string, name: string }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const RegisterDocument = new TypedDocumentString(`
    mutation Register($input: RegisterInputDto!) {
  register(input: $input) {
    message
  }
}
    `) as unknown as TypedDocumentString<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = new TypedDocumentString(`
    mutation Login($input: LoginInputDto!) {
  login(input: $input) {
    authTokens {
      accessToken
      expiresIn
      refreshToken
    }
    user {
      id
      email
      name
      created_at
      profileImage
      updated_at
    }
  }
}
    `) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = new TypedDocumentString(`
    mutation RefreshToken {
  refreshToken {
    accessToken
    expiresIn
    refreshToken
  }
}
    `) as unknown as TypedDocumentString<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const GetUsersDocument = new TypedDocumentString(`
    query GetUsers {
  getUsers {
    id
    email
    name
  }
}
    `) as unknown as TypedDocumentString<GetUsersQuery, GetUsersQueryVariables>;