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
import { getCategory } from "./graphql/queries";
import { updateCategory } from "./graphql/mutations";
const client = generateClient();
export default function CategoryUpdateForm(props) {
  const {
    categoryId: categoryIdProp,
    category: categoryModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    categoryId: "",
    name: "",
    iconName: "",
    iconType: "",
    description: "",
    isLocationBased: false,
  };
  const [categoryId, setCategoryId] = React.useState(initialValues.categoryId);
  const [name, setName] = React.useState(initialValues.name);
  const [iconName, setIconName] = React.useState(initialValues.iconName);
  const [iconType, setIconType] = React.useState(initialValues.iconType);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [isLocationBased, setIsLocationBased] = React.useState(
    initialValues.isLocationBased
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = categoryRecord
      ? { ...initialValues, ...categoryRecord }
      : initialValues;
    setCategoryId(cleanValues.categoryId);
    setName(cleanValues.name);
    setIconName(cleanValues.iconName);
    setIconType(cleanValues.iconType);
    setDescription(cleanValues.description);
    setIsLocationBased(cleanValues.isLocationBased);
    setErrors({});
  };
  const [categoryRecord, setCategoryRecord] = React.useState(categoryModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = categoryIdProp
        ? (
            await client.graphql({
              query: getCategory.replaceAll("__typename", ""),
              variables: { categoryId: categoryIdProp },
            })
          )?.data?.getCategory
        : categoryModelProp;
      setCategoryRecord(record);
    };
    queryData();
  }, [categoryIdProp, categoryModelProp]);
  React.useEffect(resetStateValues, [categoryRecord]);
  const validations = {
    categoryId: [{ type: "Required" }],
    name: [{ type: "Required" }],
    iconName: [{ type: "Required" }],
    iconType: [{ type: "Required" }],
    description: [{ type: "Required" }],
    isLocationBased: [],
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
          categoryId,
          name,
          iconName,
          iconType,
          description,
          isLocationBased: isLocationBased ?? null,
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
            query: updateCategory.replaceAll("__typename", ""),
            variables: {
              input: {
                categoryId: categoryRecord.categoryId,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CategoryUpdateForm")}
      {...rest}
    >
      <TextField
        label="Category id"
        isRequired={true}
        isReadOnly={true}
        value={categoryId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              categoryId: value,
              name,
              iconName,
              iconType,
              description,
              isLocationBased,
            };
            const result = onChange(modelFields);
            value = result?.categoryId ?? value;
          }
          if (errors.categoryId?.hasError) {
            runValidationTasks("categoryId", value);
          }
          setCategoryId(value);
        }}
        onBlur={() => runValidationTasks("categoryId", categoryId)}
        errorMessage={errors.categoryId?.errorMessage}
        hasError={errors.categoryId?.hasError}
        {...getOverrideProps(overrides, "categoryId")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              categoryId,
              name: value,
              iconName,
              iconType,
              description,
              isLocationBased,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Icon name"
        isRequired={true}
        isReadOnly={false}
        value={iconName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              categoryId,
              name,
              iconName: value,
              iconType,
              description,
              isLocationBased,
            };
            const result = onChange(modelFields);
            value = result?.iconName ?? value;
          }
          if (errors.iconName?.hasError) {
            runValidationTasks("iconName", value);
          }
          setIconName(value);
        }}
        onBlur={() => runValidationTasks("iconName", iconName)}
        errorMessage={errors.iconName?.errorMessage}
        hasError={errors.iconName?.hasError}
        {...getOverrideProps(overrides, "iconName")}
      ></TextField>
      <TextField
        label="Icon type"
        isRequired={true}
        isReadOnly={false}
        value={iconType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              categoryId,
              name,
              iconName,
              iconType: value,
              description,
              isLocationBased,
            };
            const result = onChange(modelFields);
            value = result?.iconType ?? value;
          }
          if (errors.iconType?.hasError) {
            runValidationTasks("iconType", value);
          }
          setIconType(value);
        }}
        onBlur={() => runValidationTasks("iconType", iconType)}
        errorMessage={errors.iconType?.errorMessage}
        hasError={errors.iconType?.hasError}
        {...getOverrideProps(overrides, "iconType")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              categoryId,
              name,
              iconName,
              iconType,
              description: value,
              isLocationBased,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <SwitchField
        label="Is location based"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isLocationBased}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              categoryId,
              name,
              iconName,
              iconType,
              description,
              isLocationBased: value,
            };
            const result = onChange(modelFields);
            value = result?.isLocationBased ?? value;
          }
          if (errors.isLocationBased?.hasError) {
            runValidationTasks("isLocationBased", value);
          }
          setIsLocationBased(value);
        }}
        onBlur={() => runValidationTasks("isLocationBased", isLocationBased)}
        errorMessage={errors.isLocationBased?.errorMessage}
        hasError={errors.isLocationBased?.hasError}
        {...getOverrideProps(overrides, "isLocationBased")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(categoryIdProp || categoryModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(categoryIdProp || categoryModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
