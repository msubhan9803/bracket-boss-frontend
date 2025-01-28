import { graphql } from "../generated";

export const GET_SCHEDULE_OF_TOURNAMENT_INPUT = graphql(`
  query GetSchedulePreperationDataOfTournament(
    $input: GetSchedulePreperationDataOfTournamentInput!
  ) {
    getSchedulePreperationDataOfTournament(input: $input) {
      matches {
        name
        teams {
          name
          players {
            id
            name
          }
        }
      }
    }
  }
`);

export const GET_SCHEDULE_OF_TOURNAMENT = graphql(`
  query GetScheduleOfTournament($input: GetScheduleOfTournamentInput!) {
    getScheduleOfTournament(input: $input) {
      schedule {
        matches {
          awayTeam {
            name
            users {
              name
            }
          }
          homeTeam {
            name
            users {
              name
            }
          }
          courtSchedule {
            day {
              name
            }
            timeSlot {
              startTime
              endTime
            }
            court {
              name
            }
          }
          matchDate
        }
      }
    }
  }
`);
