import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { getSession } from "@/services/cookie-handler.service";
import { getUserById } from "@/server-requests/user.server-request";
import UserProvider from "@/providers/UserProvider";
import TokenValidator from "@/components/shared/TokenValidator";

export const metadata: Metadata = {
  title: "The Bracket Boss Dashboard",
  description: "Created by The Bracket Boss",
};

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getSession({ isServer: true });
  const userId = session?.id;
  const userDetails = await getUserById(parseInt(userId as string));

  return (
    <UserProvider userDetails={userDetails}>
      <TokenValidator />

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>

        <div className="flex flex-col h-screen">
          <Header />

          <main className="flex-1 overflow-auto flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
