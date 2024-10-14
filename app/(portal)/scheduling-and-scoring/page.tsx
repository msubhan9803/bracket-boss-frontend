import PageTitle from "@/components/PageTitle";
import TournamentListTable from "@/components/tables/TournamentListTable";
import { PageUrls } from "@/lib/app-types";

export default async function SchedulingAndScoring() {
  return (
    <>
      <PageTitle
        title="Scheduling and Scoring"
        breadcrumbs={[
          { label: "Tournament Management", href: PageUrls.TOURNAMENT_MANAGEMENT },
        ]}
      />

      <TournamentListTable />
    </>
  );
}
