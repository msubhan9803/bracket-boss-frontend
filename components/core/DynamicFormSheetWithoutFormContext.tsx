import { useForm, UseFormReturn } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import FormWrapper from "./FormWrapper";
import { Dispatch, SetStateAction, useEffect } from "react";
import { DynamicFormField as DynamicFieldType } from "@/global";

type Props<T extends { [key: string]: any }> = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
  fields: DynamicFieldType<T>[];
  title: string;
  description?: string;
  submitButtonLabel?: string;
  onSubmit: (values: T) => any | Promise<any>;
  setFormState?: Dispatch<SetStateAction<T>>;
  form: UseFormReturn<T>;
};

const DynamicFormSheetWithoutFormContext = <T extends { [key: string]: any }>({
  isOpen,
  setIsOpen,
  isLoading,
  fields,
  title,
  description,
  submitButtonLabel,
  onSubmit,
  form,
}: Props<T>) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {isLoading ? (
        <SheetContent className="w-screen md:max-w-md lg:max-w-lg xl:max-w-xl h-screen p-0 flex justify-center items-center">
          <LoadingSpinner />
        </SheetContent>
      ) : (
        <SheetContent className="w-screen md:max-w-md lg:max-w-lg xl:max-w-xl h-screen p-0">
          <SheetHeader className="text-left h-20 flex flex-col justify-center px-5">
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>

          <FormWrapper
            form={form}
            fields={fields}
            onSubmit={onSubmit}
            submitButtonLabel={submitButtonLabel}
            isDrawer
          />
        </SheetContent>
      )}
    </Sheet>
  );
};

export default DynamicFormSheetWithoutFormContext;