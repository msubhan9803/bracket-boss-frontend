import PageTitle from "@/components/PageTitle";
import TeamListTable from "@/components/tables/TeamListTable";
import { PageUrls } from "@/lib/app-types";

export default async function TournamentManagement() {
  return (
    <>
      <PageTitle
        title="Team Management"
        breadcrumbs={[
          { label: "Team Management", href: PageUrls.TEAM_MANAGEMENT },
        ]}
      />

      <TeamListTable />
    </>
  );
}
