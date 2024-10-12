import PageTitle from "@/components/PageTitle";
import CourtListTable from "@/components/tables/CourtListTable";

export default async function TournamentManagement() {
  return (
    <>
      <PageTitle
        title="Court Management"
        breadcrumbs={[
          { label: "Court Management", href: "/court-management" },
        ]}
      />

      <CourtListTable />
    </>
  );
}
