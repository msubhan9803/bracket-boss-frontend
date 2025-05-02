import { FieldPath } from "react-hook-form";
import { ReactNode } from "react";
import { IconType } from "react-icons";

type PageProps = {
  params: { [key: string]: string } & {
    tournamentId: string;
  };
};

type NextPageLayout = PageProps & {
  children: any;
};

type CustomRadio = {
  key: string;
  id: string;
  value: string;
  label: string;
  icon: string;
};

interface RenderField {
  type: "render";
  label?: string | null;
  className?: string;
  isVisible?: boolean;
  render: () => ReactNode;
}

interface BaseInputField<T extends Record<string, any> = void> {
  label?: string | null;
  name: FieldPath<T>;
  type:
  | "text"
  | "number"
  | "tel"
  | "color"
  | "date"
  | "datetime"
  | "password"
  | "textarea"
  | "email"
  | "select"
  | "search-select"
  | "switch"
  | "decimal"
  | "multi-select"
  | "file"
  | "checkbox"
  | "radio"
  | "time";
  required?: true;
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string | ReactNode; value: any; icon?: IconType | any }[];
  disabled?: boolean;
  isVisible?: boolean;
  className?: string;
  render?: (data: any) => ReactNode; // for custom radio rendering
  prefixRender?: ReactNode;
  suffixRender?: ReactNode;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
  allowedTypes?: {
    type: string;
    label: string;
  }[];
}

export type DynamicFormField<T extends Record<string, any> = void> =
  | BaseInputField<T>
  | RenderField;

interface GraphQLErrorResponse {
  response: {
    errors: {
      message: string;
      extensions: {
        originalError?: {
          message: string;
          error: string;
          statusCode: number;
        };
      };
    }[];
  };
}
