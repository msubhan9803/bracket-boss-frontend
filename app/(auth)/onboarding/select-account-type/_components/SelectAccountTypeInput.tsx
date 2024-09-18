"use client";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/components/core/FormWrapper";
import { DynamicFormField } from "@/global";
import { FaRegBuilding, FaUser } from "react-icons/fa";
import AccountRoleCard from "./AccountRoleCard";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { PredefinedRoles } from "@/lib/types.d";
import useUser from "@/hooks/useUser";

const formSchema = z.object({
  accountType: z.number(),
});

type FormData = z.infer<typeof formSchema>;

export default function SelectAccountTypeInput() {
  const { updateUserRoleMutation } = useAuth();
  const { userRole } = useUser();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountType: PredefinedRoles.clubOwner,
    },
  });
  const { setValue } = form;

  const fields = useMemo<DynamicFormField<FormData>[]>(
    () => [
      {
        label: null,
        name: "accountType",
        type: "radio",
        options: [
          {
            label: "Club",
            value: PredefinedRoles.clubOwner,
            icon: <FaRegBuilding className="h-6 w-6" />,
          },
          {
            label: "Player",
            value: PredefinedRoles.player,
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
      roleId: values.accountType,
    });
  };

  useEffect(() => {
    if (userRole) {
      setValue("accountType", userRole);
    }
  }, [userRole]);

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
