import { AlgoliaUser } from "../types";
import algoliasearch, { SearchIndex } from "algoliasearch/lite";
import { algoliaConfig, apiConfig } from "../config";
import { buildHeaders } from "./helper";

const { apiHost } = apiConfig;

export const fetchAlgoliaUser = async (
  userId: string
): Promise<AlgoliaUser> => {
  const index = getAlgoliaUserIndex();
  const options = {
    filters: `id:${userId}`
  };

  return (await index.search<AlgoliaUser>("", options)).hits.map(h => h)[0];
};

export const fetchAlgoliaUsers = async (): Promise<AlgoliaUser[]> => {
  const index = getAlgoliaUserIndex();

  return (await index.search<AlgoliaUser>("")).hits.map(h => h);
};

export const followUser = async (
  token: string,
  userIdToFollow: string
): Promise<void> => {
  const res = await fetch(`${apiHost}/follow`, {
    headers: buildHeaders(token),
    method: "POST",
    body: JSON.stringify({
      userIdToFollow
    })
  });

  if (!res.ok) {
    throw new Error("Cannot follow user");
  }
};

const getAlgoliaUserIndex = (): SearchIndex => {
  const client = algoliasearch(algoliaConfig.appId, algoliaConfig.clientApiKey);
  return client.initIndex(algoliaConfig.userIndex);
};
