import React from "react";
import AddClubInfoForm from "./_components/AddClubInfoForm";

export default async function AddClubInfo() {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Add your club information</h1>
      </div>

      <AddClubInfoForm />
    </div>
  );
}
