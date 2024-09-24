import { getUserById } from "@/server-requests/user.server-request";
import { getSession } from "./cookie-handler.service";

export function selectFirstRole(
  roles: {
    id: number;
    name: string;
  }[]
) {
  if (roles?.length === 0 || !roles) return null;

  return roles[0];
}

export async function getUserRole() {
  const session = getSession({ isServer: true });

  if (session) {
    const userDetails = await getUserById(parseInt(session.id));

    if (!userDetails) return null;
    if (userDetails.roles?.length === 0 || !userDetails.roles) return null;

    const selectedRole = selectFirstRole(userDetails.roles);
    
    // Returning first role of the user
    return selectedRole?.id;
  }

  return null;
}
