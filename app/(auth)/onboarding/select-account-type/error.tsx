"use client";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [error]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-center text-xl font-bold">Something went wrong!</h2>
      </div>
    </>
  );
}
