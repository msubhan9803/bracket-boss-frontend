import React from "react";
import SelectAccountTypeInput from "./_components/SelectAccountTypeInput";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserById } from "@/lib/server-requests";

export default async function SelectAccountType() {
  const session = await getServerSession(authOptions);
  const userId = parseInt(session?.user.id as string);
  const userDetails = await getUserById(userId);
  const userRole = userDetails.roles ? parseInt(userDetails.roles[0].id) : null;

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Select your account type</h1>
      </div>

      <SelectAccountTypeInput userRole={userRole} />
    </div>
  );
}
