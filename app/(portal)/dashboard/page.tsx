import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

export default function Dashboard() {
  return (
    <>
       <PageTitle
        title="Dashboard"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />

      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Analytics of The Bracket Boss
          </h3>
        </div>
      </div>
    </>
  );
}
