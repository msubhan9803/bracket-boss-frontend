import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { headers } from "next/headers";

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

// export function getSearchParam(paramName: string): string | null {
//   const headersList = headers();
//   const referer = headersList.get("referer") || "";
//   const url = new URL(referer);
//   return url.searchParams.get(paramName);
// }

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function toTitleCase(text: string): string {
  return text
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function toProperCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
  );
}

export function getInitialsOfText(name: string) {
  const words = name.split(" ");
  const initials =
    words.length > 1 ? words[0][0] + words[1][0] : words[0].substring(0, 2);
  return initials.toUpperCase();
}

export const downloadXLSX = (base64Data: string, fileName: string) => {
  const binaryData = atob(base64Data);
  const byteNumbers = new Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    byteNumbers[i] = binaryData.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.download = fileName;
  link.href = window.URL.createObjectURL(blob);
  link.click();
  window.URL.revokeObjectURL(link.href);
};

export function convertSnakeCaseToTitleCase(text: string): string {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}