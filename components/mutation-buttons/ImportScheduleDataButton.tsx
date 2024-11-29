"use client";
import { Fragment, useMemo, useState } from "react";
import { DynamicFormField } from "@/global";
import { CreateTeamInputDto } from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import useDownloadUserDataForSchedule from "@/hooks/schedule/useDownloadUserDataForSchedule";
import { downloadCSV } from "@/lib/utils";

const ImportScheduleDataButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const { downloadUserDataForScheduleMutation } = useDownloadUserDataForSchedule();

  const formFields: DynamicFormField<CreateTeamInputDto>[] = useMemo(
    () => [],
    []
  );

  const handleDownloadUserData = async () => {
    const data = await downloadUserDataForScheduleMutation.mutateAsync();
    downloadCSV(data.downloadUserDataForSchedule, 'user_data_template.csv');
  }

  return (
    <Fragment>
      <Button onClick={() => setShowModal(true)} variant="secondary">
        Import data
      </Button>

      <Sheet open={showModal} onOpenChange={setShowModal}>
        <SheetContent className="w-screen md:max-w-md lg:max-w-lg xl:max-w-xl h-screen px-5">
          <SheetHeader className="text-left h-20 flex flex-col justify-center">
            <SheetTitle>Import Schedule data</SheetTitle>
            <SheetDescription>Upload a CSV file to import schedule data</SheetDescription>
          </SheetHeader>

          <div className="flex justify-end">
            <Button onClick={handleDownloadUserData} loading={downloadUserDataForScheduleMutation.isPending}>
              Download User Data
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default ImportScheduleDataButton;
