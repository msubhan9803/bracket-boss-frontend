"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useParams } from 'next/navigation';
import { fileUploadMutationHandler } from "@/lib/graphql-client";
import { print } from "graphql";
import { BULK_MATCH_IMPORT } from "@/graphql/mutations/schedule";
import { UploadFileVariables } from "../types/useFileUpload.types";
import { BulkMatchImportMutation, BulkMatchImportMutationVariables } from "@/graphql/generated/graphql";
import { PageNames, PageUrls } from "@/lib/app-types";

export enum USE_BULK_MATCH_IMPORT_KEY {
  BULK_MATCH_IMPORT = "BULK_MATCH_IMPORT",
}

export default function useBulkMatchImport() {
  const router = useRouter();
  const params = useParams();

  const bulkMatchImportMutation = useMutation<
    BulkMatchImportMutation,
    Error,
    BulkMatchImportMutationVariables
  >({
    mutationKey: [USE_BULK_MATCH_IMPORT_KEY.BULK_MATCH_IMPORT],
    mutationFn: async (variables: UploadFileVariables) => {
      const query = print(BULK_MATCH_IMPORT);
      const operationName = BULK_MATCH_IMPORT.definitions.find(
        (def) => def.kind === "OperationDefinition"
      )?.name?.value;

      if (!query || !operationName) {
        throw new Error(
          "Failed to extract query or operation name from BULK_MATCH_IMPORT"
        );
      }

      const payload = {
        query,
        operationName,
        variables: { file: variables.file },
      };

      return Promise.resolve(fileUploadMutationHandler<BulkMatchImportMutation, BulkMatchImportMutationVariables>(
        {
          operationName: payload.operationName,
          query: payload.query,
          variables: payload.variables,
          file: variables.file,
          options: {},
        }
      )).then((res) => {
        toast.success(res.bulkMatchImport.message);

        if (!window.location.pathname.includes(PageNames.SCHEDULE_EDITOR)) {
          router.push(`${PageUrls.SCHEDULING_MANAGEMENT}/${params.tournamentId}/${PageNames.SCHEDULE_EDITOR}`)
        } else {
          window.location.reload();
        }

        return res;
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    bulkMatchImportMutation,
  };
}
