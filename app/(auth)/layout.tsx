import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "@/styles/globals.css";
import "@/styles/index.css";
import AuthSideImage from "@/public/images/auth-side-image-sportsman.jpeg";


export const metadata: Metadata = {
  title: "The Bracket Boss - Onboarding",
  description: "Created by The Bracket Boss",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full lg:grid lg:min-h-screen overflow-auto lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 md:px-0 min-h-screen">
        {children}
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={AuthSideImage}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
