import React from "react";
import useMatchByMatchId from "@/hooks/match/useMatchByMatchId";
import { Dispatch, SetStateAction } from "react";
import UpdateMatchScoreContent from "../scheduling/scoring/UpdateMatchScoreContent";
import { Button } from "../ui/button";
import DynamicSheet from "../core/DynamicSheet";
import useMatchOperations from "@/hooks/match/useMatchOperations";
import useAllMatchesWithFilters from "@/hooks/match/useAllMatchesWithFilters";
import { MatchStatusTypes } from "@/graphql/generated/graphql";

type UpdateMatchScoreDrawerProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentMatchId: number;
  title: string;
  description?: string;
  isLoading?: boolean;
};

const UpdateMatchScoreDrawer = ({
  isOpen,
  setIsOpen,
  currentMatchId,
  title,
  isLoading,
  description,
}: UpdateMatchScoreDrawerProps) => {
  const {
    match,
    loadingMatch: isLoadingMatch,
    refetchMatch,
  } = useMatchByMatchId({
    matchId: currentMatchId,
  });
  const { endMatchMutation } = useMatchOperations();
  const { refetchMatches } = useAllMatchesWithFilters();

  console.log("match status: ", match?.status);

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
      <UpdateMatchScoreContent match={match} refetchMatch={refetchMatch} />
    </DynamicSheet>
  );
};

export default UpdateMatchScoreDrawer;
