"use client"
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/hooks/useAuth";
import { DynamicFormField } from "@/global";
import FormWrapper from "@/components/core/FormWrapper";
import { PageUrls } from "@/lib/app-types";

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
};

export default function LoginForm() {
  const { loginMutation, getOnboardingNextStepQuery, signOut } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

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
        showPassword,
        toggleShowPassword: () => setShowPassword(!showPassword),
      },
    ],
    [showPassword]
  );

  const onSubmit = async (values: SubmitValuesType) => {
    const { email, password } = values;
    try {
      await loginMutation.mutateAsync({ email, password });
      toast.success("Successfully logged in");

      const nextStep = await getOnboardingNextStepQuery.refetch();
      router.push(nextStep.data);

    } catch (error) {
      setFailedAttempts(prev => prev + 1);

      if (failedAttempts + 1 >= 3) {
        toast.error("Too many failed attempts. Redirecting to forgot password.");
        router.push(PageUrls.FORGOT_PASSWORD);
      }
    }
  };

  return (
    <FormWrapper
      form={form}
      fields={fields}
      onSubmit={onSubmit}
      submitButtonLabel="Login"
    />
  );
}