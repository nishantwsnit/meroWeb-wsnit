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
export declare type DirectoryCreateFormInputValues = {
    title?: string;
    subTitle?: string;
    imageUrl?: string;
    isSubDirectory?: boolean;
    parentDirectoryId?: string;
};
export declare type DirectoryCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    subTitle?: ValidationFunction<string>;
    imageUrl?: ValidationFunction<string>;
    isSubDirectory?: ValidationFunction<boolean>;
    parentDirectoryId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DirectoryCreateFormOverridesProps = {
    DirectoryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    subTitle?: PrimitiveOverrideProps<TextFieldProps>;
    imageUrl?: PrimitiveOverrideProps<TextFieldProps>;
    isSubDirectory?: PrimitiveOverrideProps<SwitchFieldProps>;
    parentDirectoryId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DirectoryCreateFormProps = React.PropsWithChildren<{
    overrides?: DirectoryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DirectoryCreateFormInputValues) => DirectoryCreateFormInputValues;
    onSuccess?: (fields: DirectoryCreateFormInputValues) => void;
    onError?: (fields: DirectoryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DirectoryCreateFormInputValues) => DirectoryCreateFormInputValues;
    onValidate?: DirectoryCreateFormValidationValues;
} & React.CSSProperties>;
export default function DirectoryCreateForm(props: DirectoryCreateFormProps): React.ReactElement;
