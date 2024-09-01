import type { Metadata, NextPage } from "next";
import { Inter } from "next/font/google";
import { NextPageLayout } from "@/global";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Bracket Boss Dashboard",
  description: "Created by The Bracket Boss",
};

const RootLayout: NextPage<NextPageLayout> = ({ params, children }) => {
  return (
    <html className="" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
