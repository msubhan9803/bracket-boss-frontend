import { FieldPath } from 'react-hook-form'

type PageProps = {
  params: { [key: string]: string } & {
    collectionId: string
    locationId: string
    menuId: string
    menuCategoryId: string
  }
}

type NextPageLayout = PageProps & {
  children: any
}

type DynamicFormField<T extends Record<string, any> = void> = {
  label: string;
  name: FieldPath<T>;
  type: 'text' | 'number' | 'tel' | 'color' | 'date' | 'datetime' | 'password' | 'textarea' | 'email' | 'select' | 'switch' | 'decimal' | 'multi-select';
  required?: true;
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: any }[];
  disabled?: boolean;
  isVisible?: boolean;
  className?: string;
};

interface GraphQLErrorResponse {
  response: {
    errors: { message: string }[]
  }
}