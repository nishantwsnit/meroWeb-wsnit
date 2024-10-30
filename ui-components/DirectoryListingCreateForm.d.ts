import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type DirectoryListingCreateFormInputValues = {
    title?: string;
    description?: string;
    address?: string;
    url?: string;
    phoneNumbers?: string[];
    companyImage?: string;
    images?: string[];
    directoryId?: string;
};
export declare type DirectoryListingCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    phoneNumbers?: ValidationFunction<string>;
    companyImage?: ValidationFunction<string>;
    images?: ValidationFunction<string>;
    directoryId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DirectoryListingCreateFormOverridesProps = {
    DirectoryListingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    phoneNumbers?: PrimitiveOverrideProps<TextFieldProps>;
    companyImage?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextFieldProps>;
    directoryId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DirectoryListingCreateFormProps = React.PropsWithChildren<{
    overrides?: DirectoryListingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DirectoryListingCreateFormInputValues) => DirectoryListingCreateFormInputValues;
    onSuccess?: (fields: DirectoryListingCreateFormInputValues) => void;
    onError?: (fields: DirectoryListingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DirectoryListingCreateFormInputValues) => DirectoryListingCreateFormInputValues;
    onValidate?: DirectoryListingCreateFormValidationValues;
} & React.CSSProperties>;
export default function DirectoryListingCreateForm(props: DirectoryListingCreateFormProps): React.ReactElement;
