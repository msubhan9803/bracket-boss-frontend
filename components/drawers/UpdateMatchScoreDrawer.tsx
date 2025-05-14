import React from "react";
import useMatchByMatchId from "@/hooks/match/useMatchByMatchId";
import { Dispatch, SetStateAction } from "react";
import UpdateMatchScoreContent from "../scheduling/scoring/UpdateMatchScoreContent";
import { Button } from "../ui/button";
import DynamicSheet from "../core/DynamicSheet";
import useMatchOperations from "@/hooks/match/useMatchOperations";
import { Match, MatchStatusTypes } from "@/graphql/generated/graphql";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type UpdateMatchScoreDrawerProps = {
  isOpen: boolean;
  currentMatchId: number;
  title: string;
  description?: string;
  isLoading?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetchMatches: (options?: RefetchOptions) => Promise<QueryObserverResult<Match[], Error>>
};

const UpdateMatchScoreDrawer = ({
  isOpen,
  currentMatchId,
  title,
  isLoading,
  description,
  setIsOpen,
  refetchMatches,
}: UpdateMatchScoreDrawerProps) => {
  const {
    match,
    loadingMatch: isLoadingMatch,
    refetchMatch,
  } = useMatchByMatchId({
    matchId: currentMatchId,
  });
  const { endMatchMutation } = useMatchOperations();

  const showLoading = isLoading || isLoadingMatch;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEndMatch = async () => {
    await endMatchMutation.mutateAsync({ matchId: match?.id });
    refetchMatch();
    refetchMatches();
  };

  if (!match) {
    return <div className="p-5">Match data not available</div>;
  }

  return (
    <DynamicSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={showLoading}
      title={title}
      description={description}
      fixedFooter={true}
      footerActions={
        match.status !== MatchStatusTypes.Completed ? (
          <Button
            absoluteLoaderPosition
            type="button"
            className="w-full mt-4 font-bold"
            onClick={handleEndMatch}
          >
            End Match
          </Button>
        ) : null
      }
      onCancel={handleClose}
    >
      <UpdateMatchScoreContent match={match} refetchMatch={refetchMatch} refetchMatches={refetchMatches} />
    </DynamicSheet>
  );
};

export default UpdateMatchScoreDrawer;
