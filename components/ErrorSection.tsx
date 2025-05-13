import React from "react";
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { PageUrls } from "@/lib/app-types";

export default function ErrorSection() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-muted/40 p-8 shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-200/20">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="mt-5 text-center text-2xl font-bold tracking-tight text-foreground">
          Something went wrong
        </h1>

        <p className="mt-3 text-center text-muted-foreground">
          We encountered an error while processing your request. Please try again or
          return to the homepage.
        </p>

        <div className="mt-8 flex flex-col space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="flex w-full items-center justify-center rounded-md bg-destructive px-4 py-3 text-sm font-medium text-destructive-foreground transition hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload Page
          </button>

          <button
            onClick={() => (window.location.href = PageUrls.DASHBOARD)}
            className="flex w-full items-center justify-center rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2"
          >
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
