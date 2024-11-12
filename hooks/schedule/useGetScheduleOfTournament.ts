import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { GetScheduleOfTournamentInput } from "@/graphql/generated/graphql";
import { GET_SCHEDULE_OF_TOURNAMENT } from "@/graphql/queries/schedule";
import { graphqlRequestHandler } from "@/lib/graphql-client";

export enum USE_SCHEDULE_OF_TOURNAMENT {
  GET_SCHEDULE_OF_TOURNAMENT = "GET_SCHEDULE_OF_TOURNAMENT",
}

export default function useGetScheduleOfTournament() {
  const getScheduleOfTournamentMutation = useMutation({
    mutationKey: [USE_SCHEDULE_OF_TOURNAMENT.GET_SCHEDULE_OF_TOURNAMENT],
    mutationFn: async (variables: GetScheduleOfTournamentInput) =>
      graphqlRequestHandler({
        query: GET_SCHEDULE_OF_TOURNAMENT,
        variables: { input: variables },
      }),
  });

  return {
    getScheduleOfTournamentMutation
  };
}
