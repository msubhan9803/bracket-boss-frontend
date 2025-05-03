"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { START_MATCH } from "@/graphql/mutations/match";

export enum USE_MATCH_OPERATIONS {
  START_MATCH = "START_MATCH",
}

export default function useMatchOperations() {
  const startTournamentMutation = useMutation({
    mutationKey: [USE_MATCH_OPERATIONS.START_MATCH],
    mutationFn: async (matchId: number) =>
      graphqlRequestHandler({
        query: START_MATCH,
        variables: { matchId },
      }),
    onSuccess: () => {
      toast.success("Match started successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    startTournamentMutation,
  };
}
