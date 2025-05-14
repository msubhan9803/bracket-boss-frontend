import { graphql } from "../generated";

export const CREATE_SCHEDULE = graphql(`
  mutation CreateSchedule($tournamentId: Float!) {
    createSchedule(tournamentId: $tournamentId) {
      id
      name
      pools {
        name
        rounds {
          id
          name
          matches {
            id
            title
          }
        }
      }
    }
  }
`);

export const END_ROUND = graphql(`
  mutation EndRound($poolId: Float!, $levelId: Float!) {
    endRound(poolId: $poolId, levelId: $levelId) {
      message
    }
  }
`);

export const PROCEED_TO_NEXT_LEVEL = graphql(`
  mutation ProceedToNextLevel($tournamentId: Float!) {
    proceedToNextLevel(tournamentId: $tournamentId) {
      message
    }
  }
`);

export const CONCLUDE_TOURNAMENT = graphql(`
  mutation ConcludeTournament($tournamentId: Float!) {
    concludeTournament(tournamentId: $tournamentId) {
      message
    }
  }
`);

export const DELETE_SCHEDULE = graphql(`
  mutation DeleteSchedule($input: DeleteScheduleInputDto!) {
    deleteSchedule(input: $input) {
      message
    }
  }
`);

export const DOWNLOAD_USER_DATA_FOR_SCHEDULE = graphql(`
  mutation DownloadUserDataForSchedule {
    downloadUserDataForSchedule
  }
`);

export const DOWNLOAD_EMPTY_SCHEDULE_TEMPLATE = graphql(`
  mutation DownloadEmptyScheduleTemplate {
    downloadEmptyScheduleTemplate
  }
`);

export const BULK_MATCH_IMPORT = graphql(`
  mutation BulkMatchImport($file: Upload!) {
    bulkMatchImport(file: $file) {
      message
    }
  }
`);
