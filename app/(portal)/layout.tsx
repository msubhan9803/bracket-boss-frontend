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
        <Sidebar />

        <div className="flex flex-col">
          <Header />

          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
