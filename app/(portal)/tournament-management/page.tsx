import PageTitle from "@/components/PageTitle";
import TournamentListTable from "@/components/tables/TournamentListTable";
import { PageUrls } from "@/lib/app-types";

export default async function TournamentManagement() {
  return (
    <>
      <PageTitle
        title="Tournament Management"
        breadcrumbs={[
          { label: "Tournament Management", href: PageUrls.TOURNAMENT_MANAGEMENT },
        ]}
      />

      <TournamentListTable />
    </>
  );
}
