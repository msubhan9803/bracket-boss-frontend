import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import useMatchByMatchId from "@/hooks/match/useMatchByMatchId";
import { Dispatch, SetStateAction } from "react";
import UpdateMatchScoreContent from "../scheduling/scoring/UpdateMatchScoreContent";
import { Button } from "../ui/button";

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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {showLoading ? (
        <SheetContent className="w-screen md:max-w-md lg:max-w-lg xl:max-w-xl h-screen p-0 flex justify-center items-center">
          <LoadingSpinner />
        </SheetContent>
      ) : (
        <SheetContent className="w-screen md:max-w-md lg:max-w-lg xl:max-w-xl h-screen p-0 flex flex-col">
          <SheetHeader className="text-left h-20 flex flex-col justify-center px-5 border-b flex-shrink-0">
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>

          <div className="flex-grow overflow-auto">
            <UpdateMatchScoreContent
              match={match}
              onUpdateScore={onUpdateScore}
              onEndMatchRound={onEndMatchRound}
              onStartMatchRound={onStartMatchRound}
            />
          </div>

          <SheetFooter className="px-5 py-5 border-t mt-auto flex-shrink-0">
            <Button
              absoluteLoaderPosition
              type="button"
              className="w-full mt-4 font-bold"
              onClick={handleClose}
              variant="secondary"
            >
              Cancel
            </Button>

            <Button
              absoluteLoaderPosition
              type="button"
              className="w-full mt-4 font-bold"
            >
              End Match
            </Button>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default UpdateMatchScoreDrawer;
