import { Schema } from "@/amplify/data/resource";
import config from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

Amplify.configure(config);

export const useGenerateClient = () => {
  const client = generateClient<Schema>();

  return client;
};

const client = useGenerateClient();

export default client;
