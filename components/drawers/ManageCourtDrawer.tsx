import { useMemo } from "react";
import { z } from "zod";
import { DynamicFormField as DynamicFormFieldType } from '@/global'
import DynamicFormSheet from '../core/DynamicFormSheet'
import { Court } from '@/graphql/generated/graphql'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { MoveRight, Trash } from "lucide-react";
import { Input } from "../ui/input";
import { useCourtDrawer } from "@/hooks/court/useCourtDrawer";

type ManageCourtDrawerProps = {
  editModalOpen: boolean
  setEditModalOpen: any
  onUpdate: (id: number, data: any) => any
  item: Partial<Court>
  submitButtonLoading: boolean
}

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
  const {
    form,
    formState,
    activeDay,
    setActiveDay,
    scheduleFields,
    handleAddTimeSlot,
    handleUpdateTimeSlot,
    handleRemoveTimeSlot,
  } = useCourtDrawer(item);

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
