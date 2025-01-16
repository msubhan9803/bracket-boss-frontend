import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ScheduleTiming = {
  id?: number;
  startTime: string;
  endTime: string;
};

type DailySchedule = {
  day: string;
  scheduleTimings: ScheduleTiming[];
};

export type FormData = {
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

export const useCourtDrawer = (
  item?: Partial<{ courtSchedules: any[], name: string, location: string, courtLength: number, courtWidth: number }>
) => {
  const [activeDay, setActiveDay] = useState<string>(DAYS_OF_WEEK[0]);

  const populateDailySchedule = (): DailySchedule[] => {
    if (!item) {
      return DAYS_OF_WEEK.map((day) => ({
        day,
        scheduleTimings: [],
      }));
    }

    return DAYS_OF_WEEK.map((day) => ({
      day,
      scheduleTimings: item?.courtSchedules
        ?.filter((schedule: any) => schedule.day.name === day)
        .map((schedule: any) => {
          const timing: ScheduleTiming = {
            startTime: schedule.timeSlot.startTime.slice(0, 5),
            endTime: schedule.timeSlot.endTime.slice(0, 5),
          };
          if (typeof schedule.id === "number") {
            timing.id = schedule.id;
          }
          return timing;
        }) || [],
    }));
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
    name: "dailySchedule",
    keyName: "uid",
  });

  const { fields: scheduleFields } = dailyScheduleHandler;

  const formState = form.watch();
  const activeDayIndex = useMemo(
    () =>
      scheduleFields.findIndex((field) => field.day === activeDay),
    [scheduleFields, activeDay]
  );

  const scheduleTimingHandler = useFieldArray({
    control: form.control,
    name: `dailySchedule.${activeDayIndex}.scheduleTimings`,
    keyName: "uid",
  });

  const { fields: scheduleTimings, append, remove, update } = scheduleTimingHandler;

  const handleAddTimeSlot = () => {
    append({ startTime: "", endTime: "" });
  };

  const handleUpdateTimeSlot = (timingIndex: number, field: "startTime" | "endTime", value: string) => {
    update(timingIndex, { ...scheduleTimings[timingIndex], [field]: value });
  };

  const handleRemoveTimeSlot = (timingIndex: number) => {
    remove(timingIndex);
  };

  return {
    form,
    formState,
    activeDay,
    setActiveDay,
    scheduleFields,
    activeDayIndex,
    scheduleTimings,
    handleAddTimeSlot,
    handleUpdateTimeSlot,
    handleRemoveTimeSlot,
  };
};
