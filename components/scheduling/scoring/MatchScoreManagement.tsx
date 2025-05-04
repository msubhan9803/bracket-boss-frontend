import React, { useEffect, useState } from "react";
import FilterScoringMatchesButton from "@/components/mutation-buttons/FilterScoringMatchesButton";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import useAllMatchesWithFilters from "@/hooks/match/useAllMatchesWithFilters";
import { setMatchFilter } from "@/redux/slices/matchFilter.slice";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import MatchScoreCard from "../MatchScoreCard";
import UpdateMatchScoreDrawer from "@/components/drawers/UpdateMatchScoreDrawer";

type Props = {
  tournamentId: string;
};

export default function MatchScoreManagement({ tournamentId }: Props) {
  const dispatch = useAppDispatch();
  const filters = useSelector((state: RootState) => state.matchFilter.filter);
  const { matches, loadingMatches, refetchMatches } = useAllMatchesWithFilters();
  const [showUpdateScoreDrawer, setShowUpdateScoreDrawer] = useState(false);
  const [currentMatchId, setCurrentMatchId] = useState<number>()

  useEffect(() => {
    dispatch(setMatchFilter({ tournamentId: parseInt(tournamentId) }));
  }, []);

  useEffect(() => {
    refetchMatches();
  }, [filters]);

  if (loadingMatches) {
    return <LoadingSpinner className="my-36" />;
  }

  return (
    <div className="space-y-5">
      <div className="text-right">
        <FilterScoringMatchesButton tournamentId={tournamentId} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {matches?.length > 0 &&
          matches.map((match, index) => (
            <MatchScoreCard
              key={match.id}
              match={match}
              matchIndex={index}
              refetchMatches={refetchMatches}
              setCurrentMatchId={setCurrentMatchId}
              setShowUpdateScoreDrawer={setShowUpdateScoreDrawer}
            />
          ))}
      </div>

      {showUpdateScoreDrawer && currentMatchId && (
        <UpdateMatchScoreDrawer
          isOpen={showUpdateScoreDrawer}
          setIsOpen={setShowUpdateScoreDrawer}
          title="Update Score"
          description="This will update Match Round scores"
          currentMatchId={currentMatchId}
        />
      )}
    </div>
  );
}
