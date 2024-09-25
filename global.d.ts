import { FieldPath } from "react-hook-form";

type PageProps = {
  params: { [key: string]: string } & {
    collectionId: string;
    locationId: string;
    menuId: string;
    menuCategoryId: string;
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

type DynamicFormField<T extends Record<string, any> = void> = {
  label: string | null;
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
    | "switch"
    | "decimal"
    | "multi-select"
    | "file"
    | "radio";
  required?: true;
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: any; icon?: IconType | any }[];
  disabled?: boolean;
  isVisible?: boolean;
  className?: string;
  render?: (data: CustomRadio) => ReactNode;
  prefixRender?: ReactNode;
};

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
