"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { UpsertCourtInputDto } from "@/graphql/generated/graphql";
import { UPSERT_COURT } from "@/graphql/mutations/court";

export enum USE_COURT_OPERATIONS_KEY {
  UPSERT_COURT = "UPSERT_COURT",
}

export default function useCourtOperations() {
  const upsertCourtMutation = useMutation({
    mutationKey: [USE_COURT_OPERATIONS_KEY.UPSERT_COURT],
    mutationFn: async (variables: UpsertCourtInputDto) =>
      graphqlRequestHandler({
        query: UPSERT_COURT,
        variables: { input: variables },
      }),
    onSuccess: () => {
      toast.success("Court saved successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    upsertCourtMutation,
  };
}
