"use client";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
          <Toaster style={{ zIndex: 9999999 }} richColors position="top-center" visibleToasts={1} />
        </ThemeProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default Providers;
