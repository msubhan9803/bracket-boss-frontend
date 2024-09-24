import { getUserById } from "@/server-requests/user.server-request";
import { getSession } from "./cookie-handler.service";

export async function getUsersFirstRole() {
  const session = getSession({ isServer: true });

  if (session) {
    const userDetails = await getUserById(parseInt(session.id));

    if (!userDetails) return null;
    if (userDetails.roles?.length === 0 || !userDetails.roles) return null;

     // Returning first role of the user
    return parseInt(userDetails?.roles[0].id);
  }

  return null;
}
