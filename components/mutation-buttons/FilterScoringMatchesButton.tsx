"use client";
import { Fragment, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { DynamicFormField } from "@/global";
import {
  FilterMatchesInputDto,
  MatchStatusTypes,
} from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { convertSnakeCaseToTitleCase, toTitleCase } from "@/lib/utils";
import DynamicFormSheetWithoutFormContext from "../core/DynamicFormSheetWithoutFormContext";
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";
import usePoolsByLevel from "@/hooks/pool/usePoolsByLevel";
import useRoundsByPool from "@/hooks/round/useRoundsByPool";
import useAllMatchesWithFilters from "@/hooks/match/useAllMatchesWithFilters";
import useTeamsByTournamentId from "@/hooks/team/useTeamsByTournamentId";
import { FiFilter, FiXCircle } from "react-icons/fi";
import { useAppDispatch } from "@/redux/store";
import {
  setMatchFilter,
  matchFilerInitialState,
} from "@/redux/slices/matchFilter.slice";

interface FilterScoringMatchesButtonProps {
  tournamentId: string;
}

const FilterScoringMatchesButton: React.FC<FilterScoringMatchesButtonProps> = ({
  tournamentId,
}) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<FilterMatchesInputDto>(
    matchFilerInitialState.filter
  );

  const form = useForm<FilterMatchesInputDto>({
    mode: "onBlur",
  });
  const { watch } = form;
  const level = watch("levels")?.toString() as string;
  const pool = watch("pools")?.toString() as string;

  const { levels } = useLevelsByTournament({
    tournamentId,
    enabled: !!tournamentId,
  });
  const { pools } = usePoolsByLevel({
    levelId: level,
    enabled: !!level,
  });
  const { rounds } = useRoundsByPool({
    poolId: pool,
    enabled: !!pool,
  });
  const { teamsByTournament } = useTeamsByTournamentId(parseInt(tournamentId));

  const handleFiltering = async (input: FilterMatchesInputDto) => {
    const state = {
      ...input,
      tournamentId: parseInt(tournamentId),
      levels: level ? [parseInt(level)] : [],
      pools: pool ? [parseInt(pool)] : [],
    };
    dispatch(setMatchFilter(state));
  };

  const formFields: DynamicFormField<FilterMatchesInputDto>[] = useMemo(() => {
    const baseFields: DynamicFormField<FilterMatchesInputDto>[] = [
      {
        type: "render",
        render: () => (
          <div className="flex justify-end mt-2">
            <Button
              type="button"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => {
                const resetValues: FilterMatchesInputDto =
                  matchFilerInitialState.filter;

                form.reset(resetValues);
                setFilters(resetValues);
              }}
            >
              <FiXCircle className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        ),
      },
      {
        label: "Level",
        name: "levels" as keyof FilterMatchesInputDto,
        type: "search-select",
        placeholder: "Select level",
        options: levels?.map((level) => ({
          label: toTitleCase(level.name),
          value: level.id.toString(),
        })),
        defaultValue: [],
      },
      {
        label: "Pool",
        name: "pools" as keyof FilterMatchesInputDto,
        type: "search-select",
        placeholder: "Select Pool",
        options: pools?.map((pool) => ({
          label: toTitleCase(pool.name),
          value: pool.id.toString(),
        })),
        defaultValue: [],
      },
      {
        label: "Round",
        name: "rounds" as keyof FilterMatchesInputDto,
        type: "multi-select",
        placeholder: "Select Round",
        options: rounds?.map((round) => ({
          label: toTitleCase(round.name),
          value: round.id,
        })),
        defaultValue: [],
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        placeholder: "Select Status",
        options: Object.values(MatchStatusTypes)?.map((type) => ({
          label: convertSnakeCaseToTitleCase(type),
          value: type,
        })),
        defaultValue: null,
      },
      // courts dropdown
      {
        label: "Match Date",
        name: "date",
        type: "date",
        defaultValue: null,
      },
      {
        label: "Start Time",
        name: "startTime",
        type: "time",
        defaultValue: "",
      },
      {
        label: "End Time",
        name: "endTime",
        type: "time",
        defaultValue: "",
      },
      {
        label: "Teams",
        name: "teams" as keyof FilterMatchesInputDto,
        type: "multi-select",
        placeholder: "Select Round",
        options: teamsByTournament?.map((team) => ({
          label: toTitleCase(team.name),
          value: team.id,
        })),
        defaultValue: [],
      },
    ];

    return baseFields;
  }, [levels, pools, rounds, teamsByTournament]);

  useAllMatchesWithFilters(filters);

  return (
    <Fragment>
      <Button onClick={() => setShowModal(true)} variant="outline">
        <FiFilter className="h-4 w-4 mr-2" />
        Filter Matches
      </Button>
      <DynamicFormSheetWithoutFormContext
        form={form}
        isOpen={showModal}
        setIsOpen={setShowModal}
        fields={formFields}
        title="Filter Matches"
        description="Filter matches based on the selected criteria"
        submitButtonLabel="Submit"
        onSubmit={handleFiltering}
        fixedFooter
      />
    </Fragment>
  );
};

export default FilterScoringMatchesButton;
