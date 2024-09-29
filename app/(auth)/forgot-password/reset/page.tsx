"use client";
import ResetPasswordForm from "../_components/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Reset your password</h1>
      </div>

      <ResetPasswordForm />
    </div>
  );
}
