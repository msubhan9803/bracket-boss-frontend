import React from "react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EmailVerificationOtpInput from "./_components/EmailVerificationOtpInput";

export default async function VerifyEmail() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || "your email";

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-muted-foreground">
          An email has been sent to{" "}
          <span className="font-bold">{userEmail}</span> with an OTP. Please
          insert the OTP below to verify your email.
        </p>
      </div>

      <div className="flex justify-center">
        <EmailVerificationOtpInput userEmail={userEmail} />
      </div>
    </div>
  );
}
