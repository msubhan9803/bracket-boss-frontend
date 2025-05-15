import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTournamentInputDto,
  LevelInput,
  Tournament,
} from "@/graphql/generated/graphql";
import useTeamGenerationTypeByFormat from "../teamGenerationTypes/useTeamGenerationTypes";
import { useEffect } from "react";
import moment from "moment";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  start_date: z.string().min(1, { message: "Start date is required" }),
  end_date: z.string().min(1, { message: "Start date is required" }),
  isPrivate: z.boolean().default(false),
  teamGenerationTypeId: z
    .string()
    .min(1, { message: "Team Generation Type is required" }),
  matchBestOfRounds: z
    .number({
      invalid_type_error: "Best of rounds is required",
    })
    .min(1, { message: "Best of rounds must be greater than 0" })
    .nullable(),
  numberOfPools: z
    .number({
      invalid_type_error: "Number of pools is required",
    })
    .min(1, { message: "Number of pools must be greater than 0" })
    .nullable(),
  levels: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, { message: "Level name is required" }),
        formatId: z
          .number({
            invalid_type_error: "Format is required for each level",
          })
          .min(1, { message: "Format ID must be greater than 0" })
          .nullable(),
      })
    )
    .min(1, { message: "At least one level is required" }),
});

export const useTournamentDrawer = (item?: Partial<Tournament>) => {
  const form = useForm<CreateTournamentInputDto>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: item?.name || "",
      description: item?.description || "",
      start_date: item?.start_date ? new Date(item.start_date) : "",
      end_date: item?.end_date ? new Date(item.end_date) : "",
      isPrivate: item?.isPrivate ?? false,
      teamGenerationTypeId: item?.teamGenerationType?.id || undefined,
      matchBestOfRounds: item?.matchBestOfRounds || undefined,
      numberOfPools: item?.numberOfPools || undefined,
      levels:
        item?.levels?.map((level) => ({
          name: level.name || "",
          formatId: level.format.id || undefined,
        })) || [],
    },
  });
  const formState = form.watch();

  const levelsHandler = useFieldArray({
    control: form.control,
    name: "levels",
    keyName: "id",
  });

  const { fields: levels, append, update, remove } = levelsHandler;

  const firstLevelFormatId = form.watch("levels.0.formatId");
  const { teamGenerationTypes, refetchTeamGenerationTypes } =
    useTeamGenerationTypeByFormat({ formatId: firstLevelFormatId ?? undefined });

  const handleAddLevel = () => {
    append({ name: "", formatId: undefined } as unknown as LevelInput);
  };

  const handleUpdateLevel = (levelIndex: number, value: Partial<LevelInput>) => {
    update(levelIndex, { ...levels[levelIndex], ...value });
    refetchTeamGenerationTypes();
  };

  const handleRemoveLevel = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (item) {
      console.log("🔥🔥🔥🔥🔥 Setting form values", item);

      form.reset({
        name: item.name || "",
        description: item.description || "",
        start_date: item.start_date
          ? new Date(moment(item.start_date).format("yyyy-MM-dd"))
          : "",
        end_date: item.end_date
          ? new Date(moment(item.end_date).format("yyyy-MM-dd"))
          : "",
        isPrivate: item.isPrivate ?? false,
        teamGenerationTypeId: item.teamGenerationType?.id || undefined,
        matchBestOfRounds: item.matchBestOfRounds || undefined,
        numberOfPools: item.numberOfPools || undefined,
        levels:
          item.levels?.map((level) => ({
            id: level.id,
            name: level.name || "",
            formatId: level.format?.id || undefined,
          })) || [],
      });

      if (item.levels?.[0]?.format?.id !== firstLevelFormatId) {
        refetchTeamGenerationTypes();
      }
    }
  }, [item, form, refetchTeamGenerationTypes, firstLevelFormatId]);

  return {
    form,
    formState,
    levels,
    teamGenerationTypes,
    handleAddLevel,
    handleUpdateLevel,
    handleRemoveLevel,
  };
};
