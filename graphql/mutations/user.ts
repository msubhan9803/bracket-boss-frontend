import { graphql } from "../generated";

export const UPDATE_USER_ROLE = graphql(`
  mutation UpdateUserRole($input: UpdateUserRoleDto!) {
    updateUserRole(input: $input) {
      message
      user {
        id
        roles {
          id
          name
        }
      }
    }
  }
`);

export const UPDATE_USER_CLUB = graphql(`
  mutation UpdateUserClub($input: UpdateUserClubDto!) {
    updateUserClub(input: $input) {
      message
      user {
        id
        email
        name
      }
    }
  }
`);
