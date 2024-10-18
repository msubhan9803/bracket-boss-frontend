import { getAllClubsQuery } from "@/server-requests/club.server-request";

export async function getAllClubs() {
  const clubs = await getAllClubsQuery();
  return clubs;
}
