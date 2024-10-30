/* eslint-disable */
"use client";
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createUser } from "./graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function UserCreateForm(props) {
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
    userId: "",
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    isVerified: false,
    categories: [],
    onboardingDate: "",
    postId: "",
    replyId: "",
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [name, setName] = React.useState(initialValues.name);
  const [username, setUsername] = React.useState(initialValues.username);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialValues.phoneNumber
  );
  const [profilePicture, setProfilePicture] = React.useState(
    initialValues.profilePicture
  );
  const [isVerified, setIsVerified] = React.useState(initialValues.isVerified);
  const [categories, setCategories] = React.useState(initialValues.categories);
  const [onboardingDate, setOnboardingDate] = React.useState(
    initialValues.onboardingDate
  );
  const [postId, setPostId] = React.useState(initialValues.postId);
  const [replyId, setReplyId] = React.useState(initialValues.replyId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUserId(initialValues.userId);
    setName(initialValues.name);
    setUsername(initialValues.username);
    setEmail(initialValues.email);
    setPhoneNumber(initialValues.phoneNumber);
    setProfilePicture(initialValues.profilePicture);
    setIsVerified(initialValues.isVerified);
    setCategories(initialValues.categories);
    setCurrentCategoriesValue("");
    setOnboardingDate(initialValues.onboardingDate);
    setPostId(initialValues.postId);
    setReplyId(initialValues.replyId);
    setErrors({});
  };
  const [currentCategoriesValue, setCurrentCategoriesValue] =
    React.useState("");
  const categoriesRef = React.createRef();
  const validations = {
    userId: [{ type: "Required" }],
    name: [{ type: "Required" }],
    username: [{ type: "Required" }],
    email: [{ type: "Required" }],
    phoneNumber: [{ type: "Required" }],
    profilePicture: [],
    isVerified: [],
    categories: [],
    onboardingDate: [],
    postId: [],
    replyId: [],
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
          userId,
          name,
          username,
          email,
          phoneNumber,
          profilePicture,
          isVerified,
          categories,
          onboardingDate,
          postId,
          replyId,
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
            query: createUser.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              name,
              username,
              email,
              phoneNumber,
              profilePicture,
              isVerified,
              categories,
              onboardingDate,
              postId,
              replyId,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
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
              userId,
              name: value,
              username,
              email,
              phoneNumber,
              profilePicture,
              isVerified,
              categories,
              onboardingDate,
              postId,
              replyId,
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
        label="Username"
        isRequired={true}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              name,
              username: value,
              email,
              phoneNumber,
              profilePicture,
              isVerified,
              categories,
              onboardingDate,
              postId,
              replyId,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              name,
              username,
              email: value,
              phoneNumber,
              profilePicture,
              isVerified,
              categories,
              onboardingDate,
              postId,
              replyId,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone number"
        isRequired={true}
        isReadOnly={false}
        value={phoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              name,
              username,
              email,
              phoneNumber: value,
              profilePicture,
              isVerified,
              categories,
              onboardingDate,
              postId,
              replyId,
            };
            const result = onChange(modelFields);
            value = result?.phoneNumber ?? value;
          }
          if (errors.phoneNumber?.hasError) {
            runValidationTasks("phoneNumber", value);
          }
          setPhoneNumber(value);
        }}
        onBlur={() => runValidationTasks("phoneNumber", phoneNumber)}
        errorMessage={errors.phoneNumber?.errorMessage}
        hasError={errors.phoneNumber?.hasError}
        {...getOverrideProps(overrides, "phoneNumber")}
      ></TextField>
      <TextField
        label="Profile picture"
        isRequired={false}
        isReadOnly={false}
        value={profilePicture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              name,
              username,
              email,
              phoneNumber,
              profilePicture: value,
              isVerified,
              categories,
              onboardingDate,
              postId,
              replyId,
            };
            const result = onChange(modelFields);
            value = result?.profilePicture ?? value;
          }
          if (errors.profilePicture?.hasError) {
            runValidationTasks("profilePicture", value);
          }
          setProfilePicture(value);
        }}
        onBlur={() => runValidationTasks("profilePicture", profilePicture)}
        errorMessage={errors.profilePicture?.errorMessage}
        hasError={errors.profilePicture?.hasError}
        {...getOverrideProps(overrides, "profilePicture")}
      ></TextField>
      <SwitchField
        label="Is verified"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isVerified}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              userId,
              name,
              username,
              email,
              phoneNumber,
              profilePicture,
              isVerified: value,
              categories,
              onboardingDate,
              postId,
              replyId,
            };
            const result = onChange(modelFields);
            value = result?.isVerified ?? value;
          }
          if (errors.isVerified?.hasError) {
            runValidationTasks("isVerified", value);
          }
          setIsVerified(value);
        }}
        onBlur={() => runValidationTasks("isVerified", isVerified)}
        errorMessage={errors.isVerified?.errorMessage}
        hasError={errors.isVerified?.hasError}
        {...getOverrideProps(overrides, "isVerified")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              name,
              username,
              email,
              phoneNumber,
              profilePicture,
              isVerified,
              categories: values,
              onboardingDate,
              postId,
              replyId,
            };
            const result = onChange(modelFields);
            values = result?.categories ?? values;
          }
          setCategories(values);
          setCurrentCategoriesValue("");
        }}
        currentFieldValue={currentCategoriesValue}
        label={"Categories"}
        items={categories}
        hasError={errors?.categories?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("categories", currentCategoriesValue)
        }
        errorMessage={errors?.categories?.errorMessage}
        setFieldValue={setCurrentCategoriesValue}
        inputFieldRef={categoriesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Categories"
          isRequired={false}
          isReadOnly={false}
          value={currentCategoriesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.categories?.hasError) {
              runValidationTasks("categories", value);
            }
            setCurrentCategoriesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("categories", currentCategoriesValue)
          }
          errorMessage={errors.categories?.errorMessage}
          hasError={errors.categories?.hasError}
          ref={categoriesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "categories")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Onboarding date"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={onboardingDate}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              userId,
              name,
              username,
              email,
              phoneNumber,
              profilePicture,
              isVerified,
              categories,
              onboardingDate: value,
              postId,
              replyId,
            };
            const result = onChange(modelFields);
            value = result?.onboardingDate ?? value;
          }
          if (errors.onboardingDate?.hasError) {
            runValidationTasks("onboardingDate", value);
          }
          setOnboardingDate(value);
        }}
        onBlur={() => runValidationTasks("onboardingDate", onboardingDate)}
        errorMessage={errors.onboardingDate?.errorMessage}
        hasError={errors.onboardingDate?.hasError}
        {...getOverrideProps(overrides, "onboardingDate")}
      ></TextField>
      <TextField
        label="Post id"
        isRequired={false}
        isReadOnly={false}
        value={postId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              name,
              username,
              email,
              phoneNumber,
              profilePicture,
              isVerified,
              categories,
              onboardingDate,
              postId: value,
              replyId,
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
      <TextField
        label="Reply id"
        isRequired={false}
        isReadOnly={false}
        value={replyId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              name,
              username,
              email,
              phoneNumber,
              profilePicture,
              isVerified,
              categories,
              onboardingDate,
              postId,
              replyId: value,
            };
            const result = onChange(modelFields);
            value = result?.replyId ?? value;
          }
          if (errors.replyId?.hasError) {
            runValidationTasks("replyId", value);
          }
          setReplyId(value);
        }}
        onBlur={() => runValidationTasks("replyId", replyId)}
        errorMessage={errors.replyId?.errorMessage}
        hasError={errors.replyId?.hasError}
        {...getOverrideProps(overrides, "replyId")}
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
