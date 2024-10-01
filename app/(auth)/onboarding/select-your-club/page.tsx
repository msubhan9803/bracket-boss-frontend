import React from "react";
import SelectClubForm from "./_components/SelectClubForm";
import { getAllClubs } from "@/services/club.service";
import BackButton from "@/components/core/BackButton";

export default async function SelectYourClub() {
  const clubs = await getAllClubs();

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <BackButton />

      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Select Your Club</h1>
      </div>

      <SelectClubForm clubs={clubs} />
    </div>
  );
}
