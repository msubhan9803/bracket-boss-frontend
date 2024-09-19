"use client";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/components/core/FormWrapper";
import { DynamicFormField } from "@/global";
import { FaRegBuilding, FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import AccountRoleCard from "./AccountRoleCard";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import { PredefinedSystemRoles } from "@/lib/app-types";

const formSchema = z.object({
  accountType: z.number().nullable(),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  userRole: number | null | undefined;
};

export default function SelectAccountTypeInput({ userRole }: Props) {
  const { updateUserRoleMutation } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountType: userRole,
    },
  });

  const fields = useMemo<DynamicFormField<FormData>[]>(
    () => [
      {
        label: null,
        name: "accountType",
        type: "radio",
        options: [
          {
            label: "Club",
            value: PredefinedSystemRoles.clubOwner,
            icon: <FaRegBuilding className="h-6 w-6" />,
          },
          {
            label: "Player",
            value: PredefinedSystemRoles.player,
            icon: <FaUser className="h-6 w-6" />,
          },
        ],
        render: ({ key, id, value, label, icon }) => (
          <div key={key} className="flex w-full justify-between space-x-4">
            <AccountRoleCard id={id} value={value} label={label} icon={icon} />
          </div>
        ),
      },
    ],
    []
  );

  const onSubmit = async (values: FormData) => {
    await updateUserRoleMutation.mutateAsync({
      roleId: values.accountType as number,
    });
  };

  if (updateUserRoleMutation.isPending) {
    return <LoadingSpinner />;
  }

  return (
    <FormWrapper
      form={form}
      fields={fields}
      onSubmit={onSubmit}
      submitButtonLabel="Next"
      submitButton={
        <Button
          type="submit"
          className="w-fit min-w-28 mt-4 ml-auto"
          loading={updateUserRoleMutation.isPending}
        >
          Next
        </Button>
      }
    />
  );
}
