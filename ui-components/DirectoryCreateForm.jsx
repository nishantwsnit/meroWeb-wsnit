/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createDirectory } from "./graphql/mutations";
const client = generateClient();
export default function DirectoryCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    subTitle: "",
    imageUrl: "",
    isSubDirectory: false,
    parentDirectoryId: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [subTitle, setSubTitle] = React.useState(initialValues.subTitle);
  const [imageUrl, setImageUrl] = React.useState(initialValues.imageUrl);
  const [isSubDirectory, setIsSubDirectory] = React.useState(
    initialValues.isSubDirectory
  );
  const [parentDirectoryId, setParentDirectoryId] = React.useState(
    initialValues.parentDirectoryId
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setSubTitle(initialValues.subTitle);
    setImageUrl(initialValues.imageUrl);
    setIsSubDirectory(initialValues.isSubDirectory);
    setParentDirectoryId(initialValues.parentDirectoryId);
    setErrors({});
  };
  const validations = {
    title: [{ type: "Required" }],
    subTitle: [{ type: "Required" }],
    imageUrl: [],
    isSubDirectory: [],
    parentDirectoryId: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          subTitle,
          imageUrl,
          isSubDirectory,
          parentDirectoryId,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createDirectory.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "DirectoryCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              subTitle,
              imageUrl,
              isSubDirectory,
              parentDirectoryId,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Sub title"
        isRequired={true}
        isReadOnly={false}
        value={subTitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subTitle: value,
              imageUrl,
              isSubDirectory,
              parentDirectoryId,
            };
            const result = onChange(modelFields);
            value = result?.subTitle ?? value;
          }
          if (errors.subTitle?.hasError) {
            runValidationTasks("subTitle", value);
          }
          setSubTitle(value);
        }}
        onBlur={() => runValidationTasks("subTitle", subTitle)}
        errorMessage={errors.subTitle?.errorMessage}
        hasError={errors.subTitle?.hasError}
        {...getOverrideProps(overrides, "subTitle")}
      ></TextField>
      <TextField
        label="Image url"
        isRequired={false}
        isReadOnly={false}
        value={imageUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subTitle,
              imageUrl: value,
              isSubDirectory,
              parentDirectoryId,
            };
            const result = onChange(modelFields);
            value = result?.imageUrl ?? value;
          }
          if (errors.imageUrl?.hasError) {
            runValidationTasks("imageUrl", value);
          }
          setImageUrl(value);
        }}
        onBlur={() => runValidationTasks("imageUrl", imageUrl)}
        errorMessage={errors.imageUrl?.errorMessage}
        hasError={errors.imageUrl?.hasError}
        {...getOverrideProps(overrides, "imageUrl")}
      ></TextField>
      <SwitchField
        label="Is sub directory"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isSubDirectory}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              subTitle,
              imageUrl,
              isSubDirectory: value,
              parentDirectoryId,
            };
            const result = onChange(modelFields);
            value = result?.isSubDirectory ?? value;
          }
          if (errors.isSubDirectory?.hasError) {
            runValidationTasks("isSubDirectory", value);
          }
          setIsSubDirectory(value);
        }}
        onBlur={() => runValidationTasks("isSubDirectory", isSubDirectory)}
        errorMessage={errors.isSubDirectory?.errorMessage}
        hasError={errors.isSubDirectory?.hasError}
        {...getOverrideProps(overrides, "isSubDirectory")}
      ></SwitchField>
      <TextField
        label="Parent directory id"
        isRequired={false}
        isReadOnly={false}
        value={parentDirectoryId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subTitle,
              imageUrl,
              isSubDirectory,
              parentDirectoryId: value,
            };
            const result = onChange(modelFields);
            value = result?.parentDirectoryId ?? value;
          }
          if (errors.parentDirectoryId?.hasError) {
            runValidationTasks("parentDirectoryId", value);
          }
          setParentDirectoryId(value);
        }}
        onBlur={() =>
          runValidationTasks("parentDirectoryId", parentDirectoryId)
        }
        errorMessage={errors.parentDirectoryId?.errorMessage}
        hasError={errors.parentDirectoryId?.hasError}
        {...getOverrideProps(overrides, "parentDirectoryId")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
