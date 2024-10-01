export enum PredefinedSystemRoles {
  superAdmin = 1,
  clubOwner = 2,
  player = 3,
  tournamentOrganizer = 4,
  leagueOrganizer = 5,
}

export enum PageNames {
  VERIFY_EMAIL = "verify-email",
  SELECT_ACCOUNT_TYPE = "select-account-type",
  ADD_CLUB_INFO = "add-club-info",
  SELECT_YOUR_CLUB = "select-your-club",
  REGISTRATION = "register",
  DASHBOARD = "dashboard",
  LOGIN = "login",
}

export enum PageUrls {
  VERIFY_EMAIL = `/onboarding/${PageNames.VERIFY_EMAIL}`,
  SELECT_ACCOUNT_TYPE = `/onboarding/${PageNames.SELECT_ACCOUNT_TYPE}`,
  ADD_CLUB_INFO = `/onboarding/${PageNames.ADD_CLUB_INFO}`,
  SELECT_YOUR_CLUB = `/onboarding/${PageNames.SELECT_YOUR_CLUB}`,
  REGISTRATION = `/onboarding/${PageNames.REGISTRATION}`,
  DASHBOARD = `/${PageNames.DASHBOARD}`,
  LOGIN = `/${PageNames.LOGIN}`,
  LOGOUT = `/${PageNames.LOGIN}?logout=1`,
  FORGOT_PASSWORD = `/forgot-password`,
  FORGOT_PASSWORD_VERIFY = `/forgot-password/verify`,
  FORGOT_PASSWORD_RESET = `/forgot-password/reset`,
}

export enum ONBOARDING_STEPS {
  REGISTRATION = PageUrls.REGISTRATION,
  STEP_1 = PageUrls.VERIFY_EMAIL,
  STEP_2 = PageUrls.SELECT_ACCOUNT_TYPE,
  STEP_3_CLUB = PageUrls.ADD_CLUB_INFO,
  STEP_3_PLAYER = PageUrls.SELECT_YOUR_CLUB,
  LAST_STEP = PageUrls.DASHBOARD,
}

export enum FORGOT_PASSWORD_STEPS {
  STEP_1 = PageUrls.FORGOT_PASSWORD,
  STEP_2 = PageUrls.FORGOT_PASSWORD_VERIFY,
  STEP_3 = PageUrls.FORGOT_PASSWORD_RESET,
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

export enum ModuleNames {
  DASHBOARD = "dashboard",
  LEAGUE_MANAGEMENT = "league_management",
  TOURNAMENT_MANAGEMENT = "tournament_management",
  LEAGUES = "leagues",
  TOURNAMENTS = "tournaments",
  CLUB_MANAGEMENT = "club_management",
  INVITATIONS = "invitations",
  MEMBERS = "members",
  CUSTOMIZATION = "customization",
  MY_CLUB = "my_club",
  MY_TEAM = "my_team",
  MY_MATCHES = "my_matches",
  TEAM_MANAGEMENT = "team_management",
  COURT_MANAGEMENT = "court_management",
  REFERRAL_MANAGEMENT = "referral_management",
  USER_MANAGEMENT = "user_management",
  PAYMENT_MANAGEMENT = "payment_management",
  SYSTEM_SETTINGS = "system_settings",
  REPORTING_AND_ANALYTICS = "reporting_&_analytics",
  SCORE_AND_STANDINGS = "score_&_standings",
  CHAT = "chat",
  ACCOUNT_SETTINGS = "account_settings",
  ACTIVITY_LOGS = "activity_logs",
}
