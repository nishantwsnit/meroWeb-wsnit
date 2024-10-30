import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type CategoryCreateFormInputValues = {
    categoryId?: string;
    name?: string;
    iconName?: string;
    iconType?: string;
    description?: string;
    isLocationBased?: boolean;
};
export declare type CategoryCreateFormValidationValues = {
    categoryId?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    iconName?: ValidationFunction<string>;
    iconType?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    isLocationBased?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CategoryCreateFormOverridesProps = {
    CategoryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    categoryId?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    iconName?: PrimitiveOverrideProps<TextFieldProps>;
    iconType?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    isLocationBased?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type CategoryCreateFormProps = React.PropsWithChildren<{
    overrides?: CategoryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CategoryCreateFormInputValues) => CategoryCreateFormInputValues;
    onSuccess?: (fields: CategoryCreateFormInputValues) => void;
    onError?: (fields: CategoryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CategoryCreateFormInputValues) => CategoryCreateFormInputValues;
    onValidate?: CategoryCreateFormValidationValues;
} & React.CSSProperties>;
export default function CategoryCreateForm(props: CategoryCreateFormProps): React.ReactElement;
