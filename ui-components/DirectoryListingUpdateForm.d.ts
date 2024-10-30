import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { DirectoryListing } from "./graphql/types";
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
export declare type DirectoryListingUpdateFormInputValues = {
    title?: string;
    description?: string;
    address?: string;
    url?: string;
    phoneNumbers?: string[];
    companyImage?: string;
    images?: string[];
    directoryId?: string;
};
export declare type DirectoryListingUpdateFormValidationValues = {
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
export declare type DirectoryListingUpdateFormOverridesProps = {
    DirectoryListingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    phoneNumbers?: PrimitiveOverrideProps<TextFieldProps>;
    companyImage?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextFieldProps>;
    directoryId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DirectoryListingUpdateFormProps = React.PropsWithChildren<{
    overrides?: DirectoryListingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    directoryListing?: DirectoryListing;
    onSubmit?: (fields: DirectoryListingUpdateFormInputValues) => DirectoryListingUpdateFormInputValues;
    onSuccess?: (fields: DirectoryListingUpdateFormInputValues) => void;
    onError?: (fields: DirectoryListingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DirectoryListingUpdateFormInputValues) => DirectoryListingUpdateFormInputValues;
    onValidate?: DirectoryListingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DirectoryListingUpdateForm(props: DirectoryListingUpdateFormProps): React.ReactElement;
