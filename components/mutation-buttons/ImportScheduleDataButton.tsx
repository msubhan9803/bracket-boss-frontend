"use client";
import { Fragment, useMemo, useState } from "react";
import { DynamicFormField } from "@/global";
import { CreateTeamInputDto } from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import useDownloadScheduleTemplates from "@/hooks/schedule/useDownloadScheduleTemplates";
import { downloadXLSX } from "@/lib/utils";

const ImportScheduleDataButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    downloadUserDataForScheduleMutation,
    downloadEmptyScheduleTemplateMutation
  } = useDownloadScheduleTemplates();

  const formFields: DynamicFormField<CreateTeamInputDto>[] = useMemo(
    () => [],
    []
  );

  const handleDownloadUserData = async () => {
    const data = await downloadUserDataForScheduleMutation.mutateAsync();
    downloadXLSX(data.downloadUserDataForSchedule, 'user_data_template.xlsx');
  }

  const handleDownloadEmptyScheduleTemplate = async () => {
    const data = await downloadEmptyScheduleTemplateMutation.mutateAsync();
    downloadXLSX(data.downloadEmptyScheduleTemplate, 'empty-schedule-template.xlsx');
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

          <Button onClick={handleDownloadUserData} loading={downloadUserDataForScheduleMutation.isPending} className="w-full my-2">
            Download User Data
          </Button>

          <Button onClick={handleDownloadEmptyScheduleTemplate} loading={downloadEmptyScheduleTemplateMutation.isPending} className="w-full my-2">
            Download Empty Schedule Template
          </Button>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default ImportScheduleDataButton;
