import React from "react";
import SelectAccountTypeInput from "./_components/SelectAccountTypeInput";
import { getUserById } from "@/lib/server-requests";
import { cookies } from "next/headers";

export default async function SelectAccountType() {
  const user = JSON.parse(cookies().get("user")?.value as any) as any;
  const userId = parseInt(user.id as string);
  const userDetails = await getUserById(userId);
  const userRole =
    userDetails.roles && userDetails.roles?.length > 0
      ? parseInt(userDetails.roles[0].id)
      : null;

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Select your account type</h1>
      </div>

      <SelectAccountTypeInput userRole={userRole} />
    </div>
  );
}
