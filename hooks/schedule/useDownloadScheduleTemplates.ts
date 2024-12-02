"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { DOWNLOAD_EMPTY_SCHEDULE_TEMPLATE, DOWNLOAD_USER_DATA_FOR_SCHEDULE } from "@/graphql/mutations/schedule";

export enum USE_DOWNLOAD_USER_DATA_FOR_SCHEDULE {
  DOWNLOAD_USER_DATA_FOR_SCHEDULE = "DOWNLOAD_USER_DATA_FOR_SCHEDULE",
  DOWNLOAD_EMPTY_SCHEDULE_TEMPLATE = "DOWNLOAD_EMPTY_SCHEDULE_TEMPLATE",
}

export default function useDownloadScheduleTemplates() {
  const downloadUserDataForScheduleMutation = useMutation({
    mutationKey: [USE_DOWNLOAD_USER_DATA_FOR_SCHEDULE.DOWNLOAD_USER_DATA_FOR_SCHEDULE],
    mutationFn: async () =>
      graphqlRequestHandler({
        query: DOWNLOAD_USER_DATA_FOR_SCHEDULE,
      }),
    onSuccess: () => {
      toast.success("Template downloaded successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const downloadEmptyScheduleTemplateMutation = useMutation({
    mutationKey: [USE_DOWNLOAD_USER_DATA_FOR_SCHEDULE.DOWNLOAD_EMPTY_SCHEDULE_TEMPLATE],
    mutationFn: async () =>
      graphqlRequestHandler({
        query: DOWNLOAD_EMPTY_SCHEDULE_TEMPLATE,
      }),
    onSuccess: () => {
      toast.success("Template downloaded successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    downloadUserDataForScheduleMutation,
    downloadEmptyScheduleTemplateMutation,
  };
}
