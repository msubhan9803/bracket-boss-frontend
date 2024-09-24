"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UPLOAD_FILE } from "@/graphql/mutations/general";
import { fileUploadMutationHandler } from "@/lib/graphql-client";
import {
  UploadFileResponse,
  UploadFileVariables,
} from "./types/useFileUpload.types";
import { print } from "graphql";

export enum USE_FILE_UPLOAD_KEY {
  UPLOAD_FILE = "UPLOAD_FILE",
}

export default function useFileUpload() {
  const uploadFileMutation = useMutation<
    UploadFileResponse,
    Error,
    UploadFileVariables
  >({
    mutationKey: [USE_FILE_UPLOAD_KEY.UPLOAD_FILE],
    mutationFn: async (variables: UploadFileVariables) => {
      const query = print(UPLOAD_FILE);
      const operationName = UPLOAD_FILE.definitions.find(
        (def) => def.kind === "OperationDefinition"
      )?.name?.value;

      if (!query || !operationName) {
        throw new Error(
          "Failed to extract query or operation name from UPLOAD_FILE"
        );
      }

      const payload = {
        query,
        operationName,
        variables: { file: variables.file },
      };

      return fileUploadMutationHandler<UploadFileResponse, UploadFileVariables>(
        {
          query: payload.query,
          variables: payload.variables,
          file: variables.file,
          options: {},
        }
      );
    },
    onSuccess: () => {
      toast.success("File uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    uploadFileMutation,
  };
}
