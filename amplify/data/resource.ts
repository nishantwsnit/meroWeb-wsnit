import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Users, Categories, Posts database table with a multiple fields.
The authorization rule below specifies that any authenticated user can "create", "read", "update", 
and "delete" any Database table records.
=========================================================================*/
const schema = a.schema({
  User: a
    .model({
      userId: a.id().required(),
      name: a.string().required(),
      username: a.string().required(),
      email: a.string().required(),
      phoneNumber: a.string().required(),
      profilePicture: a.string(),
      isVerified: a.boolean(),
      address: a.customType({
        street: a.string(),
        city: a.string(),
        state: a.string(),
        zipcode: a.string(),
      }),
      categories: a.string().array(),
      onboardingDate: a.float(),
      postId: a.id(),
      posts: a.hasMany("Post", "userId"),
      replyId: a.id(),
      replies: a.hasMany("Reply", "userId"),
    })
    .identifier(["userId"])
    .authorization((allow) => [allow.authenticated("userPools")]),

  Category: a
    .model({
      categoryId: a.id().required(),
      name: a.string().required(),
      iconName: a.string().required(),
      iconType: a.string().required(),
      description: a.string().required(),
      isLocationBased: a.boolean(),
    })
    .identifier(["categoryId"])
    .authorization((allow) => [allow.authenticated("userPools")]),

  Post: a
    .model({
      categoryId: a.id().required(),
      content: a.string().required(),
      location: a.customType({
        city: a.string(),
        state: a.string(),
        zipcode: a.string(),
      }),
      likes: a.integer().required(),
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      replyCount: a.integer().required(),
    })
    .secondaryIndexes((index) => [index("categoryId")])
    .authorization((allow) => [allow.authenticated("userPools")]),

  Reply: a
    .model({
      replyText: a.string().required(),
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      postId: a.id().required(),
    })
    .secondaryIndexes((index) => [index("postId")])
    .authorization((allow) => [allow.authenticated("userPools")]),

  Directory: a
    .model({
      title: a.string().required(),
      subTitle: a.string().required(),
      imageUrl: a.string(),
      isSubDirectory: a.boolean(),
      parentDirectoryId: a.id(),
    })
    .authorization((allow) => [allow.authenticated("userPools")]),

  DirectoryListing: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      address: a.string().required(),
      url: a.string(),
      phoneNumbers: a.string().array(),
      socialMedia: a.customType({
        facebook: a.string(),
        instagram: a.string(),
        twitter: a.string(),
      }),
      companyImage: a.string().required(),
      images: a.string().array(),
      directoryId: a.id().required(),
    })
    .secondaryIndexes((index) => [index("directoryId")])
    .authorization((allow) => [allow.authenticated("userPools")]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
