"use client";
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
});

type FormData = z.infer<typeof formSchema>;

type SubmitValuesType = {
  email: string;
};

export default function ResetPasswordForm() {
  const { loginMutation, getOnboardingNextStepQuery, signOut } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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
    ],
    []
  );

  const onSubmit = async (values: SubmitValuesType) => {
    const { email } = values;
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
