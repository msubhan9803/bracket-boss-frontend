"use client"
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import RegisterForm from "./_components/RegisterForm";
import { IconType } from "react-icons/lib";

interface SocialButtonProps extends React.ComponentProps<typeof Button> {
  icon: IconType;
  label: string;
}

export default function Register() {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-balance text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center"
      >
        <FcGoogle className="mr-2" size={24} />
        Register with Google
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center"
      >
        <FaFacebook className="mr-2 text-facebook dark:text-white" size={24} />
        Register with Facebook
      </Button>

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

      <RegisterForm />

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
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
