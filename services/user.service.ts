import { UserDetails } from "./types/user.service.types";

export function getUserRole(userDetails: UserDetails) {
  return userDetails.roles && userDetails.roles.length > 0
    ? parseInt(userDetails.roles[0].id)
    : null;
}
