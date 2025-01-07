import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import FormWrapper from "./FormWrapper";
import { Dispatch, SetStateAction } from "react";
import { DynamicFormField as DynamicFieldType } from "@/global";
import { Button } from "../ui/button";

type Props<T extends { [key: string]: any }> = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
  fields: DynamicFieldType<T>[];
  title: string;
  description?: string;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  onSubmit: (values: T) => any | Promise<any>;
  fixedFooter?: boolean;
};

const DynamicFormSheet = <T extends { [key: string]: any }>({
  isOpen,
  setIsOpen,
  isLoading,
  fields,
  title,
  description,
  submitButtonLabel,
  cancelButtonLabel,
  onSubmit,
  fixedFooter
}: Props<T>) => {
  const form = useForm<T>({
    mode: "onBlur",
  });

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  }

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
            isDrawer
            submitButtonLabel={!fixedFooter ? submitButtonLabel : undefined}
          />

          {
            fixedFooter && (
              <SheetFooter className="px-5">
                <Button
                  absoluteLoaderPosition
                  loading={form.formState.isSubmitting}
                  disabled={form.formState.isSubmitting}
                  type='button'
                  className='w-full mt-4 font-bold'
                  onClick={handleClose}
                  variant='secondary'
                >
                  {cancelButtonLabel || 'Cancel'}
                </Button>

                <Button
                  absoluteLoaderPosition
                  loading={form.formState.isSubmitting}
                  disabled={form.formState.isSubmitting}
                  type='button'
                  className='w-full mt-4 font-bold'
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {submitButtonLabel || 'Submit'}
                </Button>
              </SheetFooter>
            )
          }
        </SheetContent>
      )}
    </Sheet>
  );
};

export default DynamicFormSheet;
