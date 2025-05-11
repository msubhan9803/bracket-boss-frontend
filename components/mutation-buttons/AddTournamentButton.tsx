"use client";
import { Fragment, useState, useMemo, useEffect } from "react";
import DynamicFormSheet from "@/components/core/DynamicFormSheet";
import { Button } from "@/components/ui/button";
import { DynamicFormField as DynamicFormFieldType } from "@/global";
import useTournamentOperations from "@/hooks/tournament/useTournamentOperations";
import { useTournamentDrawer } from "@/hooks/court/useTournamentDrawer";
import {
  CreateTournamentInputDto,
  TeamGenerationTypeEnum,
} from "@/graphql/generated/graphql";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFormats from "@/hooks/format/useFormats";
import { toTitleCase } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { GroupByEnum } from "@/lib/app-types";

interface AddTournamentButtonProps {
  refetchTournamentList: () => void;
}

const AddTournamentButton: React.FC<AddTournamentButtonProps> = ({
  refetchTournamentList,
}) => {
  const [showModal, setShowModal] = useState(false);

  const {
    form,
    formState,
    levels,
    teamGenerationTypes,
    handleAddLevel,
    handleRemoveLevel,
  } = useTournamentDrawer();
  const { formats } = useFormats();
  const teamGenerationTypeId = form.watch("teamGenerationTypeId");
  const selectedTeamGenerationType = useMemo(
    () => teamGenerationTypes?.find((type) => type.id === parseInt(teamGenerationTypeId.toString())),
    [teamGenerationTypeId]
  );

  const { createTournamentMutation } = useTournamentOperations();

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

  const handleCreating = async (input: CreateTournamentInputDto) => {
    await createTournamentMutation.mutateAsync({
      ...input,
      teamGenerationTypeId: parseInt(input.teamGenerationTypeId.toString()),
    });
    setShowModal(false);
    refetchTournamentList();
  };

  return (
    <Fragment>
      <Button onClick={() => setShowModal(true)} variant="outline">
        Create Tournament
      </Button>
      <DynamicFormSheet
        isOpen={showModal}
        setIsOpen={setShowModal}
        title="Create Tournament"
        description="Creates a new tournament for this club"
        formState={form}
        fields={formFields}
        onSubmit={() => handleCreating(formState)}
        submitButtonLabel="Save Changes"
        submitButtonLoading={createTournamentMutation.isPending}
        fixedFooter
        formGridCols="grid-cols-2"
      />
    </Fragment>
  );
};

export default AddTournamentButton;
