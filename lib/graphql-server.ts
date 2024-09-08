import { TypedDocumentString } from "@/graphql/generated/graphql";
import { redirect } from "next/navigation";

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  variables?: TVariables extends Record<string, never>
    ? never | {}
    : TVariables,
  customHeaders?: Record<string, string>
) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/graphql-response+json",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL as string,
      {
        method: "POST",
        headers: {
          ...defaultHeaders,
          ...(customHeaders || {}),
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    ).then(res => res.json());

    return response.data as TResult;
  } catch (error: any) {
    if (error.response.errors) {
      const unauthenticatedError = error.response.errors.find(
        (err: { message: string }) =>
          err.message.includes("Unauthenticated") ||
          err.message.includes("Unauthorized")
      );

      if (unauthenticatedError) {
        redirect("/login?logout=1");
      }
    }
    throw error;
  }
}
