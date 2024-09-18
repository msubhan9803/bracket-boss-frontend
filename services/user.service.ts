import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserById } from "@/server-requests/user.server-request";
import { UserDetails } from "./types/user.service.types";

export async function getUserSessionServer() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) throw new Error("User not authenticated");

  const userId = parseInt(session.user.id as string);
  const userDetails = await getUserById(userId);

  return { userId, userDetails, session };
}

export function getUserRole(userDetails: UserDetails) {
  return userDetails.roles && userDetails.roles.length > 0
    ? parseInt(userDetails.roles[0].id)
    : null;
}
