"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  LOGIN,
  REGISTER_USER,
  UPDATE_USER_ROLE,
  VERIFY_EMAIL,
} from "@/graphql/mutations/auth";
import {
  RegisterInputDto,
  RegisterMutation,
  UpdateUserRoleDto,
  VerifyEmailInputDto,
} from "@/graphql/generated/graphql";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import {
  clearAllCookies,
  setAuthToken,
  setUser,
} from "@/services/cookie-handler.service";

export enum USE_AUTH_KEY {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  UPDATE_USER_ROLE = "UPDATE_USER_ROLE",
}

const DASHBOARD_URL = "/dashboard";
const LOGIN_URL = "/login";

export enum ONBOARDING_STEPS {
  STEP_1 = "/verify-email",
  STEP_2 = "/select-account-type",
  STEP_3_CLUB = "/club-info",
  STEP_3_PLAYER = "/select-your-club",
  LAST_STEP = DASHBOARD_URL,
}

export default function useAuth() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.LOGIN_USER],
    mutationFn: async (variables: { email: string; password: string }) =>
      graphqlRequestHandler({
        query: LOGIN,
        variables: { input: variables },
      }),
    onSuccess: (res) => {
      setAuthToken(res.login.authTokens);
      setUser(res.login.user);

      toast.success("Successfully logged in");
      router.push(DASHBOARD_URL);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const registerUserMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.REGISTER_USER],
    mutationFn: (variables: RegisterInputDto) =>
      graphqlRequestHandler({
        query: REGISTER_USER,
        variables: { input: variables },
      }),
    onSuccess: async (
      data: RegisterMutation,
      { email, password }: RegisterInputDto
    ) => {
      toast.success(data.register.message);

      try {
        loginMutation.mutate({ email, password });
        router.push(ONBOARDING_STEPS.STEP_1);
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const verifyEmailMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.VERIFY_EMAIL],
    mutationFn: (variables: VerifyEmailInputDto) =>
      graphqlRequestHandler({
        query: VERIFY_EMAIL,
        variables: { input: variables },
      }),
    onSuccess: (res) => {
      toast.success(res.verifyEmail.message);
      router.push(ONBOARDING_STEPS.STEP_2);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateUserRoleMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.UPDATE_USER_ROLE],
    mutationFn: (variables: UpdateUserRoleDto) =>
      graphqlRequestHandler({
        query: UPDATE_USER_ROLE,
        variables: { input: variables },
      }),
    onSuccess: () => {
      router.push(ONBOARDING_STEPS.LAST_STEP);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const signOut = () => {
    clearAllCookies();
    toast.success("Successfully signed out");
    router.push(LOGIN_URL);
  };

  return {
    loginMutation,
    registerUserMutation,
    verifyEmailMutation,
    updateUserRoleMutation,
    signOut,
  };
}
