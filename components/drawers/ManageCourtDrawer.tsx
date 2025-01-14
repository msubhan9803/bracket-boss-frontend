import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { DynamicFormField as DynamicFormFieldType } from '@/global'
import DynamicFormSheet from '../core/DynamicFormSheet'
import { Court } from '@/graphql/generated/graphql'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { MoveRight, Trash } from "lucide-react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

type ManageCourtDrawerProps = {
  editModalOpen: boolean
  setEditModalOpen: any
  onUpdate: (id: number, data: any) => any
  item: Partial<Court>
  submitButtonLoading: boolean
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
  courtLength: number | null;
  courtWidth: number | null;
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
  name: z.string().min(1, { message: "Name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  courtLength: z
    .number({
      invalid_type_error: "Court length is required",
    })
    .min(1, { message: "Court length must be greater than 0" }),
  courtWidth: z
    .number({
      invalid_type_error: "Court width is required",
    })
    .min(1, { message: "Court width must be greater than 0" }),
});

const ManageCourtDrawer = ({ editModalOpen, setEditModalOpen, onUpdate, item, submitButtonLoading }: ManageCourtDrawerProps) => {
  const [activeDay, setActiveDay] = useState(DAYS_OF_WEEK[0]);

  const populateDailySchedule = () => {
    const dailySchedule = DAYS_OF_WEEK.map((day) => ({
      day,
      scheduleTimings: item.courtSchedules
        ?.filter(schedule => schedule.day.name === day)
        .map(schedule => ({
          startTime: schedule.timeSlot.startTime.slice(0, 5),
          endTime: schedule.timeSlot.endTime.slice(0, 5),
          id: schedule.id,
        })) || [],
    }));
    return dailySchedule;
  };

  const form = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: item?.name || "",
      location: item?.location || "",
      courtLength: item?.courtLength || null,
      courtWidth: item?.courtWidth || null,
      dailySchedule: populateDailySchedule(),
    },
  });
  const dailyScheduleHandler = useFieldArray({
    control: form.control,
    name: `dailySchedule`,
  });
  const { fields: scheduleFields } = dailyScheduleHandler;

  const formState = form.watch();
  const activeDayIndex = useMemo(() => scheduleFields.findIndex(
    (field) => field.day === activeDay
  ), [scheduleFields, activeDay]);

  const scheduleTimingHandler = useFieldArray({
    control: form.control,
    name: `dailySchedule.${activeDayIndex}.scheduleTimings`,
  });
  const { fields: scheduleTimings, append: appendTiming, remove: removeTiming, update: updateTiming } = scheduleTimingHandler;

  const handleAddTimeSlot = () => {
    appendTiming({ startTime: "", endTime: "" });
  };

  const handleUpdateTimeSlot = (timingIndex: number, field: 'startTime' | 'endTime', value: string) => {
    updateTiming(timingIndex, { ...scheduleTimings[timingIndex], [field]: value });
  };

  const handleRemoveTimeSlot = (timingIndex: number) => {
    removeTiming(timingIndex);
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
        defaultValue: item?.courtLength || '',
        className: 'col-span-2 lg:col-span-1',
      },
      {
        label: "Court Width",
        name: "courtWidth",
        type: "number",
        placeholder: "e.g. 10",
        suffixRender: <p>feet</p>,
        defaultValue: item?.courtWidth || '',
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
                    onClick={handleAddTimeSlot}
                  >
                    Add Time Slot
                  </Button>
                </div>

                {
                  formState.dailySchedule[dayIndex]?.scheduleTimings
                    ?.length > 0 ? (
                    formState.dailySchedule[dayIndex]?.scheduleTimings
                      .map((_, timingIndex) => (
                        <div key={timingIndex} className="flex items-end gap-2 my-2">
                          <Input
                            type="time"
                            name={formState.dailySchedule[dayIndex]?.scheduleTimings[timingIndex].startTime}
                            required={true}
                            style={{ width: '125.69px' }}
                            value={formState.dailySchedule[dayIndex]?.scheduleTimings[timingIndex].startTime}
                            onChange={(e) => handleUpdateTimeSlot(timingIndex, 'startTime', e.target.value)}
                          />
                          <MoveRight size={18} className="me-2 self-center" />
                          <Input
                            type="time"
                            name={formState.dailySchedule[dayIndex]?.scheduleTimings[timingIndex].endTime}
                            required={true}
                            style={{ width: '125.69px' }}
                            value={formState.dailySchedule[dayIndex]?.scheduleTimings[timingIndex].endTime}
                            onChange={(e) => handleUpdateTimeSlot(timingIndex, 'endTime', e.target.value)}
                          />
                          <Button
                            type="button"
                            variant='ghost'
                            className="btn btn-danger"
                            onClick={() => handleRemoveTimeSlot(timingIndex)}
                          >
                            <Trash size={18} className='cursor-pointer' />
                          </Button>
                        </div>
                      ))
                  ) : (
                    <div className="flex justify-center items-center h-24">
                      <p>No Timeslot</p>
                    </div>
                  )
                }
              </TabsContent>
            ))}
          </Tabs>
        ),
      },
    ];

    return fields;
  }, [item, activeDay, formState]);

  useEffect(() => {
    console.log('🌺 formState: ', formState)
  }, [formState])

  return (
    <DynamicFormSheet
      isOpen={editModalOpen}
      setIsOpen={setEditModalOpen}
      title="Update Court"
      description="Update court details."
      formState={form}
      fields={formFields}
      validationSchema={validationSchema}
      onSubmit={() => onUpdate(item.id, formState)}
      submitButtonLabel="Save Changes"
      submitButtonLoading={submitButtonLoading}
      fixedFooter
      formGridCols="grid-cols-2"
    />
  )
}

export default ManageCourtDrawer
