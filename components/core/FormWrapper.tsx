import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { DynamicFormField as DynamicFieldType } from '@/global';
import DynamicFormField from './DynamicFormField';

type FormWrapperProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  fields: DynamicFieldType<T>[];
  onSubmit: (values: T) => any | Promise<any>;
  submitButtonLabel?: string;
  submitButton?: React.ReactNode;
  isDrawer?: boolean;
  gridCols?: string;
};

const FormWrapper = <T extends { [key: string]: any }>({
  form,
  fields,
  onSubmit,
  submitButtonLabel,
  submitButton,
  isDrawer,
  gridCols = 'grid-cols-1'
}: FormWrapperProps<T>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: T) => {
          const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
            if (value !== null && value !== undefined && !Number.isNaN(value)) {
              acc[key as keyof T] = value;
            }
            return acc;
          }, {} as T);
          return onSubmit(filteredData).then(() => {
            form.reset();
          });
        })}
      >
        <ScrollArea className={isDrawer ? 'h-[calc(100vh-5rem-5rem)]' : 'h-auto'}>
          <div className={`grid gap-3 p-4 ${gridCols}`}>
            {fields.map((field) => (
              <div key={field.name} className={field.className || ''}>
                <DynamicFormField dynamicField={field} />
              </div>
            ))}

            {
              submitButtonLabel && (
                <div className="w-full flex items-center col-span-full mt-6">
                  {submitButton ? (
                    submitButton
                  ) : (
                    <Button
                      absoluteLoaderPosition
                      loading={form.formState.isSubmitting}
                      disabled={form.formState.isSubmitting}
                      type='submit'
                      className='w-full mt-4 font-bold'
                    >
                      {submitButtonLabel || 'Submit'}
                    </Button>
                  )}
                </div>
              )
            }
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
};

export default FormWrapper;
