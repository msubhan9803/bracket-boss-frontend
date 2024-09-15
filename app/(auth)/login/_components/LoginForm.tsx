"use client"
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/hooks/useAuth";
import { DynamicFormField } from "@/global";
import FormWrapper from "@/components/core/FormWrapper";

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
  const { loginMutation } = useAuth();

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
    await loginMutation.mutateAsync({ email, password });
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
