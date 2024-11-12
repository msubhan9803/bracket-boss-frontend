"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { CreateScheduleInputDto } from "@/graphql/generated/graphql";
import { CREATE_SCHEDULE } from "@/graphql/mutations/schedule";

export enum USE_SCHEDULE_OPERATIONS_KEY {
  CREATE_SCHEDULE = "CREATE_SCHEDULE",
}

export default function useScheduleOperations() {
  const createScheduleMutation = useMutation({
    mutationKey: [USE_SCHEDULE_OPERATIONS_KEY.CREATE_SCHEDULE],
    mutationFn: async (variables: CreateScheduleInputDto) =>
      graphqlRequestHandler({
        query: CREATE_SCHEDULE,
        variables: { input: variables },
      }),
    onSuccess: () => {
      toast.success("Schedule created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createScheduleMutation,
  };
}
