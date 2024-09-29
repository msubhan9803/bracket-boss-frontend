"use client";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicFormField } from "@/global";
import FormWrapper from "@/components/core/FormWrapper";

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

type SubmitValuesType = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const fields = useMemo<DynamicFormField<FormData>[]>(
    () => [
      {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        showPassword: true,
      },
      {
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm your password",
        showPassword: true,
      },
    ],
    []
  );

  const onSubmit = async (values: SubmitValuesType) => {
    const { password, confirmPassword } = values;
  };

  return (
    <FormWrapper
      form={form}
      fields={fields}
      onSubmit={onSubmit}
      submitButtonLabel="Reset"
    />
  );
}
