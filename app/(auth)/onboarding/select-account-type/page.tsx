import React from "react";
import SelectAccountTypeInput from "./_components/SelectAccountTypeInput";
import { getUser } from "@/services/cookie-handler.service";
import { getUserById } from "@/server-requests/user.server-request";

export default async function SelectAccountType() {
  const user = getUser({ isServer: true });
  const userId = parseInt(user?.id as string);
  const userDetails = await getUserById(userId);
  // const userRole =
  //   userDetails.roles && userDetails.roles?.length > 0
  //     ? parseInt(userDetails.roles[0].id)
  //     : null;
  const userRole = null;

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Select your account type</h1>
      </div>

      <SelectAccountTypeInput userRole={userRole} />
    </div>
  );
}
