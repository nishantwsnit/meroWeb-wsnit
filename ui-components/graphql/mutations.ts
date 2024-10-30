/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $condition: ModelCategoryConditionInput
    $input: CreateCategoryInput!
  ) {
    createCategory(condition: $condition, input: $input) {
      categoryId
      createdAt
      description
      iconName
      iconType
      isLocationBased
      name
      updatedAt
      __typename
    }
  }
`;
export const createDirectory = /* GraphQL */ `
  mutation CreateDirectory(
    $condition: ModelDirectoryConditionInput
    $input: CreateDirectoryInput!
  ) {
    createDirectory(condition: $condition, input: $input) {
      createdAt
      id
      imageUrl
      isSubDirectory
      parentDirectoryId
      subTitle
      title
      updatedAt
      __typename
    }
  }
`;
export const createDirectoryListing = /* GraphQL */ `
  mutation CreateDirectoryListing(
    $condition: ModelDirectoryListingConditionInput
    $input: CreateDirectoryListingInput!
  ) {
    createDirectoryListing(condition: $condition, input: $input) {
      address
      companyImage
      createdAt
      description
      directoryId
      id
      images
      phoneNumbers
      socialMedia {
        facebook
        instagram
        twitter
        __typename
      }
      title
      updatedAt
      url
      __typename
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $condition: ModelPostConditionInput
    $input: CreatePostInput!
  ) {
    createPost(condition: $condition, input: $input) {
      categoryId
      content
      createdAt
      id
      likes
      location {
        city
        state
        zipcode
        __typename
      }
      replyCount
      updatedAt
      user {
        categories
        createdAt
        email
        isVerified
        name
        onboardingDate
        phoneNumber
        postId
        profilePicture
        replyId
        updatedAt
        userId
        username
        __typename
      }
      userId
      __typename
    }
  }
`;
export const createReply = /* GraphQL */ `
  mutation CreateReply(
    $condition: ModelReplyConditionInput
    $input: CreateReplyInput!
  ) {
    createReply(condition: $condition, input: $input) {
      createdAt
      id
      postId
      replyText
      updatedAt
      user {
        categories
        createdAt
        email
        isVerified
        name
        onboardingDate
        phoneNumber
        postId
        profilePicture
        replyId
        updatedAt
        userId
        username
        __typename
      }
      userId
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $condition: ModelUserConditionInput
    $input: CreateUserInput!
  ) {
    createUser(condition: $condition, input: $input) {
      address {
        city
        state
        street
        zipcode
        __typename
      }
      categories
      createdAt
      email
      isVerified
      name
      onboardingDate
      phoneNumber
      postId
      posts {
        nextToken
        __typename
      }
      profilePicture
      replies {
        nextToken
        __typename
      }
      replyId
      updatedAt
      userId
      username
      __typename
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $condition: ModelCategoryConditionInput
    $input: DeleteCategoryInput!
  ) {
    deleteCategory(condition: $condition, input: $input) {
      categoryId
      createdAt
      description
      iconName
      iconType
      isLocationBased
      name
      updatedAt
      __typename
    }
  }
`;
export const deleteDirectory = /* GraphQL */ `
  mutation DeleteDirectory(
    $condition: ModelDirectoryConditionInput
    $input: DeleteDirectoryInput!
  ) {
    deleteDirectory(condition: $condition, input: $input) {
      createdAt
      id
      imageUrl
      isSubDirectory
      parentDirectoryId
      subTitle
      title
      updatedAt
      __typename
    }
  }
`;
export const deleteDirectoryListing = /* GraphQL */ `
  mutation DeleteDirectoryListing(
    $condition: ModelDirectoryListingConditionInput
    $input: DeleteDirectoryListingInput!
  ) {
    deleteDirectoryListing(condition: $condition, input: $input) {
      address
      companyImage
      createdAt
      description
      directoryId
      id
      images
      phoneNumbers
      socialMedia {
        facebook
        instagram
        twitter
        __typename
      }
      title
      updatedAt
      url
      __typename
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $condition: ModelPostConditionInput
    $input: DeletePostInput!
  ) {
    deletePost(condition: $condition, input: $input) {
      categoryId
      content
      createdAt
      id
      likes
      location {
        city
        state
        zipcode
        __typename
      }
      replyCount
      updatedAt
      user {
        categories
        createdAt
        email
        isVerified
        name
        onboardingDate
        phoneNumber
        postId
        profilePicture
        replyId
        updatedAt
        userId
        username
        __typename
      }
      userId
      __typename
    }
  }
`;
export const deleteReply = /* GraphQL */ `
  mutation DeleteReply(
    $condition: ModelReplyConditionInput
    $input: DeleteReplyInput!
  ) {
    deleteReply(condition: $condition, input: $input) {
      createdAt
      id
      postId
      replyText
      updatedAt
      user {
        categories
        createdAt
        email
        isVerified
        name
        onboardingDate
        phoneNumber
        postId
        profilePicture
        replyId
        updatedAt
        userId
        username
        __typename
      }
      userId
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $condition: ModelUserConditionInput
    $input: DeleteUserInput!
  ) {
    deleteUser(condition: $condition, input: $input) {
      address {
        city
        state
        street
        zipcode
        __typename
      }
      categories
      createdAt
      email
      isVerified
      name
      onboardingDate
      phoneNumber
      postId
      posts {
        nextToken
        __typename
      }
      profilePicture
      replies {
        nextToken
        __typename
      }
      replyId
      updatedAt
      userId
      username
      __typename
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $condition: ModelCategoryConditionInput
    $input: UpdateCategoryInput!
  ) {
    updateCategory(condition: $condition, input: $input) {
      categoryId
      createdAt
      description
      iconName
      iconType
      isLocationBased
      name
      updatedAt
      __typename
    }
  }
`;
export const updateDirectory = /* GraphQL */ `
  mutation UpdateDirectory(
    $condition: ModelDirectoryConditionInput
    $input: UpdateDirectoryInput!
  ) {
    updateDirectory(condition: $condition, input: $input) {
      createdAt
      id
      imageUrl
      isSubDirectory
      parentDirectoryId
      subTitle
      title
      updatedAt
      __typename
    }
  }
`;
export const updateDirectoryListing = /* GraphQL */ `
  mutation UpdateDirectoryListing(
    $condition: ModelDirectoryListingConditionInput
    $input: UpdateDirectoryListingInput!
  ) {
    updateDirectoryListing(condition: $condition, input: $input) {
      address
      companyImage
      createdAt
      description
      directoryId
      id
      images
      phoneNumbers
      socialMedia {
        facebook
        instagram
        twitter
        __typename
      }
      title
      updatedAt
      url
      __typename
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $condition: ModelPostConditionInput
    $input: UpdatePostInput!
  ) {
    updatePost(condition: $condition, input: $input) {
      categoryId
      content
      createdAt
      id
      likes
      location {
        city
        state
        zipcode
        __typename
      }
      replyCount
      updatedAt
      user {
        categories
        createdAt
        email
        isVerified
        name
        onboardingDate
        phoneNumber
        postId
        profilePicture
        replyId
        updatedAt
        userId
        username
        __typename
      }
      userId
      __typename
    }
  }
`;
export const updateReply = /* GraphQL */ `
  mutation UpdateReply(
    $condition: ModelReplyConditionInput
    $input: UpdateReplyInput!
  ) {
    updateReply(condition: $condition, input: $input) {
      createdAt
      id
      postId
      replyText
      updatedAt
      user {
        categories
        createdAt
        email
        isVerified
        name
        onboardingDate
        phoneNumber
        postId
        profilePicture
        replyId
        updatedAt
        userId
        username
        __typename
      }
      userId
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $condition: ModelUserConditionInput
    $input: UpdateUserInput!
  ) {
    updateUser(condition: $condition, input: $input) {
      address {
        city
        state
        street
        zipcode
        __typename
      }
      categories
      createdAt
      email
      isVerified
      name
      onboardingDate
      phoneNumber
      postId
      posts {
        nextToken
        __typename
      }
      profilePicture
      replies {
        nextToken
        __typename
      }
      replyId
      updatedAt
      userId
      username
      __typename
    }
  }
`;
