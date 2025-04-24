"use client";
import { Fragment, useMemo, useState } from "react";
import { DynamicFormField } from "@/global";
import {
  CreateTournamentInputDto,
  TeamGenerationTypeEnum,
} from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import useTournamentOperations from "@/hooks/tournament/useTournamentOperations";
import useFormats from "@/hooks/format/useFormats";
import { toTitleCase } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import useTeamGenerationTypeByFormat from "@/hooks/teamGenerationTypes/useTeamGenerationTypes";
import { GroupByEnum } from "@/lib/app-types";
import { useForm } from "react-hook-form";
import DynamicFormSheetWithoutFormContext from "../core/DynamicFormSheetWithoutFormContext";

interface AddTournamentButtonProps {
  refetchTournamentList: () => void;
}

const AddTournamentButton: React.FC<AddTournamentButtonProps> = ({
  refetchTournamentList,
}) => {
  const [showModal, setShowModal] = useState(false);
  // const clubId = useSelector((state: RootState) => state.user.clubId);

  const form = useForm<CreateTournamentInputDto>({
    mode: "onBlur",
  });

  const poolPlayFormatId = form.watch("poolPlayFormatId");
  const teamGenerationTypeId = form.watch("teamGenerationTypeId");

  const { createTournamentMutation } = useTournamentOperations();
  const { formats } = useFormats();
  const { teamGenerationTypes } = useTeamGenerationTypeByFormat({
    poolPlayFormatId,
  });

  const selectedTeamGenerationType = useMemo(
    () =>
      teamGenerationTypes?.find(
        (elem) => elem.id.toString() === teamGenerationTypeId
      ),
    [teamGenerationTypes, teamGenerationTypeId]
  );

  const formFields: DynamicFormField<CreateTournamentInputDto>[] =
    useMemo(() => {
      const baseFields: DynamicFormField<CreateTournamentInputDto>[] = [
        {
          label: "Name",
          name: "name" as keyof CreateTournamentInputDto,
          type: "text",
          placeholder: "Tournament Name",
          required: true,
          defaultValue: "",
        },
        {
          label: "Description",
          name: "description" as keyof CreateTournamentInputDto,
          type: "textarea",
          placeholder: "Description",
          required: true,
          defaultValue: "",
        },
        {
          label: "Start Date",
          name: "start_date" as keyof CreateTournamentInputDto,
          type: "date",
          placeholder: "Start Date",
          required: true,
          defaultValue: "",
        },
        {
          label: "End Date",
          name: "end_date" as keyof CreateTournamentInputDto,
          type: "date",
          placeholder: "End Date",
          required: true,
          defaultValue: "",
        },
        {
          label: "Is Private?",
          name: "isPrivate" as keyof CreateTournamentInputDto,
          type: "switch",
          placeholder: "",
          required: true,
          defaultValue: false,
        },
        {
          label: "Pool Play Format",
          name: "poolPlayFormatId" as keyof CreateTournamentInputDto,
          type: "select",
          placeholder: "Select format",
          required: true,
          options: formats?.map((format) => ({
            label: toTitleCase(format.name),
            value: format.id.toString(),
          })),
          defaultValue: "",
        },
        {
          label: "Play Off Format",
          name: "playOffFormatId" as keyof CreateTournamentInputDto,
          type: "select",
          placeholder: "Select format",
          required: true,
          options: formats?.map((format) => ({
            label: toTitleCase(format.name),
            value: format.id.toString(),
          })),
          defaultValue: "",
        },
        {
          label: "Team Generation Type",
          name: "teamGenerationTypeId" as keyof CreateTournamentInputDto,
          type: "select",
          placeholder: "Select type",
          required: true,
          options: teamGenerationTypes?.map((teamGenerationType) => ({
            label: toTitleCase(teamGenerationType.name),
            value: teamGenerationType.id.toString(),
          })),
          defaultValue: "",
        },
        {
          label: "Best of rounds of matches",
          name: "matchBestOfRounds" as keyof CreateTournamentInputDto,
          type: "number",
          placeholder: "e.g. 3 or 5",
          required: true,
          defaultValue: 1,
        },
        {
          label: "No. of Pools",
          name: "numberOfPools" as keyof CreateTournamentInputDto,
          type: "number",
          placeholder: "e.g. 1",
          required: true,
          defaultValue: 1,
        },
      ];

      if (
        selectedTeamGenerationType?.name === TeamGenerationTypeEnum.SplitSwitch
      ) {
        baseFields.push({
          label: "Split Switch Group By",
          name: "splitSwitchGroupBy" as keyof CreateTournamentInputDto,
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
    }, [formats, teamGenerationTypes, selectedTeamGenerationType]);

  const handleCreating = async (input: CreateTournamentInputDto) => {
    await createTournamentMutation.mutateAsync({
      ...input,
      poolPlayFormatId: parseInt(input.poolPlayFormatId.toString()),
      playOffFormatId: parseInt(input.playOffFormatId.toString()),
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
      <DynamicFormSheetWithoutFormContext
        form={form}
        isOpen={showModal}
        setIsOpen={setShowModal}
        fields={formFields}
        title="Create Tournament"
        description="Creates a new tournament for this club"
        submitButtonLabel="Submit"
        onSubmit={handleCreating}
      />
    </Fragment>
  );
};

export default AddTournamentButton;
