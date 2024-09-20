import React from "react";
import SelectAccountTypeInput from "./_components/SelectAccountTypeInput";
import { getSession } from "@/services/cookie-handler.service";
import { getUserById } from "@/server-requests/user.server-request";

async function getUserRole() {
  const session = getSession({ isServer: true });

  if (session) {
    const userDetails = await getUserById(parseInt(session.id));

    if (!userDetails) return null;
    if (userDetails.roles?.length === 0 || !userDetails.roles) return null;

    return parseInt(userDetails?.roles[0].id);
  }

  return null;
}

export default async function SelectAccountType() {
  const userRole = await getUserRole();

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Select your account type</h1>
      </div>

      <SelectAccountTypeInput userRole={userRole} />
    </div>
  );
}
