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
  REGISTRATION = "registration",
  DASHBOARD = "dashboard",
  LOGIN = "login",
}

export enum PageUrls {
  VERIFY_EMAIL = `/onboarding/${PageNames.VERIFY_EMAIL}`,
  SELECT_ACCOUNT_TYPE = `/onboarding/${PageNames.SELECT_ACCOUNT_TYPE}`,
  ADD_CLUB_INFO = `/onboarding/${PageNames.ADD_CLUB_INFO}`,
  SELECT_YOUR_CLUB = `/onboarding/${PageNames.SELECT_YOUR_CLUB}`,
  REGISTRATION = `/${PageNames.REGISTRATION}`,
  DASHBOARD = `/${PageNames.DASHBOARD}`,
  LOGIN = `/${PageNames.LOGIN}`,
}

export enum ONBOARDING_STEPS {
  STEP_1 = PageUrls.VERIFY_EMAIL,
  STEP_2 = PageUrls.SELECT_ACCOUNT_TYPE,
  STEP_3_CLUB = PageUrls.ADD_CLUB_INFO,
  STEP_3_PLAYER = PageUrls.SELECT_YOUR_CLUB,
  LAST_STEP = PageUrls.DASHBOARD,
  REGISTRATION = PageUrls.REGISTRATION,
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
