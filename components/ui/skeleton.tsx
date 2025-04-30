"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface SkeletonProps {
  type?: "basic" | "itemCard" | "avatar" | "teamCard";
  height?: string;
  width?: string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
  type = "basic",
  height = "2.5",
  width = "48",
  className,
}) => {
  const commonClasses =
    "bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse";

  if (type === "itemCard") {
    return (
      <div
        role="status"
        className="w-full p-4 border border-gray-200 rounded shadow dark:border-gray-700 animate-pulse"
      >
        <div className={`${commonClasses} h-2.5 w-48 mb-4`}></div>
        <div className={`${commonClasses} h-2 bg-gray-200 mb-2.5`}></div>
        <div className={`${commonClasses} h-2 bg-gray-200 mb-2.5`}></div>
        <div className={`${commonClasses} h-2 bg-gray-200`}></div>
        <div className="flex items-center mt-4">
          <div>
            <div className={`${commonClasses} h-2.5 w-32 mb-2`}></div>
            <div className={`${commonClasses} h-2 w-48`}></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (type === "avatar") {
    return (
      <div role="status" className="flex items-center space-x-4 animate-pulse">
        <div
          className={`bg-gray-200 dark:bg-gray-700 rounded-full ${height} ${width}`}
        ></div>
        <div className="flex-1 space-y-4">
          <div className={`${commonClasses} h-2.5 w-32`}></div>
          <div className={`${commonClasses} h-2 w-48`}></div>
        </div>
      </div>
    );
  }

  if (type === "teamCard") {
    return (
      <div
        role="status"
        className="w-full rounded-2xl shadow-sm animate-pulse border border-border bg-background"
      >
        <div className="p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-9 w-9" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4" />
            </div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1">
              Members
            </h4>
            <div className="h-[150px] w-full rounded-md border border-border bg-muted/20 overflow-hidden">
              <div className="p-2 space-y-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-7 w-7" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          <div className="text-xs text-muted-foreground">
            Team ID:{" "}
            <span className="font-mono bg-gray-200 dark:bg-gray-700 rounded-md inline-block w-16 h-3" />
          </div>
        </div>
        <span className="sr-only">Loading team card...</span>
      </div>
    );
  }

  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div
        className={cn(
          "bg-gray-200 rounded-full dark:bg-gray-700 mb-4",
          `h-${height}`,
          `w-${width}`,
          className
        )}
      ></div>
    </div>
  );
};

export default SkeletonLoader;
