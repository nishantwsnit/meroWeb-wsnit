import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Category } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CategoryUpdateFormInputValues = {
    categoryId?: string;
    name?: string;
    iconName?: string;
    iconType?: string;
    description?: string;
    isLocationBased?: boolean;
};
export declare type CategoryUpdateFormValidationValues = {
    categoryId?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    iconName?: ValidationFunction<string>;
    iconType?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    isLocationBased?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CategoryUpdateFormOverridesProps = {
    CategoryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    categoryId?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    iconName?: PrimitiveOverrideProps<TextFieldProps>;
    iconType?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    isLocationBased?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type CategoryUpdateFormProps = React.PropsWithChildren<{
    overrides?: CategoryUpdateFormOverridesProps | undefined | null;
} & {
    categoryId?: string;
    category?: Category;
    onSubmit?: (fields: CategoryUpdateFormInputValues) => CategoryUpdateFormInputValues;
    onSuccess?: (fields: CategoryUpdateFormInputValues) => void;
    onError?: (fields: CategoryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CategoryUpdateFormInputValues) => CategoryUpdateFormInputValues;
    onValidate?: CategoryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CategoryUpdateForm(props: CategoryUpdateFormProps): React.ReactElement;
