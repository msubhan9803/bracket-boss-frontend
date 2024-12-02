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
  matches: Array<Match>;
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

export type CreateScheduleInputDto = {
  clubId: Scalars['Float']['input'];
  matches: Array<MatchInput>;
  tournamentId: Scalars['Float']['input'];
};

export type CreateScheduleResponseDto = {
  __typename?: 'CreateScheduleResponseDto';
  schedule: ScheduleDto;
};

export type CreateTeamInputDto = {
  clubId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  tournamentId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']>;
};

export type CreateTournamentInputDto = {
  clubId: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  end_date: Scalars['DateTime']['input'];
  formatId: Scalars['Float']['input'];
  isPrivate: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  splitSwitchGroupBy?: InputMaybe<GroupByEnum>;
  start_date: Scalars['DateTime']['input'];
  teamGenerationTypeId: Scalars['Float']['input'];
};

export type DeleteScheduleInputDto = {
  tournamentId: Scalars['Float']['input'];
};

export type DeleteScheduleResponseDto = {
  __typename?: 'DeleteScheduleResponseDto';
  message: Scalars['String']['output'];
};

export type Format = {
  __typename?: 'Format';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  name: FormatType;
  teamGenerationTypes: Array<TeamGenerationType>;
  updated_at: Scalars['DateTime']['output'];
};

export enum FormatType {
  DoubleElimination = 'double_elimination',
  RoundRobin = 'round_robin',
  SingleElimination = 'single_elimination'
}

