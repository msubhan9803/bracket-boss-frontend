"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { CREATE_TOURNAMENT, DELETE_TOURNAMENT, START_TOURNAMENT } from "@/graphql/mutations/tournament";
import { CreateTournamentInputDto } from "@/graphql/generated/graphql";

export enum USE_TOURNAMENT_OPERATIONS_KEY {
  CREATE_TOURNAMENT = "CREATE_TOURNAMENT",
  START_TOURNAMENT = "START_TOURNAMENT",
  DELETE_TOURNAMENT = "DELETE_TOURNAMENT",
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

  const startTournamentMutation = useMutation({
    mutationKey: [USE_TOURNAMENT_OPERATIONS_KEY.START_TOURNAMENT],
    mutationFn: async (tournamentId: number) =>
      graphqlRequestHandler({
        query: START_TOURNAMENT,
        variables: { tournamentId },
      }),
    onSuccess: () => {
      toast.success("Tournament started successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteTournamentMutation = useMutation({
    mutationKey: [USE_TOURNAMENT_OPERATIONS_KEY.DELETE_TOURNAMENT],
    mutationFn: async (tournamentId: number) =>
      graphqlRequestHandler({
        query: DELETE_TOURNAMENT,
        variables: { tournamentId },
      }),
    onSuccess: () => {
      toast.success("Tournament deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createTournamentMutation,
    startTournamentMutation,
    deleteTournamentMutation
  };
}
