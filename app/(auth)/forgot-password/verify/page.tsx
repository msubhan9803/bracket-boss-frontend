import React from "react";
import VerifyOtpInput from "../_components/VerifyOtpInput";

export default async function VerifyEmail() {
  const userEmail = "your email";

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Verify</h1>
        <p className="text-muted-foreground">
          An email has been sent to&nbsp;
          <span className="font-bold">{userEmail}</span> with an OTP. Please
          insert the OTP below to verify your email.
        </p>
      </div>

      <div className="flex justify-center">
        <VerifyOtpInput userEmail={userEmail} />
      </div>
    </div>
  );
}
