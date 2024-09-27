import { graphql } from "../generated";

export const GET_USERS = graphql(`
  query GetUsers {
    getUsers {
      id
      email
      name
    }
  }
`);

export const GET_USER_BY_ID = graphql(`
  query GetUserById($userId: Float!) {
    getUserById(userId: $userId) {
      created_at
      email
      id
      isEmailVerified
      name
      otpSecret
      profileImage
      updated_at
      steps {
        id
        name
      }
      roles {
        id
        name
      }
    }
  }
`);

export const GET_STEPS_OF_USER = graphql(`
  query GetStepsOfUser {
    getStepsOfUser {
      id
      name
    }
  }
`);
