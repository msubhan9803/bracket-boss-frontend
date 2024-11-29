"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { DOWNLOAD_USER_DATA_FOR_SCHEDULE } from "@/graphql/mutations/schedule";

export enum USE_DOWNLOAD_USER_DATA_FOR_SCHEDULE {
  DOWNLOAD_USER_DATA_FOR_SCHEDULE = "DOWNLOAD_USER_DATA_FOR_SCHEDULE",
}

export default function useDownloadUserDataForSchedule() {
  const downloadUserDataForScheduleMutation = useMutation({
    mutationKey: [USE_DOWNLOAD_USER_DATA_FOR_SCHEDULE.DOWNLOAD_USER_DATA_FOR_SCHEDULE],
    mutationFn: async () =>
      graphqlRequestHandler({
        query: DOWNLOAD_USER_DATA_FOR_SCHEDULE,
      }),
    onSuccess: () => {
      toast.success("Fetched user template successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    downloadUserDataForScheduleMutation,
  };
}
