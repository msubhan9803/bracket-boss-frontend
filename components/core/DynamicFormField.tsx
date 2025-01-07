import { DynamicFormField as DynamicFormFieldType } from "@/global";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FileUploadInput from "@/components/core/FileUploadInput";
import { Checkbox } from "@/components/ui/checkbox";

type PrefixProps = {
  content: React.ReactNode;
  className?: string;
};

type SuffixProps = {
  content: React.ReactNode;
  className?: string;
};

type Props<T extends { [key: string]: any }> = {
  dynamicField: DynamicFormFieldType<T>;
};

const DynamicFormField = <T extends { [key: string]: any }>({
  dynamicField,
}: Props<T>) => {
  const form = useFormContext();

  if (dynamicField.isVisible === false) return null;

  if (dynamicField.type === "render") {
    return (
      <div className={dynamicField.className}>
        {dynamicField.render()}
      </div>
    );
  }

  const getErrorClass = (name: string) =>
    cn(form.formState.errors[name] && "border-destructive");

  const Prefix: React.FC<PrefixProps> = ({ content, className }) => {
    return (
      <span
        className={cn(
          "inline-flex items-center px-3 text-sm font-bold text-gray-900 bg-gray-200 rounded-e-0 border-e-0 rounded-s-md dark:text-gray-400 dark:bg-gray-700",
          className
        )}
      >
        {content}
      </span>
    );
  };

  const Suffix: React.FC<SuffixProps> = ({ content, className }) => {
    return (
      <span
        className={cn(
          "inline-flex items-center px-3 text-sm font-bold text-gray-900 bg-gray-200 rounded-e-md border-e border-gray-300 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600",
          className
        )}
      >
        {content}
      </span>
    );
  };

  if (dynamicField.type === "select") {
    return (
      <FormField
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dynamicField.label}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <FormControl>
                <SelectTrigger
                  className={cn("w-full", getErrorClass(dynamicField.name))}
                >
                  <SelectValue placeholder={dynamicField.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {dynamicField.options && dynamicField.options.length > 0 ? (
                  dynamicField.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="unassigned-404" disabled>
                    No data
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
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
                  <Prefix content={dynamicField.prefixRender} />
                )}
                <Input
                  className={cn(
                    dynamicField.prefixRender ? "rounded-none rounded-e-lg" : "",
                    dynamicField.suffixRender ? "rounded-none rounded-s-lg" : "",
                    getErrorClass(dynamicField.name)
                  )}
                  type={dynamicField.type}
                  required={dynamicField.required}
                  placeholder={dynamicField.placeholder}
                  {...field}
                />
                {dynamicField.suffixRender && (
                  <Suffix content={dynamicField.suffixRender} />
                )}
              </div>
            </FormControl>
            <FormMessage />
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
              <div className="flex">
                {dynamicField.prefixRender && (
                  <Prefix content={dynamicField.prefixRender} />
                )}
                <Input
                  className={cn(
                    dynamicField.prefixRender ? "rounded-none rounded-e-lg" : "",
                    dynamicField.suffixRender ? "rounded-none rounded-s-lg" : "",
                    getErrorClass(dynamicField.name)
                  )}
                  type={dynamicField.type}
                  required={dynamicField.required}
                  {...form.register(field.name, {
                    setValueAs: (value) => parseFloat(value),
                  })}
                  placeholder={dynamicField.placeholder}
                />
                {dynamicField.suffixRender && (
                  <Suffix content={dynamicField.suffixRender} />
                )}
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
                allowedTypes={dynamicField.allowedTypes}
                className={dynamicField.className}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (dynamicField.type === "password") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dynamicField.label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={dynamicField.showPassword ? "text" : "password"}
                  required={dynamicField.required}
                  className={cn(getErrorClass(dynamicField.name))}
                  {...field}
                />
                {dynamicField.toggleShowPassword && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={dynamicField.toggleShowPassword}
                  >
                    {dynamicField.showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-500" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (dynamicField.type === "checkbox") {
    return (
      <FormField
        defaultValue={dynamicField.defaultValue}
        control={form.control}
        name={dynamicField.name}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between">
            <FormLabel className="text-sm">{dynamicField.label}</FormLabel>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
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
              placeholder={dynamicField.placeholder}
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
