"use client";
import React, { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicFormField } from "@/global";
import FormWrapper from "@/components/core/FormWrapper";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
  club: z.string().nullable(),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  clubs: { id: number; name: string; logo: string }[];
};

export default function SelectClubForm({ clubs }: Props) {
  const { updateUserClubMutation } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      club: null,
    },
  });

  const fields = useMemo<DynamicFormField<FormData>[]>(
    () => [
      {
        label: null,
        name: "club",
        type: "select",
        placeholder: "Select your club",
        options: clubs?.map((club) => ({
          value: club.id.toString(),
          label: (
            <div className="flex gap-x-2">
              <Image
                className="h-6 w-6"
                src={club.logo}
                width={24}
                height={24}
                alt={club.name}
              />
              <span>{club.name}</span>
            </div>
          ),
        })),
      },
    ],
    [clubs]
  );

  const onSubmit = useCallback(async (values: FormData) => {
    await updateUserClubMutation.mutateAsync({
      clubId: parseInt(values.club as string),
    });
  }, []);

  return (
    <FormWrapper
      form={form}
      fields={fields}
      onSubmit={onSubmit}
      submitButtonLabel="Select"
    />
  );
}
