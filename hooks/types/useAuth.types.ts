export enum USE_AUTH_KEY {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  UPDATE_USER_ROLE = "UPDATE_USER_ROLE",
}

export const DASHBOARD_URL = "/dashboard";

export enum ONBOARDING_STEPS {
  STEP_1 = "/onboarding/verify-email",
  STEP_2 = "/onboarding/select-account-type",
  STEP_3_CLUB = "/onboarding/club-info",
  STEP_3_PLAYER = "/onboarding/select-your-club",
  LAST_STEP = DASHBOARD_URL,
}
