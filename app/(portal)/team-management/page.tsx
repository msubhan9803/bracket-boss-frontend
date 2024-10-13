import PageTitle from "@/components/PageTitle";
import TeamListTable from "@/components/tables/TeamListTable";
import { PageUrls } from "@/lib/app-types";
import { getAllTournamentsWithoutPagination } from "@/server-requests/tournament.server-request";
import { getAllUsersWithoutPagination } from "@/server-requests/user.server-request";

export default async function TeamManagement() {
  const tournaments = await getAllTournamentsWithoutPagination();
  const users = await getAllUsersWithoutPagination();

  return (
    <>
      <PageTitle
        title="Team Management"
        breadcrumbs={[
          { label: "Team Management", href: PageUrls.TEAM_MANAGEMENT },
        ]}
      />

      <TeamListTable tournaments={tournaments} users={users} />
    </>
  );
}
