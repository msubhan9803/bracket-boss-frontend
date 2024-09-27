export enum PredefinedSystemRoles {
  superAdmin = 1,
  clubOwner = 2,
  player = 3,
  tournamentOrganizer = 4,
  leagueOrganizer = 5,
}

export const REGISTRATION_URL = "/registration";
export const DASHBOARD_URL = "/dashboard";
export const LOGIN_URL = "/login";

export enum ONBOARDING_STEPS {
  STEP_1 = "/onboarding/verify-email",
  STEP_2 = "/onboarding/select-account-type",
  STEP_3_CLUB = "/onboarding/add-club-info",
  STEP_3_PLAYER = "/onboarding/select-your-club",
  LAST_STEP = DASHBOARD_URL,
  REGISTRATION = REGISTRATION_URL,
}

export type AuthToken = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export type Role = {
  id: number;
  name: string;
};

export type UserCookie = {
  id: string;
  email: string;
  name: string;
  roles?: Role[];
  created_at: any;
  profileImage?: string | null;
  updated_at: any;
};

export enum StepNames {
  registration = "registration",
  email_verification = "email_verification",
  user_type_selection = "user_type_selection",
  club_information_insertion = "club_information_insertion",
  club_selection = "club_selection",
}
