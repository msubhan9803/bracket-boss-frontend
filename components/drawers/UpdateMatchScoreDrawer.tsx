import React from "react";
import useMatchByMatchId from "@/hooks/match/useMatchByMatchId";
import { Dispatch, SetStateAction } from "react";
import UpdateMatchScoreContent from "../scheduling/scoring/UpdateMatchScoreContent";
import { Button } from "../ui/button";
import DynamicSheet from "../core/DynamicSheet";

type UpdateMatchScoreDrawerProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentMatchId: number;
  title: string;
  description?: string;
  isLoading?: boolean;
  onUpdateScore?: () => void;
  onEndMatchRound?: () => void;
  onStartMatchRound?: () => void;
};

const UpdateMatchScoreDrawer = ({
  isOpen,
  setIsOpen,
  currentMatchId,
  title,
  isLoading,
  description,
  onUpdateScore,
  onEndMatchRound,
  onStartMatchRound,
}: UpdateMatchScoreDrawerProps) => {
  const { match, loadingMatch: isLoadingMatch } = useMatchByMatchId({
    matchId: currentMatchId,
  });

  const showLoading = isLoading || isLoadingMatch;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <DynamicSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={showLoading}
      title={title}
      description={description}
      fixedFooter={true}
      footerActions={
        <Button
          absoluteLoaderPosition
          type="button"
          className="w-full mt-4 font-bold"
        >
          End Match
        </Button>
      }
      onCancel={handleClose}
    >
      <UpdateMatchScoreContent
        match={match}
        onUpdateScore={onUpdateScore}
        onEndMatchRound={onEndMatchRound}
        onStartMatchRound={onStartMatchRound}
      />
    </DynamicSheet>
  );
};

export default UpdateMatchScoreDrawer;
