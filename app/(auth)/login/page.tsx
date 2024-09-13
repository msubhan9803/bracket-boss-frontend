"use client";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { DynamicFormField } from "@/global";
import FormWrapper from "@/components/core/FormWrapper";
import AuthSideImage from "@/public/images/auth-side-image-sportsman.jpeg";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof formSchema>;

type SubmitValuesType = {
  email: string;
  password: string;
}

export default function Login() {
  const { handleSignIn } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const fields = useMemo<DynamicFormField<FormData>[]>(
    () => [
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "m@example.com",
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Enter your password",
      },
    ],
    []
  );

  const onSubmit = async (values: SubmitValuesType) => {
    const { email, password } = values;
    await handleSignIn(email, password);
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen overflow-auto lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <FcGoogle className="mr-2" size={24} />
            Login with Google
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <FaFacebook
              className="mr-2 text-facebook dark:text-white"
              size={24}
            />
            Login with Facebook
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

          <FormWrapper
            form={form}
            fields={fields}
            onSubmit={onSubmit}
            submitButtonLabel="Login"
          />

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={AuthSideImage}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
