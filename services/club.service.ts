import { getAllClubsQuery } from "@/server-requests/clube.server-request";

export async function getAllClubs() {
  const clubs = await getAllClubsQuery();
  return clubs;
}
