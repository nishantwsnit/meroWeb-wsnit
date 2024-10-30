import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Directory } from "./graphql/types";
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
export declare type DirectoryUpdateFormInputValues = {
    title?: string;
    subTitle?: string;
    imageUrl?: string;
    isSubDirectory?: boolean;
    parentDirectoryId?: string;
};
export declare type DirectoryUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    subTitle?: ValidationFunction<string>;
    imageUrl?: ValidationFunction<string>;
    isSubDirectory?: ValidationFunction<boolean>;
    parentDirectoryId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DirectoryUpdateFormOverridesProps = {
    DirectoryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    subTitle?: PrimitiveOverrideProps<TextFieldProps>;
    imageUrl?: PrimitiveOverrideProps<TextFieldProps>;
    isSubDirectory?: PrimitiveOverrideProps<SwitchFieldProps>;
    parentDirectoryId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DirectoryUpdateFormProps = React.PropsWithChildren<{
    overrides?: DirectoryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    directory?: Directory;
    onSubmit?: (fields: DirectoryUpdateFormInputValues) => DirectoryUpdateFormInputValues;
    onSuccess?: (fields: DirectoryUpdateFormInputValues) => void;
    onError?: (fields: DirectoryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DirectoryUpdateFormInputValues) => DirectoryUpdateFormInputValues;
    onValidate?: DirectoryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DirectoryUpdateForm(props: DirectoryUpdateFormProps): React.ReactElement;
