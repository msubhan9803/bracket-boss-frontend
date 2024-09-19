export type AuthToken = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export type UserCookie = {
  id: string;
  email: string;
  name: string;
  roles?: string[];
  created_at: any;
  profileImage?: string | null;
  updated_at: any;
};

export interface CookieHandlerConfig {
  isServer?: boolean;
}
