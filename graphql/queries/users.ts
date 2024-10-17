import { graphql } from "../generated";

export const GET_ALL_USERS_WITHOUT_PAGINATION = graphql(`
  query GetAllUsersWithoutPagination($userRole: Float) {
    getAllUsersWithoutPagination(userRole: $userRole) {
      created_at
      email
      id
      isEmailVerified
      name
      otpSecret
      profileImage
      updated_at
    }
  }
`);

export const GET_ALL_USERS = graphql(`
  query GetAllUsers(
    $userRole: Float
    $filter: String
    $filterBy: String
    $page: Int
    $pageSize: Int
    $sort: SortInput
  ) {
    getAllUsers(
      userRole: $userRole
      filter: $filter
      filterBy: $filterBy
      page: $page
      pageSize: $pageSize
      sort: $sort
    ) {
      totalRecords
      users {
        id
        email
        name
        userRoleClub {
          role {
            id
            name
          }
        }
      }
    }
  }
`);

export const GET_USER_BY_ID = graphql(`
  query GetUserById($userId: Float!) {
    getUserById(userId: $userId) {
      user {
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
        clubs {
          id
        }
      }
      userRoleClub {
        id
        role {
          id
        }
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

export const GET_PERMISSIONS_BY_ROLEID = graphql(`
  query GetPermissionsByRoleId($roleId: Float!) {
    getPermissionsByRoleId(roleId: $roleId) {
      id
      roleId
      moduleId
      moduleName
      policyId
      policyName
    }
  }
`);
