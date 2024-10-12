"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { CREATE_TOURNAMENT } from "@/graphql/mutations/tournament";
import { CreateTournamentInputDto } from "@/graphql/generated/graphql";

export enum USE_TOURNAMENT_OPERATIONS_KEY {
  CREATE_TOURNAMENT = "CREATE_TOURNAMENT",
}

export default function useTournamentOperations() {
  const createTournamentMutation = useMutation({
    mutationKey: [USE_TOURNAMENT_OPERATIONS_KEY.CREATE_TOURNAMENT],
    mutationFn: async (variables: CreateTournamentInputDto) =>
      graphqlRequestHandler({
        query: CREATE_TOURNAMENT,
        variables: { input: variables },
      }),
    onSuccess: () => {
      toast.success("Tournament created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createTournamentMutation,
  };
}
