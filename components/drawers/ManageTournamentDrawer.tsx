import { useMemo } from "react";
import { z } from "zod";
import { DynamicFormField as DynamicFormFieldType } from "@/global";
import DynamicFormSheet from "../core/DynamicFormSheet";
import {
  CreateTournamentInputDto,
  TeamGenerationTypeEnum,
  Tournament,
} from "@/graphql/generated/graphql";
import { useTournamentDrawer } from "@/hooks/court/useTournamentDrawer";
import useFormats from "@/hooks/format/useFormats";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { toTitleCase } from "@/lib/utils";
import { GroupByEnum } from "@/lib/app-types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import useSingleTournament from "@/hooks/tournament/useSingleTournament";

type ManageTournamentDrawerProps = {
  editModalOpen: boolean;
  setEditModalOpen: any;
  onUpdate: (id: number, data: any) => any;
  item: Partial<Tournament>;
  submitButtonLoading: boolean;
};

const ManageTournamentDrawer = ({
  editModalOpen,
  setEditModalOpen,
  onUpdate,
  item,
  submitButtonLoading,
}: ManageTournamentDrawerProps) => {
  
  const { tournament } = useSingleTournament(item?.id);
  const {
    form,
    formState,
    levels,
    teamGenerationTypes,
    handleAddLevel,
    handleRemoveLevel,
  } = useTournamentDrawer(tournament);
  const { formats } = useFormats();
  const teamGenerationTypeId = form.watch("teamGenerationTypeId");
  const selectedTeamGenerationType = useMemo(
    () =>
      teamGenerationTypes?.find(
        (type) => type.id === parseInt(teamGenerationTypeId?.toString())
      ),
    [teamGenerationTypeId]
  );

  const formFields: DynamicFormFieldType<CreateTournamentInputDto>[] = useMemo(() => {
    const baseFields: DynamicFormFieldType<CreateTournamentInputDto>[] = [
      {
        label: "Name",
        name: "name",
        type: "text",
        placeholder: "Tournament Name",
        required: true,
        defaultValue: "",
        className: "col-span-2",
      },
      {
        label: "Description",
        name: "description",
        type: "textarea",
        placeholder: "Description",
        required: true,
        defaultValue: "",
        className: "col-span-2",
      },
      {
        label: "Start Date",
        name: "start_date",
        type: "date",
        placeholder: "Start Date",
        required: true,
        defaultValue: "",
      },
      {
        label: "End Date",
        name: "end_date",
        type: "date",
        placeholder: "End Date",
        required: true,
        defaultValue: null,
      },
      {
        label: "Best of rounds of matches",
        name: "matchBestOfRounds",
        type: "number",
        placeholder: "e.g. 3 or 5",
        required: true,
        defaultValue: 1,
      },
      {
        label: "No. of Pools",
        name: "numberOfPools",
        type: "number",
        placeholder: "e.g. 1",
        required: true,
        defaultValue: 1,
      },
      {
        label: "Is Private?",
        name: "isPrivate",
        type: "switch",
        placeholder: "",
        required: true,
        defaultValue: false,
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
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">Levels</h1>
              <Button type="button" className="font-bold mt-2" onClick={handleAddLevel}>
                Add Level
              </Button>
            </div>

            {levels.map((level, index) => (
              <div key={level.id} className="flex items-end gap-4 my-2">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="space-y-2">
                    <Label htmlFor={`levels.${index}.name`}>Level Name</Label>
                    <Input
                      type="text"
                      id={`levels.${index}.name`}
                      placeholder="e.g Pool Play"
                      {...form.register(`levels.${index}.name`)}
                    />
                    {form.formState.errors.levels?.[index]?.name && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.levels[index].name?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name={`levels.${index}.formatId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Format</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value?.toString() ?? ""}
                              onValueChange={(value) => field.onChange(parseInt(value))}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a format" />
                              </SelectTrigger>
                              <SelectContent>
                                {formats?.map((formatOption) => (
                                  <SelectItem
                                    key={formatOption.id}
                                    value={formatOption.id.toString()}
                                    className="text-left"
                                  >
                                    {toTitleCase(formatOption.name)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.formState.errors.levels?.[index]?.formatId && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.levels[index].formatId?.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleRemoveLevel(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ),
      },
      {
        type: "render",
        className: "col-span-2 my-2",
        isVisible: !!teamGenerationTypes,
        render: () => <hr />,
      },
      {
        label: "Team Generation Type",
        name: "teamGenerationTypeId",
        type: "select",
        placeholder: "Select type",
        required: true,
        isVisible: !!teamGenerationTypes,
        options: teamGenerationTypes?.map((teamGenerationType) => ({
          label: toTitleCase(teamGenerationType.name),
          value: teamGenerationType.id.toString(),
        })),
        defaultValue: "",
      },
    ];

    if (selectedTeamGenerationType?.name === TeamGenerationTypeEnum.SplitSwitch) {
      baseFields.push({
        label: "Split Switch Group By",
        name: "splitSwitchGroupBy",
        type: "select",
        placeholder: "Select group by",
        required: true,
        options: [
          { label: "Gender", value: GroupByEnum.GENDER },
          { label: "Rating", value: GroupByEnum.RATING },
        ],
        defaultValue: "",
      });
    }

    return baseFields;
  }, [formState, formats, teamGenerationTypes, selectedTeamGenerationType]);

  return (
    <DynamicFormSheet
      isOpen={editModalOpen}
      setIsOpen={setEditModalOpen}
      title="Update Tournament"
      description="Update Tournament details."
      formState={form}
      fields={formFields}
      onSubmit={() => onUpdate(item.id, formState)}
      submitButtonLabel="Save Changes"
      submitButtonLoading={submitButtonLoading}
      fixedFooter
      formGridCols="grid-cols-2"
    />
  );
};

export default ManageTournamentDrawer;
