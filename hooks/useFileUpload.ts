"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { UPLOAD_FILE } from "@/graphql/mutations/general";

export enum USE_FILE_UPLOAD_KEY {
  UPLOAD_FILE = "UPLOAD_FILE",
}

export default function useFileUpload() {
  const uploadFileMutation = useMutation({
    mutationKey: [USE_FILE_UPLOAD_KEY.UPLOAD_FILE],
    mutationFn: async (variables: { file: File }) =>
      graphqlRequestHandler({
        query: UPLOAD_FILE,
        variables: { file: variables },
      }),
    onSuccess: (res) => {
      return res.uploadFile.url;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    uploadFileMutation,
  };
}
