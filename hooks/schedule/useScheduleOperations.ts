"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { END_ROUND, CREATE_SCHEDULE } from "@/graphql/mutations/schedule";

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
    mutationFn: async (variables: { tournamentId: number, poolId: number }) =>
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

  return {
    createScheduleMutation,
    endRoundMutation
  };
}
