import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import "@/styles/index.css";
import Providers from "@/lib/providers";
import AuthSideImage from "@/public/images/auth-side-image-sportsman.jpeg";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "The Bracket Boss - Onboarding",
  description: "Created by The Bracket Boss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full lg:grid lg:min-h-screen overflow-auto lg:grid-cols-2">
              <div className="flex items-center justify-center py-12 min-h-screen">
                {children}
              </div>
              <div className="hidden bg-muted lg:block">
                <Image
                  src={AuthSideImage}
                  alt="Image"
                  width="1920"
                  height="1080"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
