import PageTitle from "@/components/PageTitle";
import ScheduleListTable from "@/components/tables/ScheduleListTable";
import { PageProps } from "@/global";
import { PageUrls } from "@/lib/app-types";
import { NextPage } from "next";

const SchedulingAndScoring: NextPage<PageProps> = async () => {
  return (
    <>
      <PageTitle
        title="Scheduling Management"
        breadcrumbs={[
          {
            label: "Schedule Management",
            href: PageUrls.SCHEDULING_MANAGEMENT,
          },
        ]}
      />

      <ScheduleListTable />
    </>
  );
};

export default SchedulingAndScoring;
