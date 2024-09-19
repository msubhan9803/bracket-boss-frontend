import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { IncomingMessage, ServerResponse } from "http";
import {
  AuthToken,
  CookieHandlerConfig,
  UserCookie,
} from "./types/cookie-handler.types";

let serverCookies: any = null;
if (typeof window === "undefined") {
  serverCookies = require("next/headers").cookies;
}

export const setAuthToken = (authToken: AuthToken) => {
  setCookie("auth-token", JSON.stringify(authToken));
};

export const setUser = (user: UserCookie) => {
  setCookie("user", JSON.stringify(user));
};

export const getAuthToken = (
  config: CookieHandlerConfig = {}
): AuthToken | null => {

  if (config.isServer && serverCookies) {
    try {
      const serverCookie = serverCookies().get("auth-token")?.value;
      if (!serverCookie) return null;
      return JSON.parse(serverCookie as string) as AuthToken;
    } catch (e) {
      console.error("Error parsing server-side auth-token cookie:", e);
      return null;
    }
  } else {
    const clientCookie = getCookie("auth-token");
    if (!clientCookie) return null;
    try {
      return JSON.parse(clientCookie as string) as AuthToken;
    } catch (e) {
      console.error("Error parsing client-side auth-token cookie:", e);
      return null;
    }
  }
};

export const getUser = (
  config: CookieHandlerConfig = {}
): UserCookie | null => {
  if (config.isServer && serverCookies) {
    try {
      const serverCookie = serverCookies().get("user")?.value;
      if (!serverCookie) return null;
      return JSON.parse(serverCookie as string) as UserCookie;
    } catch (e) {
      console.error("Error parsing server-side user cookie:", e);
      return null;
    }
  } else {
    const clientCookie = getCookie("user");
    if (!clientCookie) return null;
    try {
      return JSON.parse(clientCookie as string) as UserCookie;
    } catch (e) {
      console.error("Error parsing client-side user cookie:", e);
      return null;
    }
  }
};

export const removeAuthToken = () => {
  deleteCookie("auth-token");
};

export const removeUser = (req?: IncomingMessage, res?: ServerResponse) => {
  deleteCookie("user");
};

export const clearAllCookies = () => {
  removeAuthToken();
  removeUser();
};
