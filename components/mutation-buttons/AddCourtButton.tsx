"use client";
import { Fragment, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import DynamicFormSheet from "@/components/core/DynamicFormSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourtDrawer, FormData } from "@/hooks/court/useCourtDrawer";
import useCourtOperations from "@/hooks/court/useCourtOperations";
import { RootState } from "@/redux/store";
import { DynamicFormField as DynamicFormFieldType } from '@/global'

interface AddCourtButtonProps {
  refetchCourtList: () => void;
}

const AddCourtButton: React.FC<AddCourtButtonProps> = ({ refetchCourtList }) => {
  const clubId = useSelector((state: RootState) => state.user.clubId) as number;
  const [showModal, setShowModal] = useState(false);
  const { upsertCourtMutation } = useCourtOperations();

  const {
    form,
    formState,
    activeDay,
    setActiveDay,
    scheduleFields,
    handleAddTimeSlot,
    handleUpdateTimeSlot,
    handleRemoveTimeSlot,
  } = useCourtDrawer();

  const formFields = useMemo(() => {
    const fields: DynamicFormFieldType<any>[] = [
      {
        type: "render",
        className: "col-span-2",
        isVisible: true,
        render: () => (
          <h1 className="text-lg font-bold">Court Details</h1>
        ),
      },
      {
        label: "Name",
        name: "name",
        type: "text",
        placeholder: "Court Name",
        required: true,
        defaultValue: "",
        className: "col-span-2",
      },
      {
        label: "Location",
        name: "location",
        type: "text",
        placeholder: "Court Location",
        required: true,
        defaultValue: "",
        className: "col-span-2",
      },
      {
        label: "Court Length",
        name: "courtLength",
        type: "number",
        placeholder: "e.g. 10",
        suffixRender: <p>feet</p>,
        defaultValue: "",
        className: "col-span-2 lg:col-span-1",
      },
      {
        label: "Court Width",
        name: "courtWidth",
        type: "number",
        placeholder: "e.g. 10",
        suffixRender: <p>feet</p>,
        defaultValue: "",
        className: "col-span-2 lg:col-span-1",
      },
      {
        type: "render",
        className: "col-span-2 my-2",
        isVisible: true,
        render: () => <hr />,
      },
      {
        type: "render",
        className: "col-span-2",
        isVisible: true,
        render: () => (
          <h1 className="text-lg font-bold">Court Timings</h1>
        ),
      },
      {
        type: "render",
        className: "col-span-2",
        isVisible: true,
        render: () => (
          <Tabs value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="my-2">
              {scheduleFields.map((field) => (
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

                {formState.dailySchedule[dayIndex]?.scheduleTimings?.length > 0 ? (
                  formState.dailySchedule[dayIndex].scheduleTimings.map((timing, timingIndex) => (
                    <div key={timingIndex} className="flex items-end gap-2 my-2">
                      <Input
                        type="time"
                        value={timing.startTime}
                        onChange={(e) =>
                          handleUpdateTimeSlot(timingIndex, "startTime", e.target.value)
                        }
                      />
                      <Input
                        type="time"
                        value={timing.endTime}
                        onChange={(e) =>
                          handleUpdateTimeSlot(timingIndex, "endTime", e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => handleRemoveTimeSlot(timingIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-24">
                    <p>No Timeslot</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        ),
      },
    ];

    return fields;
  }, [scheduleFields, formState, activeDay]);

  const handleCreating = async (input: FormData) => {
    await upsertCourtMutation.mutateAsync({
      ...input,
      clubId,
      dailySchedule: input.dailySchedule.map((schedule: any) => ({
        day: schedule.day,
        scheduleTimings: schedule.scheduleTimings.map((timing: any) => {
          const timingData: any = {
            startTime: timing.startTime,
            endTime: timing.endTime,
          };
          if (typeof timing.id === "number") {
            timingData.id = timing.id;
          }
          return timingData;
        }),
      })),
    });

    setShowModal(false);
    refetchCourtList();
  };

  return (
    <Fragment>
      <Button onClick={() => setShowModal(true)} variant="outline">
        Create Court
      </Button>
      <DynamicFormSheet
        isOpen={showModal}
        setIsOpen={setShowModal}
        title="Create Court"
        description="Creates a new court for this club"
        formState={form}
        fields={formFields}
        onSubmit={() => handleCreating(formState)}
        submitButtonLabel="Save Changes"
        fixedFooter
        formGridCols="grid-cols-2"
      />
    </Fragment>
  );
};

export default AddCourtButton;
