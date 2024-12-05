"use client";
import { Fragment, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicFormField } from "@/global";
import { CreateTeamInputDto } from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import useDownloadScheduleTemplates from "@/hooks/schedule/useDownloadScheduleTemplates";
import { downloadXLSX } from "@/lib/utils";
import FormWrapper from "../core/FormWrapper";

const formSchema = z.object({
  file: z.instanceof(File).nullable(),
});

type FormData = z.infer<typeof formSchema>;

const ImportScheduleDataButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    downloadUserDataForScheduleMutation,
    downloadEmptyScheduleTemplateMutation
  } = useDownloadScheduleTemplates();

  const formFields: DynamicFormField<any>[] = useMemo(
    () => [
      {
        label: "Bulk Match Upload",
        name: "file",
        type: "file",
        placeholder: "Upload a file",
        className: "max-h-96 w-full",
        allowedTypes: [
          {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            label: 'xlsx'
          }
        ],
      }
    ],
    []
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
    },
  });

  const handleDownloadUserData = async () => {
    const data = await downloadUserDataForScheduleMutation.mutateAsync();
    downloadXLSX(data.downloadUserDataForSchedule, 'user_data_template.xlsx');
  }

  const handleDownloadEmptyScheduleTemplate = async () => {
    const data = await downloadEmptyScheduleTemplateMutation.mutateAsync();
    downloadXLSX(data.downloadEmptyScheduleTemplate, 'empty-schedule-template.xlsx');
  }

  const onSubmit = async (values: FormData) => {
    console.log('Here is the file', values.file);
  };

  return (
    <Fragment>
      <Button onClick={() => setShowModal(true)} variant="secondary">
        Import data
      </Button>

      <Sheet open={showModal} onOpenChange={setShowModal}>
        <SheetContent className="w-screen md:max-w-md lg:max-w-lg xl:max-w-xl h-screen px-5 overflow-y-scroll">
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

          <hr className="mt-4" />

          <FormWrapper
            form={form}
            fields={formFields}
            onSubmit={onSubmit}
            submitButtonLabel="Submit"
          />

        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default ImportScheduleDataButton;
