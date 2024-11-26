import { graphql } from "../generated";

export const CREATE_SCHEDULE = graphql(`
  mutation CreateSchedule($input: CreateScheduleInputDto!) {
    createSchedule(input: $input) {
      schedule {
        tournament {
          id
          name
        }
        tournamentRounds {
          id
          roundNumber
          roundFormat {
            name
          }
        }
        matches {
          id
          homeTeam {
            name
          }
          awayTeam {
            name
          }
          statuses {
            status
          }
          courts {
            name
          }
        }
        teams {
          name
        }
      }
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
