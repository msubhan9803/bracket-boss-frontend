"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  LOGIN,
  REFRESH_TOKEN,
  REGISTER_USER,
  VERIFY_EMAIL,
  SEND_FORGOT_PASSWORD_EMAIL,
  VERIFY_OTP,
  RESET_PASSWORD,
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
  setCustomCookie,
  setUser,
} from "@/services/cookie-handler.service";
import {
  CustomCookies,
  FORGOT_PASSWORD_STEPS,
  ONBOARDING_STEPS,
  PageUrls,
  PredefinedSystemRoles,
  UserCookie,
} from "@/lib/app-types";

export enum USE_AUTH_KEY {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  UPDATE_USER_ROLE = "UPDATE_USER_ROLE",
  UPDATE_USER_CLUB = "UPDATE_USER_CLUB",
  SEND_FORGOT_PASSWORD_EMAIL = "SEND_FORGOT_PASSWORD_EMAIL",
  VERIFY_OTP = "VERIFY_OTP",
  RESET_PASSWORD = "RESET_PASSWORD",
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
      const selectedRole = res.updateUserRole.userRoleClub.role;

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

  const sendForgotPasswordEmailMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.SEND_FORGOT_PASSWORD_EMAIL],
    mutationFn: (variables: { email: string }) =>
      graphqlRequestHandler({
        query: SEND_FORGOT_PASSWORD_EMAIL,
        variables,
      }),
    onSuccess: (res, variables) => {
      toast.success(res.sendForgotPasswordEmail.message);
      router.push(`${FORGOT_PASSWORD_STEPS.STEP_2}?email=${variables.email}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.VERIFY_OTP],
    mutationFn: (variables: { email: string; otp: string }) =>
      graphqlRequestHandler({
        query: VERIFY_OTP,
        variables,
      }),
    onSuccess: (res) => {
      toast.success(res.verifyOtp.message);
      // setCustomCookie(CustomCookies.RESET_PASSWWORD_TOKEN, res.verifyOtp.token);
      setAuthToken({
        accessToken: res.verifyOtp.token,
        refreshToken: "",
        expiresIn: 0,
      });
      router.push(FORGOT_PASSWORD_STEPS.STEP_3);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.RESET_PASSWORD],
    mutationFn: (variables: { newPassword: string }) =>
      graphqlRequestHandler({
        query: RESET_PASSWORD,
        variables,
      }),
    onSuccess: (res) => {
      toast.success(res.resetPassword.message);
      clearAllCookies();
      router.push(PageUrls.LOGIN);
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
    router.push(PageUrls.LOGIN);
  };

  return {
    loginMutation,
    refreshTokenMutation,
    registerUserMutation,
    verifyEmailMutation,
    updateUserRoleMutation,
    updateUserClubMutation,
    sendForgotPasswordEmailMutation,
    resetPasswordMutation,
    verifyOtpMutation,
    getOnboardingNextStepQuery,
    signOut,
  };
}
