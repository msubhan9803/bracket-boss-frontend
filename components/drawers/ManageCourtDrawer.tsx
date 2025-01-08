import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { DynamicFormField as DynamicFormFieldType } from '@/global'
import DynamicFormSheet from '../core/DynamicFormSheet'
import { Court } from '@/graphql/generated/graphql'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import DynamicFormField from "../core/DynamicFormField";
import { MoveRight, Trash } from "lucide-react";

type ManageCourtDrawerProps = {
  editModalOpen: boolean
  setEditModalOpen: any
  onUpdate: (id: string, data: any) => any
  item: Partial<Court | any>
}

type ScheduleTiming = {
  startTime: string;
  endTime: string;
};

type DailySchedule = {
  day: string;
  scheduleTimings: ScheduleTiming[];
};

type FormData = {
  name: string;
  location: string;
  courtLength: number;
  courtWidth: number;
  dailySchedule: DailySchedule[];
};

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const validationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  courtLength: z.number().min(1, "Must be greater than 0"),
  courtWidth: z.number().min(1, "Must be greater than 0"),
});

const ManageCourtDrawer = ({ editModalOpen, setEditModalOpen, onUpdate, item }: ManageCourtDrawerProps) => {
  const [activeDay, setActiveDay] = useState(DAYS_OF_WEEK[0]);
  const form = useForm<FormData>({
    defaultValues: {
      name: item?.name || "",
      location: item?.location || "",
      courtLength: item?.courtLength || 0,
      courtWidth: item?.courtWidth || 0,
      dailySchedule: DAYS_OF_WEEK.map((day) => ({
        day,
        scheduleTimings: [],
      })),
    },
  });
  const { fields: scheduleFields, append, remove } = useFieldArray({
    control: form.control,
    name: `dailySchedule`,
  });
  const formState = useMemo(() => form.watch(), [form]);
  const activeDayIndex = useMemo(() => scheduleFields.findIndex(
    (field) => field.day === activeDay
  ), [scheduleFields, activeDay]);

  const handleAddTimeSlot = (dayIndex: number) => {
    const currentTimings = form.getValues(`dailySchedule.${dayIndex}.scheduleTimings`) || [];
    form.setValue(`dailySchedule.${dayIndex}.scheduleTimings`, [
      ...currentTimings,
      { startTime: "", endTime: "" },
    ]);
  };

  const handleRemoveTimeSlot = (dayIndex: number, timingIndex: number) => {
    const currentTimings =
      form.getValues(`dailySchedule.${dayIndex}.scheduleTimings`) || [];
    form.setValue(
      `dailySchedule.${dayIndex}.scheduleTimings`,
      currentTimings.filter((_, i) => i !== timingIndex)
    );
  };

  const formFields = useMemo(() => {
    const fields: DynamicFormFieldType<any>[] = [
      {
        type: "render",
        className: "col-span-2",
        isVisible: true,
        render: () => (
          <h1 className='text-lg font-bold'>Court Details</h1>
        ),
      },
      {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Court Name',
        required: true,
        defaultValue: item?.name || '',
        className: 'col-span-2',
      },
      {
        label: 'Location',
        name: 'location',
        type: 'text',
        placeholder: 'Court Location',
        required: true,
        defaultValue: item?.location || '',
        className: 'col-span-2',
      },
      {
        label: "Court Length",
        name: "courtLength",
        type: "number",
        placeholder: "e.g. 10",
        suffixRender: <p>feet</p>,
        className: 'col-span-2 lg:col-span-1',
      },
      {
        label: "Court Width",
        name: "courtWidth",
        type: "number",
        placeholder: "e.g. 10",
        suffixRender: <p>feet</p>,
        className: 'col-span-2 lg:col-span-1',
      },
      {
        type: "render",
        className: "col-span-2 my-2",
        isVisible: true,
        render: () => (
          <hr />
        ),
      },
      {
        type: "render",
        className: "col-span-2",
        isVisible: true,
        render: () => (
          <h1 className='text-lg font-bold'>Court Timings</h1>
        ),
      },
      {
        type: "render",
        className: "col-span-2",
        isVisible: true,
        render: () => (
          <Tabs value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="my-2">
              {scheduleFields.map((field, index) => (
                <TabsTrigger
                  key={field.day}
                  value={field.day}
                  className={activeDay === field.day ? "!bg-primary" : ""}
                >
                  {field.day.slice(0, 3).toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>

            {scheduleFields.map((field, dayIndex) => (
              <TabsContent key={field.day} value={field.day} className="my-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">Time Slots</h2>

                  <Button
                    absoluteLoaderPosition
                    type="button"
                    className="font-bold"
                    onClick={() => handleAddTimeSlot(dayIndex)}
                  >
                    Add Time Slot
                  </Button>
                </div>

                {form
                  .getValues(`dailySchedule.${dayIndex}.scheduleTimings`)
                  ?.map((_, timingIndex) => (
                    <div key={timingIndex} className="flex items-end gap-2">
                      <DynamicFormField
                        dynamicField={{
                          name: `dailySchedule.${dayIndex}.scheduleTimings.${timingIndex}.startTime`,
                          type: "time",
                          placeholder: "Select Start Time",
                          required: true,
                          className: "flex-1 !w-[125.69px]",
                        }}
                      />
                      <MoveRight size={18} className="me-2 self-center" />
                      <DynamicFormField
                        dynamicField={{
                          name: `dailySchedule.${dayIndex}.scheduleTimings.${timingIndex}.endTime`,
                          type: "time",
                          placeholder: "Select End Time",
                          required: true,
                          className: "flex-1 !w-[125.69px]",
                        }}
                      />
                      <Button
                        type="button"
                        variant='ghost'
                        className="btn btn-danger"
                        onClick={() => handleRemoveTimeSlot(dayIndex, timingIndex)}
                      >
                        <Trash size={18} className='cursor-pointer' />
                      </Button>
                    </div>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        ),
      },
    ];

    return fields;
  }, [item, activeDay, formState]);

  return (
    <DynamicFormSheet
      isOpen={editModalOpen}
      setIsOpen={setEditModalOpen}
      title="Update Court"
      description="Update court details."
      fields={formFields}
      onSubmit={(values) => onUpdate(item.id, values)}
      validationSchema={validationSchema}
      submitButtonLabel="Save Changes"
      fixedFooter
      formGridCols="grid-cols-2"
    />
  )
}

export default ManageCourtDrawer
