"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  LOGIN,
  REFRESH_TOKEN,
  REGISTER_USER,
  VERIFY_EMAIL,
} from "@/graphql/mutations/auth";
import { UPDATE_USER_CLUB, UPDATE_USER_ROLE } from "@/graphql/mutations/user";
import {
  RegisterInputDto,
  RegisterMutation,
  UpdateUserClubDto,
  UpdateUserRoleDto,
  VerifyEmailInputDto,
} from "@/graphql/generated/graphql";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import {
  clearAllCookies,
  setAuthToken,
  setUser,
} from "@/services/cookie-handler.service";
import {
  LOGIN_URL,
  ONBOARDING_STEPS,
  PredefinedSystemRoles,
  UserCookie,
} from "@/lib/app-types";
import { selectFirstRole } from "@/services/user.service";

export enum USE_AUTH_KEY {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  UPDATE_USER_ROLE = "UPDATE_USER_ROLE",
  UPDATE_USER_CLUB = "UPDATE_USER_CLUB",
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
      setUser(res.login.user as UserCookie);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const refreshTokenMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.REFRESH_TOKEN],
    mutationFn: async () =>
      graphqlRequestHandler({
        query: REFRESH_TOKEN,
      }),
    onSuccess: () => {
      console.log("token refreshed!");
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
        await loginMutation.mutateAsync({ email, password });
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
    onSuccess: (res) => {
      const selectedRole = selectFirstRole(res.updateUserRole.user.roles ?? []);

      if (selectedRole?.id === PredefinedSystemRoles.clubOwner) {
        router.push(ONBOARDING_STEPS.STEP_3_CLUB);
        return;
      } else if (selectedRole?.id === PredefinedSystemRoles.player) {
        router.push(ONBOARDING_STEPS.STEP_3_PLAYER);
      } else {
        toast.error("Invalid role selection");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateUserClubMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.UPDATE_USER_CLUB],
    mutationFn: (variables: UpdateUserClubDto) =>
      graphqlRequestHandler({
        query: UPDATE_USER_CLUB,
        variables: { input: variables },
      }),
    onSuccess: () => {
      router.push(ONBOARDING_STEPS.LAST_STEP);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getOnboardingNextStepQuery = useQuery({
    queryKey: ["getOnboardingNextStep"],
    queryFn: async () => {
      const response = await fetch("/api/get-onboarding-mext-step");
      const data = await response.json();
      return data.nextStep;
    },
    enabled: false,
  });

  const signOut = () => {
    clearAllCookies();
    toast.success("Successfully signed out");
    router.push(LOGIN_URL);
  };

  return {
    loginMutation,
    refreshTokenMutation,
    registerUserMutation,
    verifyEmailMutation,
    signOut,
    updateUserRoleMutation,
    updateUserClubMutation,
    getOnboardingNextStepQuery,
  };
}
