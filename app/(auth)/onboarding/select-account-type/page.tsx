import React from "react";
import SelectAccountTypeInput from "./_components/SelectAccountTypeInput";
import { getUserRole, getUserSessionServer } from "@/services/user.service";

export default async function SelectAccountType() {
  const { userDetails } = await getUserSessionServer();
  const userRole = getUserRole(userDetails);

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Select your account type</h1>
      </div>

      <SelectAccountTypeInput userRole={userRole} />
    </div>
  );
}
