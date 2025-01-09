"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { CreateCourtInputDto, UpdateCourtInputDto } from "@/graphql/generated/graphql";
import { CREATE_COURT, UPDATE_COURT } from "@/graphql/mutations/court";

export enum USE_COURT_OPERATIONS_KEY {
  CREATE_COURT = "CREATE_COURT",
  UPDATE_COURT = "UPDATE_COURT",
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

  const updateCourtMutation = useMutation({
    mutationKey: [USE_COURT_OPERATIONS_KEY.UPDATE_COURT],
    mutationFn: async (variables: UpdateCourtInputDto) =>
      graphqlRequestHandler({
        query: UPDATE_COURT,
        variables: { input: variables },
      }),
    onSuccess: () => {
      toast.success("Court updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createCourtMutation,
    updateCourtMutation,
  };
}
