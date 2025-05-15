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
    "\n  mutation UpsertCourt($input: UpsertCourtInputDto!) {\n    upsertCourt(input: $input) {\n      id\n      location\n      name\n      club {\n        id\n        name\n      }\n    }\n  }\n": types.UpsertCourtDocument,
    "\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation StartMatch($matchId: Float!) {\n    startMatch(matchId: $matchId) {\n      id\n      title\n      status\n    }\n  }\n": types.StartMatchDocument,
    "\n  mutation UpdateScore($input: UpdateMatchScoreInputDto!) {\n    updateScore(input: $input) {\n      awayTeamScore\n      created_at\n      homeTeamScore\n      id\n      updated_at\n    }\n  }\n": types.UpdateScoreDocument,
    "\n  mutation EndMatchRound($matchId: Float!, $roundId: Float!) {\n    endMatchRound(matchId: $matchId, roundId: $roundId) {\n      id\n      matchRoundNumber\n      status\n      created_at\n      updated_at\n    }\n  }\n": types.EndMatchRoundDocument,
    "\n  mutation StartMatchRound($matchId: Float!, $roundId: Float!) {\n    startMatchRound(matchId: $matchId, roundId: $roundId) {\n      created_at\n      id\n      matchRoundNumber\n      status\n      updated_at\n    }\n  }\n": types.StartMatchRoundDocument,
    "\n  mutation EndMatch($matchId: Float!) {\n    endMatch(matchId: $matchId) {\n      created_at\n      id\n      status\n      updated_at\n    }\n  }\n": types.EndMatchDocument,
    "\n  mutation CreateSchedule($tournamentId: Float!) {\n    createSchedule(tournamentId: $tournamentId) {\n      id\n      name\n      pools {\n        name\n        rounds {\n          id\n          name\n          matches {\n            id\n            title\n          }\n        }\n      }\n    }\n  }\n": types.CreateScheduleDocument,
    "\n  mutation EndRound($poolId: Float!, $levelId: Float!) {\n    endRound(poolId: $poolId, levelId: $levelId) {\n      message\n    }\n  }\n": types.EndRoundDocument,
    "\n  mutation ProceedToNextLevel($tournamentId: Float!) {\n    proceedToNextLevel(tournamentId: $tournamentId) {\n      message\n    }\n  }\n": types.ProceedToNextLevelDocument,
    "\n  mutation ConcludeTournament($tournamentId: Float!) {\n    concludeTournament(tournamentId: $tournamentId) {\n      message\n    }\n  }\n": types.ConcludeTournamentDocument,
    "\n  mutation DeleteSchedule($input: DeleteScheduleInputDto!) {\n    deleteSchedule(input: $input) {\n      message\n    }\n  }\n": types.DeleteScheduleDocument,
    "\n  mutation DownloadUserDataForSchedule {\n    downloadUserDataForSchedule\n  }\n": types.DownloadUserDataForScheduleDocument,
    "\n  mutation DownloadEmptyScheduleTemplate {\n    downloadEmptyScheduleTemplate\n  }\n": types.DownloadEmptyScheduleTemplateDocument,
    "\n  mutation BulkMatchImport($file: Upload!) {\n    bulkMatchImport(file: $file) {\n      message\n    }\n  }\n": types.BulkMatchImportDocument,
    "\n  mutation CreateTeam($input: CreateTeamInputDto!) {\n    createTeam(input: $input) {\n      createdDate\n      id\n      name\n      updatedDate\n      tournament {\n        id\n      }\n    }\n  }\n": types.CreateTeamDocument,
    "\n  mutation CreateTournamentTeam($input: CreateTournamentTeamsInputDto!) {\n    createTournamentTeam(input: $input) {\n      id\n      name\n      statusInTournament\n      createdDate\n      updatedDate\n      users {\n        name\n      }\n    }\n  }\n": types.CreateTournamentTeamDocument,
    "\n  mutation CreateTournament($input: CreateTournamentInputDto!) {\n    createTournament(input: $input) {\n      created_at\n      description\n      end_date\n      id\n      isPrivate\n      name\n      start_date\n      updated_at\n    }\n  }\n": types.CreateTournamentDocument,
    "\n  mutation StartTournament($tournamentId: Float!) {\n    startTournament(tournamentId: $tournamentId) {\n      id\n      name\n      status\n    }\n  }\n": types.StartTournamentDocument,
    "\n  mutation DeleteTournament($tournamentId: Float!) {\n    deleteTournament(tournamentId: $tournamentId) {\n      message\n    }\n  }\n": types.DeleteTournamentDocument,
    "\n  mutation UpdateUserRole($input: UpdateUserRoleDto!) {\n    updateUserRole(input: $input) {\n      message\n      userRoleClub {\n        created_at\n        id\n        role {\n          id\n        }\n        updated_at\n      }\n    }\n  }\n": types.UpdateUserRoleDocument,
    "\n  mutation UpdateUserClub($input: UpdateUserClubDto!) {\n    updateUserClub(input: $input) {\n      message\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n": types.UpdateUserClubDocument,
    "\n  query GetAllClubs {\n    getAllClubs {\n      createdDate\n      description\n      id\n      logo\n      name\n      slug\n      updatedDate\n    }\n  }\n": types.GetAllClubsDocument,
    "\n  query GetAllCourts(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllCourts(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      courts {\n        id\n        name\n        location\n        club {\n          name\n        }\n        courtLength\n        courtWidth\n        courtSchedules {\n          id\n          day {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n        }\n      }\n      totalRecords\n    }\n  }\n": types.GetAllCourtsDocument,
    "\n  query GetAllFormats {\n    getAllFormats {\n      id\n      name\n    }\n  }\n": types.GetAllFormatsDocument,
    "\n  query GetLevelsByTournament($tournamentId: Float!) {\n    getLevelsByTournament(tournamentId: $tournamentId) {\n      id\n      name\n      order\n      status\n      created_at\n      updated_at\n    }\n  }\n": types.GetLevelsByTournamentDocument,
    "\n  query GetLevelTeamStandingsByLevelId($levelId: Float!) {\n    getLevelTeamStandingsByLevelId(levelId: $levelId) {\n      created_at\n      id\n      losses\n      pointDiffByNumberOfGames\n      pointsAgainst\n      pointsAgainstByNumberOfGames\n      pointsScored\n      pointsScoredByNumberOfGames\n      updated_at\n      wins\n      team {\n        name\n        users {\n          name\n        }\n      }\n    }\n  }\n": types.GetLevelTeamStandingsByLevelIdDocument,
    "\n  query GetMatchesByRoundId($roundId: Float!) {\n    getMatchesByRoundId(roundId: $roundId) {\n      id\n      title\n      status\n      resultType\n      level {\n        order\n      }\n      pool {\n        name\n        order\n      }\n      round {\n        name\n        order\n        status\n      }\n      homeTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      awayTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      winnerTeam {\n        id\n        name\n      }\n      created_at\n      matchRounds {\n        matchRoundNumber\n        status\n        matchRoundScore {\n          id\n          homeTeamScore\n          awayTeamScore\n        }\n      }\n      tournament {\n        name\n      }\n      matchCourtSchedule {\n        matchDate\n        courtSchedule {\n          court {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n          day {\n            name\n          }\n        }\n      }\n      updated_at\n    }\n  }\n": types.GetMatchesByRoundIdDocument,
    "\n  query GetMatchByMatchId($matchId: Float!) {\n    getMatchByMatchId(matchId: $matchId) {\n      created_at\n      id\n      status\n      title\n      updated_at\n      matchCourtSchedule {\n        matchDate\n        courtSchedule {\n          court {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n          day {\n            name\n          }\n        }\n      }\n      homeTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      awayTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      matchRounds {\n        id\n        matchRoundNumber\n        status\n      }\n      pool {\n        name\n      }\n      matchRounds {\n        matchRoundNumber\n        status\n        matchRoundScore {\n          id\n          homeTeamScore\n          awayTeamScore\n        }\n      }\n    }\n  }\n": types.GetMatchByMatchIdDocument,
    "\n  query GetAllMatchesWithFilters($input: FilterMatchesInputDto!) {\n    getAllMatchesWithFilters(input: $input) {\n      id\n      title\n      status\n      level {\n        order\n      }\n      pool {\n        name\n        order\n      }\n      round {\n        name\n        order\n        status\n      }\n      homeTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      awayTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      created_at\n      matchRounds {\n        matchRoundNumber\n        status\n        matchRoundScore {\n          id\n          homeTeamScore\n          awayTeamScore\n        }\n      }\n      tournament {\n        name\n      }\n      matchCourtSchedule {\n        matchDate\n        courtSchedule {\n          court {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n          day {\n            name\n          }\n        }\n      }\n      updated_at\n    }\n  }\n": types.GetAllMatchesWithFiltersDocument,
    "\n  query GetPoolsByLevel($levelId: Float!) {\n    getPoolsByLevel(levelId: $levelId) {\n      created_at\n      id\n      name\n      order\n      updated_at\n    }\n  }\n": types.GetPoolsByLevelDocument,
    "\n  query GetRoundsByPoolId($poolId: Float!) {\n    getRoundsByPoolId(poolId: $poolId) {\n      id\n      name\n      order\n      status\n      created_at\n      updated_at\n    }\n  }\n": types.GetRoundsByPoolIdDocument,
    "\n  query GetScheduleOfTournament($input: GetScheduleOfTournamentInput!) {\n    getScheduleOfTournament(input: $input) {\n      id\n      name\n      order\n      pools {\n        id\n        name\n        order\n        rounds {\n          id\n          name\n          order\n          status\n          matches {\n            id\n            title\n            homeTeam {\n              name\n            }\n            awayTeam {\n              name\n            }\n            winnerTeam {\n              name\n            }\n            matchRounds {\n              id\n              matchRoundNumber\n            }\n            matchCourtSchedule {\n              matchDate\n              courtSchedule {\n                day {\n                  name\n                }\n                timeSlot {\n                  startTime\n                  endTime\n                }\n                court {\n                  name\n                  club {\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetScheduleOfTournamentDocument,
    "\n  query GetAllTeamGenerationTypesByFormatId($formatId: Float!) {\n    getAllTeamGenerationTypesByFormatId(formatId: $formatId) {\n      id\n      name\n    }\n  }\n": types.GetAllTeamGenerationTypesByFormatIdDocument,
    "\n  query GetAllTeams(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllTeams(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      teams {\n        id\n        name\n        tournament {\n          name\n        }\n        users {\n          name\n        }\n      }\n      totalRecords\n    }\n  }\n": types.GetAllTeamsDocument,
    "\n  query GetAllTeamsByTournamentId($tournamentId: Float!) {\n    getAllTeamsByTournamentId(tournamentId: $tournamentId) {\n      teams {\n        id\n        name\n        users {\n          isEmailVerified\n          name\n        }\n        statusInTournament\n      }\n    }\n  }\n": types.GetAllTeamsByTournamentIdDocument,
    "\n  query GetAllTournaments(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllTournaments(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      totalRecords\n      tournaments {\n        id\n        name\n        description\n        start_date\n        end_date\n        isPrivate\n        teamGenerationType {\n          name\n        }\n        sport {\n          name\n        }\n        splitSwitchGroupBy\n        created_at\n        updated_at\n      }\n    }\n  }\n": types.GetAllTournamentsDocument,
    "\n  query GetAllTournamentsWithoutPagination {\n    getAllTournamentsWithoutPagination {\n      created_at\n      description\n      end_date\n      id\n      isPrivate\n      name\n      start_date\n      updated_at\n    }\n  }\n": types.GetAllTournamentsWithoutPaginationDocument,
    "\n  query GetTournamentById($tournamentId: Float!) {\n    getTournamentById(tournamentId: $tournamentId) {\n      description\n      end_date\n      id\n      isPrivate\n      name\n      start_date\n      teamGenerationType {\n        name\n      }\n      levels {\n        id\n        name\n        status\n        pools {\n          name\n          rounds {\n            name\n          }\n        }\n        format {\n          id\n          name\n        }\n      }\n      rounds {\n        id\n        status\n      }\n      splitSwitchGroupBy\n      status\n      created_at\n      updated_at\n      tournamentResult {\n        winners {\n          team {\n            name\n          }\n          rank\n        }\n      }\n    }\n  }\n": types.GetTournamentByIdDocument,
    "\n  query GetAllUsersWithoutPagination($userRole: Float) {\n    getAllUsersWithoutPagination(userRole: $userRole) {\n      created_at\n      email\n      id\n      isEmailVerified\n      name\n      otpSecret\n      profileImage\n      updated_at\n    }\n  }\n": types.GetAllUsersWithoutPaginationDocument,
    "\n  query GetAllUsers(\n    $userRole: Float\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllUsers(\n      userRole: $userRole\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      totalRecords\n      users {\n        id\n        email\n        name\n        userRoleClub {\n          role {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetAllUsersDocument,
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
export function graphql(source: "\n  mutation UpsertCourt($input: UpsertCourtInputDto!) {\n    upsertCourt(input: $input) {\n      id\n      location\n      name\n      club {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertCourt($input: UpsertCourtInputDto!) {\n    upsertCourt(input: $input) {\n      id\n      location\n      name\n      club {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartMatch($matchId: Float!) {\n    startMatch(matchId: $matchId) {\n      id\n      title\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation StartMatch($matchId: Float!) {\n    startMatch(matchId: $matchId) {\n      id\n      title\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateScore($input: UpdateMatchScoreInputDto!) {\n    updateScore(input: $input) {\n      awayTeamScore\n      created_at\n      homeTeamScore\n      id\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateScore($input: UpdateMatchScoreInputDto!) {\n    updateScore(input: $input) {\n      awayTeamScore\n      created_at\n      homeTeamScore\n      id\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EndMatchRound($matchId: Float!, $roundId: Float!) {\n    endMatchRound(matchId: $matchId, roundId: $roundId) {\n      id\n      matchRoundNumber\n      status\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  mutation EndMatchRound($matchId: Float!, $roundId: Float!) {\n    endMatchRound(matchId: $matchId, roundId: $roundId) {\n      id\n      matchRoundNumber\n      status\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartMatchRound($matchId: Float!, $roundId: Float!) {\n    startMatchRound(matchId: $matchId, roundId: $roundId) {\n      created_at\n      id\n      matchRoundNumber\n      status\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  mutation StartMatchRound($matchId: Float!, $roundId: Float!) {\n    startMatchRound(matchId: $matchId, roundId: $roundId) {\n      created_at\n      id\n      matchRoundNumber\n      status\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EndMatch($matchId: Float!) {\n    endMatch(matchId: $matchId) {\n      created_at\n      id\n      status\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  mutation EndMatch($matchId: Float!) {\n    endMatch(matchId: $matchId) {\n      created_at\n      id\n      status\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSchedule($tournamentId: Float!) {\n    createSchedule(tournamentId: $tournamentId) {\n      id\n      name\n      pools {\n        name\n        rounds {\n          id\n          name\n          matches {\n            id\n            title\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSchedule($tournamentId: Float!) {\n    createSchedule(tournamentId: $tournamentId) {\n      id\n      name\n      pools {\n        name\n        rounds {\n          id\n          name\n          matches {\n            id\n            title\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EndRound($poolId: Float!, $levelId: Float!) {\n    endRound(poolId: $poolId, levelId: $levelId) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation EndRound($poolId: Float!, $levelId: Float!) {\n    endRound(poolId: $poolId, levelId: $levelId) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ProceedToNextLevel($tournamentId: Float!) {\n    proceedToNextLevel(tournamentId: $tournamentId) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation ProceedToNextLevel($tournamentId: Float!) {\n    proceedToNextLevel(tournamentId: $tournamentId) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConcludeTournament($tournamentId: Float!) {\n    concludeTournament(tournamentId: $tournamentId) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation ConcludeTournament($tournamentId: Float!) {\n    concludeTournament(tournamentId: $tournamentId) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSchedule($input: DeleteScheduleInputDto!) {\n    deleteSchedule(input: $input) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSchedule($input: DeleteScheduleInputDto!) {\n    deleteSchedule(input: $input) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DownloadUserDataForSchedule {\n    downloadUserDataForSchedule\n  }\n"): (typeof documents)["\n  mutation DownloadUserDataForSchedule {\n    downloadUserDataForSchedule\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DownloadEmptyScheduleTemplate {\n    downloadEmptyScheduleTemplate\n  }\n"): (typeof documents)["\n  mutation DownloadEmptyScheduleTemplate {\n    downloadEmptyScheduleTemplate\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation BulkMatchImport($file: Upload!) {\n    bulkMatchImport(file: $file) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation BulkMatchImport($file: Upload!) {\n    bulkMatchImport(file: $file) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTeam($input: CreateTeamInputDto!) {\n    createTeam(input: $input) {\n      createdDate\n      id\n      name\n      updatedDate\n      tournament {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTeam($input: CreateTeamInputDto!) {\n    createTeam(input: $input) {\n      createdDate\n      id\n      name\n      updatedDate\n      tournament {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTournamentTeam($input: CreateTournamentTeamsInputDto!) {\n    createTournamentTeam(input: $input) {\n      id\n      name\n      statusInTournament\n      createdDate\n      updatedDate\n      users {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTournamentTeam($input: CreateTournamentTeamsInputDto!) {\n    createTournamentTeam(input: $input) {\n      id\n      name\n      statusInTournament\n      createdDate\n      updatedDate\n      users {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTournament($input: CreateTournamentInputDto!) {\n    createTournament(input: $input) {\n      created_at\n      description\n      end_date\n      id\n      isPrivate\n      name\n      start_date\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTournament($input: CreateTournamentInputDto!) {\n    createTournament(input: $input) {\n      created_at\n      description\n      end_date\n      id\n      isPrivate\n      name\n      start_date\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartTournament($tournamentId: Float!) {\n    startTournament(tournamentId: $tournamentId) {\n      id\n      name\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation StartTournament($tournamentId: Float!) {\n    startTournament(tournamentId: $tournamentId) {\n      id\n      name\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTournament($tournamentId: Float!) {\n    deleteTournament(tournamentId: $tournamentId) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteTournament($tournamentId: Float!) {\n    deleteTournament(tournamentId: $tournamentId) {\n      message\n    }\n  }\n"];
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
export function graphql(source: "\n  query GetAllCourts(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllCourts(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      courts {\n        id\n        name\n        location\n        club {\n          name\n        }\n        courtLength\n        courtWidth\n        courtSchedules {\n          id\n          day {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n        }\n      }\n      totalRecords\n    }\n  }\n"): (typeof documents)["\n  query GetAllCourts(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllCourts(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      courts {\n        id\n        name\n        location\n        club {\n          name\n        }\n        courtLength\n        courtWidth\n        courtSchedules {\n          id\n          day {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n        }\n      }\n      totalRecords\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllFormats {\n    getAllFormats {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAllFormats {\n    getAllFormats {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLevelsByTournament($tournamentId: Float!) {\n    getLevelsByTournament(tournamentId: $tournamentId) {\n      id\n      name\n      order\n      status\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  query GetLevelsByTournament($tournamentId: Float!) {\n    getLevelsByTournament(tournamentId: $tournamentId) {\n      id\n      name\n      order\n      status\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLevelTeamStandingsByLevelId($levelId: Float!) {\n    getLevelTeamStandingsByLevelId(levelId: $levelId) {\n      created_at\n      id\n      losses\n      pointDiffByNumberOfGames\n      pointsAgainst\n      pointsAgainstByNumberOfGames\n      pointsScored\n      pointsScoredByNumberOfGames\n      updated_at\n      wins\n      team {\n        name\n        users {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLevelTeamStandingsByLevelId($levelId: Float!) {\n    getLevelTeamStandingsByLevelId(levelId: $levelId) {\n      created_at\n      id\n      losses\n      pointDiffByNumberOfGames\n      pointsAgainst\n      pointsAgainstByNumberOfGames\n      pointsScored\n      pointsScoredByNumberOfGames\n      updated_at\n      wins\n      team {\n        name\n        users {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMatchesByRoundId($roundId: Float!) {\n    getMatchesByRoundId(roundId: $roundId) {\n      id\n      title\n      status\n      resultType\n      level {\n        order\n      }\n      pool {\n        name\n        order\n      }\n      round {\n        name\n        order\n        status\n      }\n      homeTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      awayTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      winnerTeam {\n        id\n        name\n      }\n      created_at\n      matchRounds {\n        matchRoundNumber\n        status\n        matchRoundScore {\n          id\n          homeTeamScore\n          awayTeamScore\n        }\n      }\n      tournament {\n        name\n      }\n      matchCourtSchedule {\n        matchDate\n        courtSchedule {\n          court {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n          day {\n            name\n          }\n        }\n      }\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  query GetMatchesByRoundId($roundId: Float!) {\n    getMatchesByRoundId(roundId: $roundId) {\n      id\n      title\n      status\n      resultType\n      level {\n        order\n      }\n      pool {\n        name\n        order\n      }\n      round {\n        name\n        order\n        status\n      }\n      homeTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      awayTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      winnerTeam {\n        id\n        name\n      }\n      created_at\n      matchRounds {\n        matchRoundNumber\n        status\n        matchRoundScore {\n          id\n          homeTeamScore\n          awayTeamScore\n        }\n      }\n      tournament {\n        name\n      }\n      matchCourtSchedule {\n        matchDate\n        courtSchedule {\n          court {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n          day {\n            name\n          }\n        }\n      }\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMatchByMatchId($matchId: Float!) {\n    getMatchByMatchId(matchId: $matchId) {\n      created_at\n      id\n      status\n      title\n      updated_at\n      matchCourtSchedule {\n        matchDate\n        courtSchedule {\n          court {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n          day {\n            name\n          }\n        }\n      }\n      homeTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      awayTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      matchRounds {\n        id\n        matchRoundNumber\n        status\n      }\n      pool {\n        name\n      }\n      matchRounds {\n        matchRoundNumber\n        status\n        matchRoundScore {\n          id\n          homeTeamScore\n          awayTeamScore\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMatchByMatchId($matchId: Float!) {\n    getMatchByMatchId(matchId: $matchId) {\n      created_at\n      id\n      status\n      title\n      updated_at\n      matchCourtSchedule {\n        matchDate\n        courtSchedule {\n          court {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n          day {\n            name\n          }\n        }\n      }\n      homeTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      awayTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      matchRounds {\n        id\n        matchRoundNumber\n        status\n      }\n      pool {\n        name\n      }\n      matchRounds {\n        matchRoundNumber\n        status\n        matchRoundScore {\n          id\n          homeTeamScore\n          awayTeamScore\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllMatchesWithFilters($input: FilterMatchesInputDto!) {\n    getAllMatchesWithFilters(input: $input) {\n      id\n      title\n      status\n      level {\n        order\n      }\n      pool {\n        name\n        order\n      }\n      round {\n        name\n        order\n        status\n      }\n      homeTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      awayTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      created_at\n      matchRounds {\n        matchRoundNumber\n        status\n        matchRoundScore {\n          id\n          homeTeamScore\n          awayTeamScore\n        }\n      }\n      tournament {\n        name\n      }\n      matchCourtSchedule {\n        matchDate\n        courtSchedule {\n          court {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n          day {\n            name\n          }\n        }\n      }\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  query GetAllMatchesWithFilters($input: FilterMatchesInputDto!) {\n    getAllMatchesWithFilters(input: $input) {\n      id\n      title\n      status\n      level {\n        order\n      }\n      pool {\n        name\n        order\n      }\n      round {\n        name\n        order\n        status\n      }\n      homeTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      awayTeam {\n        id\n        name\n        users {\n          id\n          name\n        }\n      }\n      created_at\n      matchRounds {\n        matchRoundNumber\n        status\n        matchRoundScore {\n          id\n          homeTeamScore\n          awayTeamScore\n        }\n      }\n      tournament {\n        name\n      }\n      matchCourtSchedule {\n        matchDate\n        courtSchedule {\n          court {\n            name\n          }\n          timeSlot {\n            startTime\n            endTime\n          }\n          day {\n            name\n          }\n        }\n      }\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPoolsByLevel($levelId: Float!) {\n    getPoolsByLevel(levelId: $levelId) {\n      created_at\n      id\n      name\n      order\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  query GetPoolsByLevel($levelId: Float!) {\n    getPoolsByLevel(levelId: $levelId) {\n      created_at\n      id\n      name\n      order\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRoundsByPoolId($poolId: Float!) {\n    getRoundsByPoolId(poolId: $poolId) {\n      id\n      name\n      order\n      status\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  query GetRoundsByPoolId($poolId: Float!) {\n    getRoundsByPoolId(poolId: $poolId) {\n      id\n      name\n      order\n      status\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetScheduleOfTournament($input: GetScheduleOfTournamentInput!) {\n    getScheduleOfTournament(input: $input) {\n      id\n      name\n      order\n      pools {\n        id\n        name\n        order\n        rounds {\n          id\n          name\n          order\n          status\n          matches {\n            id\n            title\n            homeTeam {\n              name\n            }\n            awayTeam {\n              name\n            }\n            winnerTeam {\n              name\n            }\n            matchRounds {\n              id\n              matchRoundNumber\n            }\n            matchCourtSchedule {\n              matchDate\n              courtSchedule {\n                day {\n                  name\n                }\n                timeSlot {\n                  startTime\n                  endTime\n                }\n                court {\n                  name\n                  club {\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetScheduleOfTournament($input: GetScheduleOfTournamentInput!) {\n    getScheduleOfTournament(input: $input) {\n      id\n      name\n      order\n      pools {\n        id\n        name\n        order\n        rounds {\n          id\n          name\n          order\n          status\n          matches {\n            id\n            title\n            homeTeam {\n              name\n            }\n            awayTeam {\n              name\n            }\n            winnerTeam {\n              name\n            }\n            matchRounds {\n              id\n              matchRoundNumber\n            }\n            matchCourtSchedule {\n              matchDate\n              courtSchedule {\n                day {\n                  name\n                }\n                timeSlot {\n                  startTime\n                  endTime\n                }\n                court {\n                  name\n                  club {\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTeamGenerationTypesByFormatId($formatId: Float!) {\n    getAllTeamGenerationTypesByFormatId(formatId: $formatId) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAllTeamGenerationTypesByFormatId($formatId: Float!) {\n    getAllTeamGenerationTypesByFormatId(formatId: $formatId) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTeams(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllTeams(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      teams {\n        id\n        name\n        tournament {\n          name\n        }\n        users {\n          name\n        }\n      }\n      totalRecords\n    }\n  }\n"): (typeof documents)["\n  query GetAllTeams(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllTeams(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      teams {\n        id\n        name\n        tournament {\n          name\n        }\n        users {\n          name\n        }\n      }\n      totalRecords\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTeamsByTournamentId($tournamentId: Float!) {\n    getAllTeamsByTournamentId(tournamentId: $tournamentId) {\n      teams {\n        id\n        name\n        users {\n          isEmailVerified\n          name\n        }\n        statusInTournament\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllTeamsByTournamentId($tournamentId: Float!) {\n    getAllTeamsByTournamentId(tournamentId: $tournamentId) {\n      teams {\n        id\n        name\n        users {\n          isEmailVerified\n          name\n        }\n        statusInTournament\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTournaments(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllTournaments(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      totalRecords\n      tournaments {\n        id\n        name\n        description\n        start_date\n        end_date\n        isPrivate\n        teamGenerationType {\n          name\n        }\n        sport {\n          name\n        }\n        splitSwitchGroupBy\n        created_at\n        updated_at\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllTournaments(\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllTournaments(\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      totalRecords\n      tournaments {\n        id\n        name\n        description\n        start_date\n        end_date\n        isPrivate\n        teamGenerationType {\n          name\n        }\n        sport {\n          name\n        }\n        splitSwitchGroupBy\n        created_at\n        updated_at\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTournamentsWithoutPagination {\n    getAllTournamentsWithoutPagination {\n      created_at\n      description\n      end_date\n      id\n      isPrivate\n      name\n      start_date\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  query GetAllTournamentsWithoutPagination {\n    getAllTournamentsWithoutPagination {\n      created_at\n      description\n      end_date\n      id\n      isPrivate\n      name\n      start_date\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTournamentById($tournamentId: Float!) {\n    getTournamentById(tournamentId: $tournamentId) {\n      description\n      end_date\n      id\n      isPrivate\n      name\n      start_date\n      teamGenerationType {\n        name\n      }\n      levels {\n        id\n        name\n        status\n        pools {\n          name\n          rounds {\n            name\n          }\n        }\n        format {\n          id\n          name\n        }\n      }\n      rounds {\n        id\n        status\n      }\n      splitSwitchGroupBy\n      status\n      created_at\n      updated_at\n      tournamentResult {\n        winners {\n          team {\n            name\n          }\n          rank\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTournamentById($tournamentId: Float!) {\n    getTournamentById(tournamentId: $tournamentId) {\n      description\n      end_date\n      id\n      isPrivate\n      name\n      start_date\n      teamGenerationType {\n        name\n      }\n      levels {\n        id\n        name\n        status\n        pools {\n          name\n          rounds {\n            name\n          }\n        }\n        format {\n          id\n          name\n        }\n      }\n      rounds {\n        id\n        status\n      }\n      splitSwitchGroupBy\n      status\n      created_at\n      updated_at\n      tournamentResult {\n        winners {\n          team {\n            name\n          }\n          rank\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllUsersWithoutPagination($userRole: Float) {\n    getAllUsersWithoutPagination(userRole: $userRole) {\n      created_at\n      email\n      id\n      isEmailVerified\n      name\n      otpSecret\n      profileImage\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsersWithoutPagination($userRole: Float) {\n    getAllUsersWithoutPagination(userRole: $userRole) {\n      created_at\n      email\n      id\n      isEmailVerified\n      name\n      otpSecret\n      profileImage\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllUsers(\n    $userRole: Float\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllUsers(\n      userRole: $userRole\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      totalRecords\n      users {\n        id\n        email\n        name\n        userRoleClub {\n          role {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsers(\n    $userRole: Float\n    $filter: String\n    $filterBy: String\n    $page: Int\n    $pageSize: Int\n    $sort: SortInput\n  ) {\n    getAllUsers(\n      userRole: $userRole\n      filter: $filter\n      filterBy: $filterBy\n      page: $page\n      pageSize: $pageSize\n      sort: $sort\n    ) {\n      totalRecords\n      users {\n        id\n        email\n        name\n        userRoleClub {\n          role {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
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