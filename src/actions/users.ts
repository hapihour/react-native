import {User} from "../types";
import algoliasearch, {SearchIndex} from "algoliasearch/lite";
import {algoliaConfig} from "../config";

export const fetchAlgoliaUser = async (userId: string): Promise<User> => {
  const index = getAlgoliaUserIndex();
  const options = {
    filters: `id:${userId}`
  }

  return (await index.search<User>('', options)).hits.map(h => h)[0]
}

const getAlgoliaUserIndex = (): SearchIndex => {
  const client = algoliasearch(algoliaConfig.appId, algoliaConfig.clientApiKey);
  return client.initIndex(algoliaConfig.userIndex);
};
