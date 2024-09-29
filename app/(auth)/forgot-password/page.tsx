"use client";
import { PageUrls } from "@/lib/app-types";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import EmailForm from "./_components/EmailForm";

export default function ForgotPassword() {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <Link
        href={PageUrls.SELECT_ACCOUNT_TYPE}
        className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 w-fit"
      >
        <IoIosArrowRoundBack className="mr-2 text-lg" />
        Back
      </Link>

      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Forgot your password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to setup a new password
        </p>
      </div>

      <EmailForm />
    </div>
  );
}
