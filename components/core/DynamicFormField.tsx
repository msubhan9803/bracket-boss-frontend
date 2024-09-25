import { DynamicFormField as DynamicFormFieldType } from "@/global";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import FileUploadInput from "@/components/core/FileUploadInput";

type Props<T extends { [key: string]: any }> = {
  dynamicField: DynamicFormFieldType<T>;
};

const DynamicFormField = <T extends { [key: string]: any }>({
  dynamicField,
}: Props<T>) => {
  const form = useFormContext();

  const getErrorClass = (name: string) =>
    cn(form.formState.errors[name] && "border-destructive");

  if (dynamicField.type === "select") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dynamicField.label}</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className={cn("w-full", getErrorClass(dynamicField.name))}
                >
                  <SelectValue placeholder={dynamicField.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {dynamicField.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (dynamicField.type === "multi-select") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dynamicField.label}</FormLabel>
            <FormControl>
              <MultiSelect
                className={cn("multi-select", getErrorClass(dynamicField.name))}
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                {dynamicField.options?.map((option, index) => (
                  <MultiSelectItem key={index} value={option.value}>
                    {option.label}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (dynamicField.type === "text") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dynamicField.label}</FormLabel>
            <FormControl>
              <div className="flex">
                {dynamicField.prefixRender && (
                  <span
                    className={cn(
                      "inline-flex items-center px-3 text-sm",
                      "text-primary-foreground font-bold bg-primary",
                      "rounded-e-0 border-e-0 rounded-s-md",
                      "dark:bg-primary/80 dark:text-primary-foreground"
                    )}
                  >
                    {dynamicField.prefixRender}
                  </span>
                )}
                <Input
                  className={cn(
                    dynamicField.prefixRender
                      ? "rounded-none rounded-e-lg"
                      : "",
                    getErrorClass(dynamicField.name)
                  )}
                  type={dynamicField.type}
                  required={dynamicField.required}
                  placeholder={dynamicField.placeholder}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (dynamicField.type === "textarea") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dynamicField.label}</FormLabel>
            <FormControl>
              <Textarea
                className={cn(getErrorClass(dynamicField.name))}
                required={dynamicField.required}
                placeholder={dynamicField.placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (dynamicField.type === "switch") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel className="text-sm">{dynamicField.label}</FormLabel>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  }

  if (dynamicField.type === "decimal" || dynamicField.type === "number") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dynamicField.label}</FormLabel>
            <FormControl>
              <Input
                className={cn(getErrorClass(dynamicField.name))}
                type={dynamicField.type}
                required={dynamicField.required}
                {...form.register(field.name, {
                  setValueAs: (value) => parseFloat(value),
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (dynamicField.type === "datetime") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dynamicField.label}</FormLabel>
            <FormControl>
              <Input
                type="datetime-local"
                required={dynamicField.required}
                className={cn(getErrorClass(dynamicField.name))}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (dynamicField.type === "radio") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dynamicField.label}</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
                className="flex justify-center gap-4"
              >
                {dynamicField.options?.map((option, index) =>
                  dynamicField.render ? (
                    dynamicField.render({
                      key: `${field.name}-${index}`,
                      id: `${field.name}-${index}`,
                      value: option.value,
                      label: option.label,
                      icon: option.icon,
                    })
                  ) : (
                    <RadioGroupItem key={index} value={option.value}>
                      {option.label}
                    </RadioGroupItem>
                  )
                )}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (dynamicField.type === "file") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dynamicField.label}</FormLabel>
            <FormControl>
              <FileUploadInput
                onChange={(file) => field.onChange(file)}
                defaultPhotoUrl={dynamicField.defaultValue}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      defaultValue={dynamicField.defaultValue}
      control={form.control}
      name={dynamicField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{dynamicField.label}</FormLabel>
          <FormControl>
            <Input
              type={dynamicField.type}
              required={dynamicField.required}
              disabled={!!dynamicField.disabled}
              className={cn(getErrorClass(dynamicField.name))}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DynamicFormField;
