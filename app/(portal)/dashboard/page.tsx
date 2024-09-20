"use client"
import PageTitle from "@/components/PageTitle";
import useUser from "@/hooks/useUser";

export default function Dashboard() {
  const { userDetails } = useUser();

  return (
    <>
      <PageTitle
        title="Dashboard"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}
      />

      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Analytics of The Bracket Boss
          </h3>
          <h2 className="text-primary">{userDetails?.getUserById.name}</h2>
        </div>
      </div>
    </>
  );
}
