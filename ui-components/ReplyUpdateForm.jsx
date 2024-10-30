/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getReply } from "./graphql/queries";
import { updateReply } from "./graphql/mutations";
const client = generateClient();
export default function ReplyUpdateForm(props) {
  const {
    id: idProp,
    reply: replyModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    replyText: "",
    postId: "",
  };
  const [replyText, setReplyText] = React.useState(initialValues.replyText);
  const [postId, setPostId] = React.useState(initialValues.postId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = replyRecord
      ? { ...initialValues, ...replyRecord }
      : initialValues;
    setReplyText(cleanValues.replyText);
    setPostId(cleanValues.postId);
    setErrors({});
  };
  const [replyRecord, setReplyRecord] = React.useState(replyModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getReply.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getReply
        : replyModelProp;
      setReplyRecord(record);
    };
    queryData();
  }, [idProp, replyModelProp]);
  React.useEffect(resetStateValues, [replyRecord]);
  const validations = {
    replyText: [{ type: "Required" }],
    postId: [{ type: "Required" }],
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
          replyText,
          postId,
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
            query: updateReply.replaceAll("__typename", ""),
            variables: {
              input: {
                id: replyRecord.id,
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
      {...getOverrideProps(overrides, "ReplyUpdateForm")}
      {...rest}
    >
      <TextField
        label="Reply text"
        isRequired={true}
        isReadOnly={false}
        value={replyText}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              replyText: value,
              postId,
            };
            const result = onChange(modelFields);
            value = result?.replyText ?? value;
          }
          if (errors.replyText?.hasError) {
            runValidationTasks("replyText", value);
          }
          setReplyText(value);
        }}
        onBlur={() => runValidationTasks("replyText", replyText)}
        errorMessage={errors.replyText?.errorMessage}
        hasError={errors.replyText?.hasError}
        {...getOverrideProps(overrides, "replyText")}
      ></TextField>
      <TextField
        label="Post id"
        isRequired={true}
        isReadOnly={false}
        value={postId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              replyText,
              postId: value,
            };
            const result = onChange(modelFields);
            value = result?.postId ?? value;
          }
          if (errors.postId?.hasError) {
            runValidationTasks("postId", value);
          }
          setPostId(value);
        }}
        onBlur={() => runValidationTasks("postId", postId)}
        errorMessage={errors.postId?.errorMessage}
        hasError={errors.postId?.hasError}
        {...getOverrideProps(overrides, "postId")}
      ></TextField>
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
          isDisabled={!(idProp || replyModelProp)}
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
              !(idProp || replyModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
