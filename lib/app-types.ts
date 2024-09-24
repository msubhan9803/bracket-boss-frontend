export enum PredefinedSystemRoles {
  superAdmin = 1,
  clubOwner = 2,
  player = 3,
  tournamentOrganizer = 4,
  leagueOrganizer = 5,
}

export const DASHBOARD_URL = "/dashboard";
export const LOGIN_URL = "/login";

export enum ONBOARDING_STEPS {
  STEP_1 = "/onboarding/verify-email",
  STEP_2 = "/onboarding/select-account-type",
  STEP_3_CLUB = "/onboarding/add-club-info",
  STEP_3_PLAYER = "/onboarding/select-your-club",
  LAST_STEP = DASHBOARD_URL,
}