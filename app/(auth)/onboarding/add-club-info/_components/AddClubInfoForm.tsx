"use client";
import React from "react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicFormField } from "@/global";
import FormWrapper from "@/components/core/FormWrapper";
import { ONBOARDING_STEPS } from "@/lib/app-types";
import useFileUpload from "@/hooks/useFileUpload";

const formSchema = z.object({
  clubName: z.string().min(1, { message: "Club name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  file: z.instanceof(File).nullable(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddClubInfoForm() {
  const router = useRouter();
  const { uploadFileMutation } = useFileUpload();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clubName: "",
      description: "",
      file: null,
    },
  });

  const fields = useMemo<DynamicFormField<FormData>[]>(
    () => [
      {
        label: "Club Name",
        name: "clubName",
        type: "text",
        placeholder: "Enter your club name",
      },
      {
        label: "Description",
        name: "description",
        type: "textarea",
        placeholder: "Enter a description",
      },
      {
        label: "Your Club Logo",
        name: "file",
        type: "file",
        placeholder: "Upload a file",
      },
    ],
    []
  );

  const onSubmit = async (values: FormData) => {
    const { clubName, description, file } = values;

    const fileUrl = await uploadFileMutation.mutateAsync({ file: file as File });

    console.log('🌺 file url: ', fileUrl)

    router.push(ONBOARDING_STEPS.LAST_STEP);
  };

  return (
    <FormWrapper
      form={form}
      fields={fields}
      onSubmit={onSubmit}
      submitButtonLabel="Submit"
    />
  );
}