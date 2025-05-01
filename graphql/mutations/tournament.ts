import { graphql } from "../generated";

export const CREATE_TOURNAMENT = graphql(`
  mutation CreateTournament($input: CreateTournamentInputDto!) {
    createTournament(input: $input) {
      created_at
      description
      end_date
      id
      isPrivate
      name
      start_date
      updated_at
    }
  }
`);

export const START_TOURNAMENT = graphql(`
  mutation StartTournament($tournamentId: Float!) {
    startTournament(tournamentId: $tournamentId) {
      id
      name
      status
    }
  }
`);
