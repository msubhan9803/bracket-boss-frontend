import PageTitle from "@/components/PageTitle";
import CourtListTable from "@/components/tables/CourtListTable";
import { PageUrls } from "@/lib/app-types";

export default async function CourtManagement() {
  return (
    <>
      <PageTitle
        title="Court Management"
        breadcrumbs={[
          { label: "Court Management", href: PageUrls.COURT_MANAGEMENT },
        ]}
      />

      <CourtListTable />
    </>
  );
}
