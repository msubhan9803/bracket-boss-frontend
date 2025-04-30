"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { CreateTeamInputDto } from "@/graphql/generated/graphql";
import { CREATE_TEAM } from "@/graphql/mutations/team";

export enum USE_TEAM_OPERATIONS_KEY {
  CREATE_TEAM = "CREATE_TEAM",
  CREATE_TOURNAMENT_TEAM = "CREATE_TOURNAMENT_TEAM",
}

export default function useTeamOperations() {
  const createTeamMutation = useMutation({
    mutationKey: [USE_TEAM_OPERATIONS_KEY.CREATE_TEAM],
    mutationFn: async (variables: CreateTeamInputDto) =>
      graphqlRequestHandler({
        query: CREATE_TEAM,
        variables: { input: variables },
      }),
    onSuccess: () => {
      toast.success("Tournament created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createTeamMutation
  };
}
