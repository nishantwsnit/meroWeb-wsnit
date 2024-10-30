/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategory = /* GraphQL */ `
  query GetCategory($categoryId: ID!) {
    getCategory(categoryId: $categoryId) {
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
export const getDirectory = /* GraphQL */ `
  query GetDirectory($id: ID!) {
    getDirectory(id: $id) {
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
export const getDirectoryListing = /* GraphQL */ `
  query GetDirectoryListing($id: ID!) {
    getDirectoryListing(id: $id) {
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
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const getReply = /* GraphQL */ `
  query GetReply($id: ID!) {
    getReply(id: $id) {
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
export const getUser = /* GraphQL */ `
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
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
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $categoryId: ID
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCategories(
      categoryId: $categoryId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listDirectories = /* GraphQL */ `
  query ListDirectories(
    $filter: ModelDirectoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listDirectoryListingByDirectoryId = /* GraphQL */ `
  query ListDirectoryListingByDirectoryId(
    $directoryId: ID!
    $filter: ModelDirectoryListingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDirectoryListingByDirectoryId(
      directoryId: $directoryId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        address
        companyImage
        createdAt
        description
        directoryId
        id
        images
        phoneNumbers
        title
        updatedAt
        url
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listDirectoryListings = /* GraphQL */ `
  query ListDirectoryListings(
    $filter: ModelDirectoryListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDirectoryListings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        address
        companyImage
        createdAt
        description
        directoryId
        id
        images
        phoneNumbers
        title
        updatedAt
        url
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPostByCategoryId = /* GraphQL */ `
  query ListPostByCategoryId(
    $categoryId: ID!
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPostByCategoryId(
      categoryId: $categoryId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        categoryId
        content
        createdAt
        id
        likes
        replyCount
        updatedAt
        userId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        categoryId
        content
        createdAt
        id
        likes
        replyCount
        updatedAt
        userId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listReplies = /* GraphQL */ `
  query ListReplies(
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        postId
        replyText
        updatedAt
        userId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listReplyByPostId = /* GraphQL */ `
  query ListReplyByPostId(
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
    $postId: ID!
    $sortDirection: ModelSortDirection
  ) {
    listReplyByPostId(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      postId: $postId
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        id
        postId
        replyText
        updatedAt
        userId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
    $userId: ID
  ) {
    listUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
      userId: $userId
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
