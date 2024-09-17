"use client";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { graphqlRequestHandler } from "@/lib/graphql-server";
import { REGISTER_USER, UPDATE_USER_ROLE, VERIFY_EMAIL } from "@/graphql/mutations/auth";
import {
  RegisterInputDto,
  RegisterMutation,
  UpdateUserRoleDto,
  VerifyEmailInputDto,
} from "@/graphql/generated/graphql";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export enum USE_AUTH_KEY {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  UPDATE_USER_ROLE = "UPDATE_USER_ROLE",
}

export enum ONBOARDING_STEPS {
  STEP_1 = "/verify-email",
  STEP_2 = "/select-account-type",
  STEP_3_CLUB = "/club-info",
  STEP_3_PLAYER = "/select-your-club",
  LAST_STEP = '/dashboard'
}

export default function useAuth() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleNextAuthLogin = async (email: string, password: string) => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }
    } catch (error) {
      throw error;
    }
  };

  const loginMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.LOGIN_USER],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => handleNextAuthLogin(email, password),
    onSuccess: () => {
      toast.success("Successfully logged in");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const registerUserMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.REGISTER_USER],
    mutationFn: (variables: RegisterInputDto) =>
      graphqlRequestHandler(REGISTER_USER, { input: variables }),
    onSuccess: async (data: RegisterMutation, variables: RegisterInputDto) => {
      toast.success(data.register.message);

      try {
        await handleNextAuthLogin(variables.email, variables.password);
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
      graphqlRequestHandler(VERIFY_EMAIL, { input: variables }),
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
      graphqlRequestHandler(UPDATE_USER_ROLE, { input: variables }),
    onSuccess: () => {
      router.push(ONBOARDING_STEPS.STEP_3_CLUB);
    },
    onError: (error) => {``
      toast.error(error.message);
    },
  });

  return {
    session,
    loginMutation,
    handleNextAuthLogin,
    registerUserMutation,
    verifyEmailMutation,
    updateUserRoleMutation,
  };
}