export enum GenderTypes {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type GetScheduleOfTournamentInput = {
  tournamentId: Scalars['Float']['input'];
};

export type GetScheduleOfTournamentResponseDto = {
  __typename?: 'GetScheduleOfTournamentResponseDto';
  schedule: ScheduleDto;
};

export type GetSchedulePreperationDataOfTournamentInput = {
  tournamentId: Scalars['Float']['input'];
  users: Array<Scalars['Float']['input']>;
};

export type GetSchedulePreperationDataOfTournamentResponseDto = {
  __typename?: 'GetSchedulePreperationDataOfTournamentResponseDto';
  matches: Array<MatchType>;
  teams: Array<TeamType>;
};

export enum GroupByEnum {
  Gender = 'GENDER',
  Rating = 'RATING'
}

export type LoginInputDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponseDto = {
  __typename?: 'LoginResponseDto';
  authTokens: RefreshTokenResponseDto;
  user: User;
};

export type Match = {
  __typename?: 'Match';
  awayTeam: Team;
  club: Club;
  courts: Array<Court>;
  created_at: Scalars['DateTime']['output'];
  homeTeam: Team;
  id: Scalars['CustomID']['output'];
  matchDate: Scalars['DateTime']['output'];
  matchRounds: Array<MatchRound>;
  statuses: Array<MatchStatus>;
  tournament: Tournament;
  tournamentRound: TournamentRound;
  updated_at: Scalars['DateTime']['output'];
  winnerTeam?: Maybe<Team>;
};

export type MatchInput = {
  matchDate: Scalars['DateTime']['input'];
  teams: Array<TeamInput>;
};

export type MatchRound = {
  __typename?: 'MatchRound';
  club: Club;
  created_at: Scalars['DateTime']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  match: Match;
  matchRoundNumber: Scalars['Float']['output'];
  matchRoundScores: Array<MatchRoundScore>;
  startTime: Scalars['DateTime']['output'];
  statuses: Array<MatchRoundStatus>;
  tournament: Tournament;
  updated_at: Scalars['DateTime']['output'];
  winnerTeam?: Maybe<Team>;
};

export type MatchRoundScore = {
  __typename?: 'MatchRoundScore';
  club: Club;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  matchRound: MatchRound;
  player: User;
  score: Scalars['Float']['output'];
  team: Team;
  tournament: Tournament;
  updated_at: Scalars['DateTime']['output'];
};

export type MatchRoundStatus = {
  __typename?: 'MatchRoundStatus';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  matchRounds: Array<MatchRound>;
  status: MatchRoundStatusTypes;
  updated_at: Scalars['DateTime']['output'];
};

export enum MatchRoundStatusTypes {
  Completed = 'completed',
  InProgress = 'in_progress',
  NotStarted = 'not_started',
  Paused = 'paused',
  Void = 'void'
}

export type MatchStatus = {
  __typename?: 'MatchStatus';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  matches: Array<Match>;
  status: MatchStatusTypes;
  updated_at: Scalars['DateTime']['output'];
};

export enum MatchStatusTypes {
  Completed = 'completed',
  InProgress = 'in_progress',
  NotStarted = 'not_started',
  Paused = 'paused',
  Void = 'void'
}

export type MatchType = {
  __typename?: 'MatchType';
  name: Scalars['String']['output'];
  teams: Array<TeamType>;
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
  createSchedule: CreateScheduleResponseDto;
  createTeam: Team;
  createTournament: Tournament;
  deleteSchedule: DeleteScheduleResponseDto;
  /** Download empty schedule template */
  downloadEmptyScheduleTemplate: Scalars['String']['output'];
  /** Download user data for schedule */
  downloadUserDataForSchedule: Scalars['String']['output'];
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


export type MutationCreateScheduleArgs = {
  input: CreateScheduleInputDto;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInputDto;
};


export type MutationCreateTournamentArgs = {
  input: CreateTournamentInputDto;
};


export type MutationDeleteScheduleArgs = {
  input: DeleteScheduleInputDto;
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
  getAllClubs: Array<Club>;
  getAllCourts: CourtListResponse;
  getAllFormats: Array<Format>;
  getAllStepsByRole: Array<Step>;
  getAllTeamGenerationTypesByFormatId: Array<TeamGenerationType>;
  getAllTeams: TeamListResponse;
  getAllTournaments: TournamentListResponse;
  getAllTournamentsWithoutPagination: Array<Tournament>;
  getAllUsers: UserListResponse;
  getAllUsersWithoutPagination: Array<User>;
  getClubById: Club;
  getCourtById: Court;
  getPermissionsByRoleId: Array<PermissionByRoleIdResponse>;
  getScheduleOfTournament: GetScheduleOfTournamentResponseDto;
  getSchedulePreperationDataOfTournament: GetSchedulePreperationDataOfTournamentResponseDto;
  getStepsOfUser: Array<Step>;
  getTournamentById: Tournament;
  getUserById: UserWithRoleClub;
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


export type QueryGetAllTeamGenerationTypesByFormatIdArgs = {
  formatId: Scalars['Float']['input'];
};


export type QueryGetAllTeamsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryGetAllTournamentsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryGetAllUsersArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortInput>;
  userRole?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetAllUsersWithoutPaginationArgs = {
  userRole?: InputMaybe<Scalars['Float']['input']>;
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


export type QueryGetScheduleOfTournamentArgs = {
  input: GetScheduleOfTournamentInput;
};


export type QueryGetSchedulePreperationDataOfTournamentArgs = {
  input: GetSchedulePreperationDataOfTournamentInput;
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

export type ScheduleDto = {
  __typename?: 'ScheduleDto';
  matchRounds: Array<MatchRound>;
  matches: Array<Match>;
  teams: Array<Team>;
  tournament: Tournament;
  tournamentRounds: Array<TournamentRound>;
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

export type Team = {
  __typename?: 'Team';
  club: Club;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  name: Scalars['String']['output'];
  statuses: Array<TeamStatus>;
  tournament: Tournament;
  updatedDate: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

export type TeamGenerationType = {
  __typename?: 'TeamGenerationType';
  created_at: Scalars['DateTime']['output'];
  formats: Array<Format>;
  id: Scalars['CustomID']['output'];
  name: TeamGenerationTypeEnum;
  updated_at: Scalars['DateTime']['output'];
};

export enum TeamGenerationTypeEnum {
  BlindDraw = 'blind_draw',
  SplitSwitch = 'split_switch'
}

export type TeamInput = {
  name: Scalars['String']['input'];
  userIds: Array<Scalars['Float']['input']>;
};

export type TeamListResponse = {
  __typename?: 'TeamListResponse';
  teams: Array<Team>;
  totalRecords: Scalars['Int']['output'];
};

export type TeamStatus = {
  __typename?: 'TeamStatus';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  status: TeamStatusTypes;
  teams: Array<Team>;
  updated_at: Scalars['DateTime']['output'];
};

export enum TeamStatusTypes {
  ComingUp = 'coming_up',
  Disqualified = 'disqualified',
  Idle = 'idle',
  NotAssigned = 'not_assigned',
  Playing = 'playing',
  Removed = 'removed'
}

export type TeamType = {
  __typename?: 'TeamType';
  name: Scalars['String']['output'];
  players: Array<User>;
};

export type Tournament = {
  __typename?: 'Tournament';
  bestOfRounds: Scalars['Float']['output'];
  club: Club;
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  end_date: Scalars['DateTime']['output'];
  format: Format;
  id: Scalars['CustomID']['output'];
  isPrivate: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  playOffMatchesType: Format;
  splitSwitchGroupBy?: Maybe<GroupByEnum>;
  sport: Sport;
  start_date: Scalars['DateTime']['output'];
  statuses: Array<TournamentStatus>;
  teamGenerationType: TeamGenerationType;
  tournamentRounds: Array<TournamentRound>;
  updated_at: Scalars['DateTime']['output'];
};

export type TournamentListResponse = {
  __typename?: 'TournamentListResponse';
  totalRecords: Scalars['Int']['output'];
  tournaments: Array<Tournament>;
};

export type TournamentRound = {
  __typename?: 'TournamentRound';
  club: Club;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  matches: Array<Match>;
  roundFormat: Format;
  roundNumber: Scalars['Float']['output'];
  statuses: Array<TournamentRoundStatus>;
  tournament: Tournament;
  updated_at: Scalars['DateTime']['output'];
};

export type TournamentRoundStatus = {
  __typename?: 'TournamentRoundStatus';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  status: TournamentRoundStatusTypes;
  tournamentRounds: Array<TournamentRound>;
  updated_at: Scalars['DateTime']['output'];
};

export enum TournamentRoundStatusTypes {
  Completed = 'completed',
  InProgress = 'in_progress',
  NotStarted = 'not_started'
}

export type TournamentStatus = {
  __typename?: 'TournamentStatus';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['CustomID']['output'];
  status: TournamentStatusTypes;
  tournaments: Array<Tournament>;
  updated_at: Scalars['DateTime']['output'];
};

export enum TournamentStatusTypes {
  Completed = 'completed',
  InProgress = 'in_progress',
  NotStarted = 'not_started'
}

export type UpdateTournamentInput = {
  clubId: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  end_date: Scalars['DateTime']['input'];
  formatId: Scalars['Float']['input'];
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
  gender: GenderTypes;
  id: Scalars['CustomID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  otpSecret: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
  steps?: Maybe<Array<Step>>;
  teams?: Maybe<Array<Team>>;
  updated_at: Scalars['DateTime']['output'];
  userRoleClub?: Maybe<Array<UserRoleClub>>;
};

export type UserListResponse = {
  __typename?: 'UserListResponse';
  totalRecords: Scalars['Int']['output'];
  users: Array<User>;
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

export type CreateScheduleMutationVariables = Exact<{
  input: CreateScheduleInputDto;
}>;


export type CreateScheduleMutation = { __typename?: 'Mutation', createSchedule: { __typename?: 'CreateScheduleResponseDto', schedule: { __typename?: 'ScheduleDto', tournament: { __typename?: 'Tournament', id: any, name: string }, tournamentRounds: Array<{ __typename?: 'TournamentRound', id: any, roundNumber: number, roundFormat: { __typename?: 'Format', name: FormatType } }>, matches: Array<{ __typename?: 'Match', id: any, homeTeam: { __typename?: 'Team', name: string }, awayTeam: { __typename?: 'Team', name: string }, statuses: Array<{ __typename?: 'MatchStatus', status: MatchStatusTypes }>, courts: Array<{ __typename?: 'Court', name: string }> }>, teams: Array<{ __typename?: 'Team', name: string }> } } };

export type DeleteScheduleMutationVariables = Exact<{
  input: DeleteScheduleInputDto;
}>;


export type DeleteScheduleMutation = { __typename?: 'Mutation', deleteSchedule: { __typename?: 'DeleteScheduleResponseDto', message: string } };

export type DownloadUserDataForScheduleMutationVariables = Exact<{ [key: string]: never; }>;


export type DownloadUserDataForScheduleMutation = { __typename?: 'Mutation', downloadUserDataForSchedule: string };

export type DownloadEmptyScheduleTemplateMutationVariables = Exact<{ [key: string]: never; }>;


export type DownloadEmptyScheduleTemplateMutation = { __typename?: 'Mutation', downloadEmptyScheduleTemplate: string };

export type CreateTeamMutationVariables = Exact<{
  input: CreateTeamInputDto;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', createdDate: any, id: any, name: string, updatedDate: any, tournament: { __typename?: 'Tournament', id: any }, club: { __typename?: 'Club', id: any } } };

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

export type GetAllFormatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFormatsQuery = { __typename?: 'Query', getAllFormats: Array<{ __typename?: 'Format', id: any, name: FormatType }> };

export type GetSchedulePreperationDataOfTournamentQueryVariables = Exact<{
  input: GetSchedulePreperationDataOfTournamentInput;
}>;


export type GetSchedulePreperationDataOfTournamentQuery = { __typename?: 'Query', getSchedulePreperationDataOfTournament: { __typename?: 'GetSchedulePreperationDataOfTournamentResponseDto', matches: Array<{ __typename?: 'MatchType', name: string, teams: Array<{ __typename?: 'TeamType', name: string, players: Array<{ __typename?: 'User', id: any, name: string }> }> }> } };

export type GetScheduleOfTournamentQueryVariables = Exact<{
  input: GetScheduleOfTournamentInput;
}>;


export type GetScheduleOfTournamentQuery = { __typename?: 'Query', getScheduleOfTournament: { __typename?: 'GetScheduleOfTournamentResponseDto', schedule: { __typename?: 'ScheduleDto', tournament: { __typename?: 'Tournament', id: any, name: string, description: string }, tournamentRounds: Array<{ __typename?: 'TournamentRound', id: any, roundNumber: number, roundFormat: { __typename?: 'Format', name: FormatType }, matches: Array<{ __typename?: 'Match', awayTeam: { __typename?: 'Team', name: string }, homeTeam: { __typename?: 'Team', name: string }, courts: Array<{ __typename?: 'Court', name: string }>, matchRounds: Array<{ __typename?: 'MatchRound', matchRoundNumber: number, startTime: any, endTime: any, matchRoundScores: Array<{ __typename?: 'MatchRoundScore', id: any, score: number }> }> }> }>, matches: Array<{ __typename?: 'Match', awayTeam: { __typename?: 'Team', name: string, users?: Array<{ __typename?: 'User', id: any, name: string }> | null }, homeTeam: { __typename?: 'Team', name: string, users?: Array<{ __typename?: 'User', id: any, name: string }> | null } }> } } };

export type GetAllTeamGenerationTypesByFormatIdQueryVariables = Exact<{
  formatId: Scalars['Float']['input'];
}>;


export type GetAllTeamGenerationTypesByFormatIdQuery = { __typename?: 'Query', getAllTeamGenerationTypesByFormatId: Array<{ __typename?: 'TeamGenerationType', id: any, name: TeamGenerationTypeEnum }> };

export type GetAllTeamsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type GetAllTeamsQuery = { __typename?: 'Query', getAllTeams: { __typename?: 'TeamListResponse', totalRecords: number, teams: Array<{ __typename?: 'Team', id: any, name: string, tournament: { __typename?: 'Tournament', name: string }, club: { __typename?: 'Club', name: string }, users?: Array<{ __typename?: 'User', name: string }> | null }> } };

export type GetAllTournamentsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type GetAllTournamentsQuery = { __typename?: 'Query', getAllTournaments: { __typename?: 'TournamentListResponse', totalRecords: number, tournaments: Array<{ __typename?: 'Tournament', id: any, name: string, description: string, start_date: any, end_date: any, isPrivate: boolean, created_at: any, updated_at: any, splitSwitchGroupBy?: GroupByEnum | null, format: { __typename?: 'Format', name: FormatType }, teamGenerationType: { __typename?: 'TeamGenerationType', name: TeamGenerationTypeEnum }, club: { __typename?: 'Club', name: string }, sport: { __typename?: 'Sport', name: SportName } }> } };

export type GetAllTournamentsWithoutPaginationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTournamentsWithoutPaginationQuery = { __typename?: 'Query', getAllTournamentsWithoutPagination: Array<{ __typename?: 'Tournament', created_at: any, description: string, end_date: any, id: any, isPrivate: boolean, name: string, start_date: any, updated_at: any }> };

export type GetTournamentByIdQueryVariables = Exact<{
  tournamentId: Scalars['Float']['input'];
}>;


export type GetTournamentByIdQuery = { __typename?: 'Query', getTournamentById: { __typename?: 'Tournament', created_at: any, description: string, end_date: any, id: any, isPrivate: boolean, name: string, start_date: any, updated_at: any, splitSwitchGroupBy?: GroupByEnum | null, format: { __typename?: 'Format', name: FormatType }, teamGenerationType: { __typename?: 'TeamGenerationType', name: TeamGenerationTypeEnum } } };

export type GetAllUsersWithoutPaginationQueryVariables = Exact<{
  userRole?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAllUsersWithoutPaginationQuery = { __typename?: 'Query', getAllUsersWithoutPagination: Array<{ __typename?: 'User', created_at: any, email: string, id: any, isEmailVerified: boolean, name: string, otpSecret: string, profileImage?: string | null, updated_at: any }> };

export type GetAllUsersQueryVariables = Exact<{
  userRole?: InputMaybe<Scalars['Float']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: { __typename?: 'UserListResponse', totalRecords: number, users: Array<{ __typename?: 'User', id: any, email: string, name: string, userRoleClub?: Array<{ __typename?: 'UserRoleClub', role?: { __typename?: 'Role', id: any, name: string } | null }> | null }> } };

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
export const CreateScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScheduleInputDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournament"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tournamentRounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roundNumber"}},{"kind":"Field","name":{"kind":"Name","value":"roundFormat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"homeTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"awayTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statuses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateScheduleMutation, CreateScheduleMutationVariables>;
export const DeleteScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteScheduleInputDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteScheduleMutation, DeleteScheduleMutationVariables>;
export const DownloadUserDataForScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DownloadUserDataForSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadUserDataForSchedule"}}]}}]} as unknown as DocumentNode<DownloadUserDataForScheduleMutation, DownloadUserDataForScheduleMutationVariables>;
export const DownloadEmptyScheduleTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DownloadEmptyScheduleTemplate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadEmptyScheduleTemplate"}}]}}]} as unknown as DocumentNode<DownloadEmptyScheduleTemplateMutation, DownloadEmptyScheduleTemplateMutationVariables>;
export const CreateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeamInputDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedDate"}},{"kind":"Field","name":{"kind":"Name","value":"tournament"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const CreateTournamentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTournament"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTournamentInputDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<CreateTournamentMutation, CreateTournamentMutationVariables>;
export const UpdateUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserRoleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"userRoleClub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
export const UpdateUserClubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserClub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserClubDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserClub"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserClubMutation, UpdateUserClubMutationVariables>;
export const GetAllClubsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllClubs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllClubs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"updatedDate"}}]}}]}}]} as unknown as DocumentNode<GetAllClubsQuery, GetAllClubsQueryVariables>;
export const GetAllCourtsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCourts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCourts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalRecords"}}]}}]}}]} as unknown as DocumentNode<GetAllCourtsQuery, GetAllCourtsQueryVariables>;
export const GetAllFormatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllFormats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllFormats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllFormatsQuery, GetAllFormatsQueryVariables>;
export const GetSchedulePreperationDataOfTournamentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSchedulePreperationDataOfTournament"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetSchedulePreperationDataOfTournamentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSchedulePreperationDataOfTournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSchedulePreperationDataOfTournamentQuery, GetSchedulePreperationDataOfTournamentQueryVariables>;
export const GetScheduleOfTournamentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScheduleOfTournament"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetScheduleOfTournamentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScheduleOfTournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournament"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tournamentRounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roundNumber"}},{"kind":"Field","name":{"kind":"Name","value":"roundFormat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"awayTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"homeTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"matchRounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matchRoundNumber"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"matchRoundScores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"awayTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"homeTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetScheduleOfTournamentQuery, GetScheduleOfTournamentQueryVariables>;
export const GetAllTeamGenerationTypesByFormatIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTeamGenerationTypesByFormatId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"formatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTeamGenerationTypesByFormatId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"formatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"formatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllTeamGenerationTypesByFormatIdQuery, GetAllTeamGenerationTypesByFormatIdQueryVariables>;
export const GetAllTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTeams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTeams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tournament"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalRecords"}}]}}]}}]} as unknown as DocumentNode<GetAllTeamsQuery, GetAllTeamsQueryVariables>;
export const GetAllTournamentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTournaments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTournaments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalRecords"}},{"kind":"Field","name":{"kind":"Name","value":"tournaments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"format"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamGenerationType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"splitSwitchGroupBy"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTournamentsQuery, GetAllTournamentsQueryVariables>;
export const GetAllTournamentsWithoutPaginationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTournamentsWithoutPagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTournamentsWithoutPagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<GetAllTournamentsWithoutPaginationQuery, GetAllTournamentsWithoutPaginationQueryVariables>;
export const GetTournamentByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTournamentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTournamentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tournamentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tournamentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"format"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamGenerationType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"splitSwitchGroupBy"}}]}}]}}]} as unknown as DocumentNode<GetTournamentByIdQuery, GetTournamentByIdQueryVariables>;
export const GetAllUsersWithoutPaginationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsersWithoutPagination"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userRole"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsersWithoutPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userRole"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userRole"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"otpSecret"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersWithoutPaginationQuery, GetAllUsersWithoutPaginationQueryVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userRole"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userRole"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userRole"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalRecords"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userRoleClub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"otpSecret"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"clubs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userRoleClub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetStepsOfUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStepsOfUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStepsOfUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetStepsOfUserQuery, GetStepsOfUserQueryVariables>;
export const GetPermissionsByRoleIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPermissionsByRoleId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPermissionsByRoleId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"moduleId"}},{"kind":"Field","name":{"kind":"Name","value":"moduleName"}},{"kind":"Field","name":{"kind":"Name","value":"policyId"}},{"kind":"Field","name":{"kind":"Name","value":"policyName"}}]}}]}}]} as unknown as DocumentNode<GetPermissionsByRoleIdQuery, GetPermissionsByRoleIdQueryVariables>;