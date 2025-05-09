"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { ADVANCE_TO_NEXT_POOL_ROUND, CREATE_SCHEDULE } from "@/graphql/mutations/schedule";

export enum USE_SCHEDULE_OPERATIONS_KEY {
  CREATE_SCHEDULE = "CREATE_SCHEDULE",
  ADVANCE_TO_NEXT_POOL_ROUND = 'ADVANCE_TO_NEXT_POOL_ROUND'
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

  const advanceToNextPoolRoundMutation = useMutation({
    mutationKey: [USE_SCHEDULE_OPERATIONS_KEY.ADVANCE_TO_NEXT_POOL_ROUND],
    mutationFn: async (variables: { tournamentId: number, poolId: number }) =>
      graphqlRequestHandler({
        query: ADVANCE_TO_NEXT_POOL_ROUND,
        variables,
      }),
    onSuccess: () => {
      toast.success("Next round started");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createScheduleMutation,
    advanceToNextPoolRoundMutation
  };
}
