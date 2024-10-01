'use client'
import BackButton from "@/components/core/BackButton";
import VerifyOtpInput from "../_components/VerifyOtpInput";
import { useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email') || '';

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <BackButton />

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
