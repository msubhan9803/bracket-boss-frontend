"use client";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { execute } from "@/lib/graphql-server";
import { REGISTER_USER, VERIFY_EMAIL } from "@/graphql/mutations/auth";
import {
  RegisterInputDto,
  VerifyEmailInputDto,
} from "@/graphql/generated/graphql";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export enum USE_AUTH_KEY {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  VERIFY_EMAIL = "VERIFY_EMAIL",
}

export default function useAuth() {
  const { data: session } = useSession();

  const handleNextAuthLogin = (
    email: string,
    password: string,
    callbackUrl?: string
  ) => {
    signIn("credentials", {
      email,
      password,
      ...(callbackUrl ? { callbackUrl } : {}),
    });
  };

  const registerUserMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.REGISTER_USER],
    mutationFn: (variables: RegisterInputDto) =>
      execute(REGISTER_USER, { input: variables }),
    onSuccess: () => {
      toast.success("Successfully registered");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const loginMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.LOGIN_USER],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => handleNextAuthLogin(email, password, "/dashboard"),
    onSuccess: () => {
      toast.success("Successfully logged in");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const verifyEmailMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.VERIFY_EMAIL],
    mutationFn: (variables: VerifyEmailInputDto) =>
      execute(VERIFY_EMAIL, { input: variables }),
    onSuccess: (res) => {
      toast.success(res.verifyEmail.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    session,
    loginMutation,
    handleNextAuthLogin,
    registerUserMutation,
    verifyEmailMutation,
  };
}
