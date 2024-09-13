"use client";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { execute } from "@/lib/graphql-server";
import { REGISTER_USER } from "@/graphql/mutations/auth";
import { RegisterInputDto } from "@/graphql/generated/graphql";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

enum USE_AUTH_KEY {
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
}

export default function useAuth() {
  const { data: session } = useSession();

  const registerUserMutation = useMutation({
    mutationKey: [USE_AUTH_KEY.REGISTER_USER],
    mutationFn: (variables: RegisterInputDto) =>
      execute(REGISTER_USER, { input: variables }),
    onSuccess: () => {
      toast.success("Successfully registered");
    },
    onError: (error) => {
      toast.success(error.message);
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
    }) =>
      signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      }),
    onSuccess: () => {
      toast.success("Successfully logged in");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });

  return {
    session,
    loginMutation,
    registerUserMutation,
  };
}
