import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { headers } from "next/headers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getSearchParam(paramName: string): string | null {
  const headersList = headers();
  const referer = headersList.get("referer") || "";
  const url = new URL(referer);
  return url.searchParams.get(paramName);
}
