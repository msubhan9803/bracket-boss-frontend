"use client";
import { useSession, signIn } from "next-auth/react";

export default function useAuth() {
  const { data: session } = useSession();

  const handleSignIn = async (email: string, password: string) =>
    signIn("credentials", { email, password, callbackUrl: '/dashboard' });

  return {
    session,
    handleSignIn,
  };
}
