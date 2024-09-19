import React from "react";
import EmailVerificationOtpInput from "./_components/EmailVerificationOtpInput";
import { getUser } from "@/services/cookie-handler.service";

export default async function VerifyEmail() {
  const user = getUser({ isServer: true });
  const userEmail = user?.email || "your email";

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
