import PageTitle from "@/components/PageTitle";
import TournamentListTable from "@/components/tables/TournamentListTable";

export default async function Dashboard() {
  return (
    <>
      <PageTitle
        title="Tournament Management"
        breadcrumbs={[
          { label: "Tournament Management", href: "/tournament-management" },
        ]}
      />

      <TournamentListTable />
    </>
  );
}
