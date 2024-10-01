"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 w-fit"
    >
      <span className="mr-2 text-2xl">
        <IoIosArrowRoundBack />
      </span>
      Back
    </button>
  );
}
