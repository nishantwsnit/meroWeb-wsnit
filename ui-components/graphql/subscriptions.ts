/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
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
export const onCreateDirectory = /* GraphQL */ `
  subscription OnCreateDirectory(
    $filter: ModelSubscriptionDirectoryFilterInput
  ) {
    onCreateDirectory(filter: $filter) {
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
export const onCreateDirectoryListing = /* GraphQL */ `
  subscription OnCreateDirectoryListing(
    $filter: ModelSubscriptionDirectoryListingFilterInput
  ) {
    onCreateDirectoryListing(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply($filter: ModelSubscriptionReplyFilterInput) {
    onCreateReply(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
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
export const onDeleteDirectory = /* GraphQL */ `
  subscription OnDeleteDirectory(
    $filter: ModelSubscriptionDirectoryFilterInput
  ) {
    onDeleteDirectory(filter: $filter) {
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
export const onDeleteDirectoryListing = /* GraphQL */ `
  subscription OnDeleteDirectoryListing(
    $filter: ModelSubscriptionDirectoryListingFilterInput
  ) {
    onDeleteDirectoryListing(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply($filter: ModelSubscriptionReplyFilterInput) {
    onDeleteReply(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
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
export const onUpdateDirectory = /* GraphQL */ `
  subscription OnUpdateDirectory(
    $filter: ModelSubscriptionDirectoryFilterInput
  ) {
    onUpdateDirectory(filter: $filter) {
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
export const onUpdateDirectoryListing = /* GraphQL */ `
  subscription OnUpdateDirectoryListing(
    $filter: ModelSubscriptionDirectoryListingFilterInput
  ) {
    onUpdateDirectoryListing(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply($filter: ModelSubscriptionReplyFilterInput) {
    onUpdateReply(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
