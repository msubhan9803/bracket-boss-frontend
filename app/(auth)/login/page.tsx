"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import LoginForm from "./_components/LoginForm";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons/lib";
import TokenValidator from "@/components/shared/TokenValidator";

interface SocialButtonProps extends React.ComponentProps<typeof Button> {
  icon: IconType;
  label: string;
}

export default function Login() {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <TokenValidator />

      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <SocialButton icon={FcGoogle} label="Login with Google" />

      <SocialButton
        icon={FaFacebook}
        label="Login with Facebook"
        className="text-facebook dark:text-white"
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <LoginForm />

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/onboarding/register" className="underline">
          Register
        </Link>
      </div>
    </div>
  );
}

function SocialButton({
  icon: Icon,
  label,
  className,
  ...props
}: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      className={`w-full flex items-center justify-center ${className}`}
      {...props}
    >
      <Icon className="mr-2" size={24} />
      {label}
    </Button>
  );
}
