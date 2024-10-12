"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { CreateCourtInputDto } from "@/graphql/generated/graphql";
import { CREATE_COURT } from "@/graphql/mutations/court";

export enum USE_COURT_OPERATIONS_KEY {
  CREATE_COURT = "CREATE_COURT",
}

export default function useCourtOperations() {
  const createCourtMutation = useMutation({
    mutationKey: [USE_COURT_OPERATIONS_KEY.CREATE_COURT],
    mutationFn: async (variables: CreateCourtInputDto) =>
      graphqlRequestHandler({
        query: CREATE_COURT,
        variables: { input: variables },
      }),
    onSuccess: () => {
      toast.success("Court created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createCourtMutation,
  };
}
