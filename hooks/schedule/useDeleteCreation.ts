"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { DELETE_SCHEDULE } from "@/graphql/mutations/schedule";
import { DeleteScheduleInputDto } from "@/graphql/generated/graphql";

export enum USE_CLUB_KEY {
  DELETE_SCHEDULE = "DELETE_SCHEDULE",
}

export default function useDeleteCreation() {
  const deleteScheduleMutation = useMutation({
    mutationKey: [USE_CLUB_KEY.DELETE_SCHEDULE],
    mutationFn: async (variables: DeleteScheduleInputDto) =>
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
    deleteScheduleMutation,
  };
}
