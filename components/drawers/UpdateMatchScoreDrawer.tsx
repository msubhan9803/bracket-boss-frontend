import LoadingSpinner from "../core/LoadingSpinner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Dispatch, SetStateAction } from "react";

type UpdateMatchScoreDrawerProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentMatchId: number | undefined;
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
  console.log('currentMatchId: ', currentMatchId)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {isLoading ? (
        <SheetContent className="w-screen md:max-w-md lg:max-w-lg xl:max-w-xl h-screen p-0 flex justify-center items-center">
          <LoadingSpinner />
        </SheetContent>
      ) : (
        <SheetContent
          className="w-screen md:max-w-md lg:max-w-lg xl:max-w-xl h-screen p-0"
          onInteractOutside={(event) => event.preventDefault()}
        >
          <SheetHeader className="text-left h-20 flex flex-col justify-center px-5 border-b">
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default UpdateMatchScoreDrawer;
