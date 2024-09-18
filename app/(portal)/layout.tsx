import type { Metadata, NextPage } from "next";
import { Inter } from "next/font/google";
import { NextPageLayout } from "@/global";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Bracket Boss Dashboard",
  description: "Created by The Bracket Boss",
};

const RootLayout: NextPage<NextPageLayout> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar />

          <div className="flex flex-col">
            <Header />

            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
