import PageTitle from "@/components/PageTitle";
import ScheduleListTable from "@/components/tables/ScheduleListTable";
import { PageProps } from "@/global";
import { PageUrls } from "@/lib/app-types";
import { NextPage } from "next";

const ScheduleManagement: NextPage<PageProps> = async () => {
  return (
    <>
      <PageTitle
        title="Schedule Management"
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

export default ScheduleManagement;
