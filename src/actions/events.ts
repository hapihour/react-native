import { apiConfig, algoliaConfig } from "../config";
import { buildHeaders } from "./helper";
import { Event, AlgoliaEvent } from "../types";
import algoliasearch, { SearchIndex } from "algoliasearch/lite";

const { apiHost } = apiConfig;

export const createEvent = async (
  token: string,
  placeId: string
): Promise<Event> => {
  const res = await fetch(`${apiHost}/events`, {
    headers: buildHeaders(token),
    method: "POST",
    body: JSON.stringify({
      placeId
    })
  });

  if (res.ok) {
    return (await res.json()).body;
  } else {
    throw new Error("Error!");
  }
};

export const fetchAlgoliaEvents = async ({
  userId,
  page
}: {
  userId?: string;
  page: number;
}): Promise<AlgoliaEvent[]> => {
  const index = getAlgoliaEventsIndex();

  const options = {
    hitsPerPage: 20,
    page
  }

  if (userId) {
    options['filters'] = `userId:${userId}`
  }

  return (await index.search<AlgoliaEvent>('', options)).hits.map(h => h)
};

const getAlgoliaEventsIndex = (): SearchIndex => {
  const client = algoliasearch(algoliaConfig.appId, algoliaConfig.clientApiKey);
  return client.initIndex(algoliaConfig.eventsIndex);
};
