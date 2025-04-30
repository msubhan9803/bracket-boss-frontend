"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { CREATE_SCHEDULE } from "@/graphql/mutations/schedule";
import { CreateTournamentTeamsInputDto } from "@/graphql/generated/graphql";
import { CREATE_TOURNAMENT_TEAM } from "@/graphql/mutations/team";

export enum USE_SCHEDULE_CREATEION_KEY {
  CREATE_SCHEDULE = "CREATE_SCHEDULE",
  CREATE_TOURNAMENT_TEAM = "CREATE_TOURNAMENT_TEAM"
}

export default function useScheduleCreation() {
  const createScheduleMutation = useMutation({
    mutationKey: [USE_SCHEDULE_CREATEION_KEY.CREATE_SCHEDULE],
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

  const createTournamentTeamMutation = useMutation({
    mutationKey: [USE_SCHEDULE_CREATEION_KEY.CREATE_TOURNAMENT_TEAM],
    mutationFn: async (variables: CreateTournamentTeamsInputDto) =>
      graphqlRequestHandler({
        query: CREATE_TOURNAMENT_TEAM,
        variables: { input: variables },
      }),
    onSuccess: () => {
      toast.success("Tournament teams created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createScheduleMutation,
    createTournamentTeamMutation
  };
}
