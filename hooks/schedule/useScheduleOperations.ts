"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { END_ROUND, CREATE_SCHEDULE, PROCEED_TO_NEXT_LEVEL, CONCLUDE_TOURNAMENT, DELETE_SCHEDULE } from "@/graphql/mutations/schedule";

export enum USE_SCHEDULE_OPERATIONS_KEY {
  CREATE_SCHEDULE = "CREATE_SCHEDULE",
  END_ROUND = 'END_ROUND'
}

export default function useScheduleOperations() {
  const createScheduleMutation = useMutation({
    mutationKey: [USE_SCHEDULE_OPERATIONS_KEY.CREATE_SCHEDULE],
    mutationFn: async (variables: { tournamentId: number }) =>
      graphqlRequestHandler({
        query: CREATE_SCHEDULE,
        variables,
      }),
    onSuccess: () => {
      toast.success("Schedule created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const endRoundMutation = useMutation({
    mutationKey: [USE_SCHEDULE_OPERATIONS_KEY.END_ROUND],
    mutationFn: async (variables: { levelId: number, poolId: number }) =>
      graphqlRequestHandler({
        query: END_ROUND,
        variables,
      }),
    onSuccess: () => {
      toast.success("Round ended");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const proceedToNextLevelMutation = useMutation({
    mutationKey: [USE_SCHEDULE_OPERATIONS_KEY.END_ROUND],
    mutationFn: async (variables: { tournamentId: number }) =>
      graphqlRequestHandler({
        query: PROCEED_TO_NEXT_LEVEL,
        variables,
      }),
    onSuccess: () => {
      toast.success("Proceeded to next level");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const concludeTournamentMutation = useMutation({
    mutationKey: [USE_SCHEDULE_OPERATIONS_KEY.END_ROUND],
    mutationFn: async (variables: { tournamentId: number }) =>
      graphqlRequestHandler({
        query: CONCLUDE_TOURNAMENT,
        variables,
      }),
    onSuccess: () => {
      toast.success("Tournament completed");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteScheduleMutation = useMutation({
    mutationKey: [USE_SCHEDULE_OPERATIONS_KEY.END_ROUND],
    mutationFn: async (variables: { tournamentId: number }) =>
      graphqlRequestHandler({
        query: DELETE_SCHEDULE,
        variables: { input: variables },
      }),
    onSuccess: () => {
      toast.success("Schedule deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createScheduleMutation,
    endRoundMutation,
    proceedToNextLevelMutation,
    concludeTournamentMutation,
    deleteScheduleMutation
  };
}
