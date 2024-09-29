import React from "react";
import Link from "next/link";
import AddClubInfoForm from "./_components/AddClubInfoForm";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PageUrls } from "@/lib/app-types";

export default async function AddClubInfo() {
  return (
    <div className="mx-auto grid w-4/6 gap-6">
      <Link
        href={PageUrls.SELECT_ACCOUNT_TYPE}
        className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 w-fit"
      >
        <IoIosArrowRoundBack className="mr-2 text-lg" />
        Back
      </Link>

      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Add your club information</h1>
      </div>

      <AddClubInfoForm />
    </div>
  );
}
