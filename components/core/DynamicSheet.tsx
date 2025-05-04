import React, { ReactNode, Dispatch, SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import { Button } from "../ui/button";

type DynamicSheetProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footerActions?: ReactNode;
  fixedFooter?: boolean;
  cancelButtonLabel?: string;
  onCancel?: () => void;
  sheetWidth?: "sm" | "md" | "lg" | "xl" | "full";
};

const DynamicSheet = ({
  isOpen,
  setIsOpen,
  isLoading,
  title,
  description,
  children,
  footerActions,
  fixedFooter = true,
  cancelButtonLabel = "Cancel",
  onCancel,
  sheetWidth = "xl",
}: DynamicSheetProps) => {
  const handleClose = () => {
    if (onCancel) {
      onCancel();
    }
    setIsOpen(false);
  };

  const getWidthClass = () => {
    switch (sheetWidth) {
      case "sm":
        return "md:max-w-sm";
      case "md":
        return "md:max-w-md";
      case "lg":
        return "md:max-w-lg";
      case "xl":
        return "md:max-w-xl";
      case "full":
        return "max-w-full";
      default:
        return "md:max-w-xl";
    }
  };

  const widthClass = getWidthClass();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {isLoading ? (
        <SheetContent
          className={`w-screen ${widthClass} h-screen p-0 flex justify-center items-center`}
        >
          <LoadingSpinner />
        </SheetContent>
      ) : (
        <SheetContent
          className={`w-screen ${widthClass} h-screen p-0 flex flex-col`}
        >
          <SheetHeader className="text-left h-20 flex flex-col justify-center px-5 border-b flex-shrink-0">
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>

          <div className="flex-grow overflow-auto px-5 py-4">{children}</div>

          {fixedFooter && (
            <SheetFooter className="px-5 py-5 border-t mt-auto flex-shrink-0">
              <Button
                absoluteLoaderPosition
                type="button"
                className="w-full mt-4 font-bold"
                onClick={handleClose}
                variant="secondary"
              >
                {cancelButtonLabel}
              </Button>

              {footerActions}
            </SheetFooter>
          )}
        </SheetContent>
      )}
    </Sheet>
  );
};

export default DynamicSheet;
