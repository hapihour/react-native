import { LocationData } from "expo-location";
import { googleConfig } from "../config";
import {
  Place,
  NearbySearchResult,
  FindPlaceFromTextSearchResult
} from "../types";

export const searchForPubs = async (
  query: string,
  location?: LocationData
): Promise<Place[]> => {
  if (!query.length) {
    return [];
  }

  if (location) {
    return await searchForPubsWithLocation(query, location);
  } else {
    return await searchForPubsWithoutLocation(query);
  }
};

export const getPhotoUrl = (photoReference?: string): string => {
  const { apiKey } = googleConfig;
  if (photoReference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  } else {
    return "https://images.unsplash.com/photo-1546622891-02c72c1537b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=400&q=80";
  }
};

const searchForPubsWithoutLocation = async (
  query: string
): Promise<Place[]> => {
  const { apiKey } = googleConfig;
  const fields = "formatted_address,place_id,name,geometry,photo";
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=${fields}&key=${apiKey}`;

  const { candidates } = await (await fetch(url)).json();
  return candidates.map(convertFindPlaceFromTextToPlace);
};

const searchForPubsWithLocation = async (
  query: string,
  location: LocationData
): Promise<Place[]> => {
  const { apiKey } = googleConfig;
  const locationText = `${location.coords.latitude},${location.coords.longitude}`;
  const radiusMeters = "1000";
  const placeType = "bar";
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationText}&radius=${radiusMeters}&type=${placeType}&keyword=${query}&key=${apiKey}`;

  const { results } = await (await fetch(url)).json();
  return results.map(convertNearbySearchResultToPlace);
};

const convertFindPlaceFromTextToPlace = (
  result: FindPlaceFromTextSearchResult
): Place => {
  const photoReference = ((result.photos || [])[0] || {}).photo_reference;

  return {
    placeId: result.place_id,
    name: result.name,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
    photoReference,
    address: result.formatted_address.split(",")[0]
  };
};

const convertNearbySearchResultToPlace = (
  result: NearbySearchResult
): Place => {
  const photoReference = ((result.photos || [])[0] || {}).photo_reference;

  return {
    placeId: result.place_id,
    name: result.name,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
    photoReference,
    address: result.vicinity,
    priceLevel: result.price_level,
    rating: result.rating,
    userRatingsTotal: result.user_ratings_total
  };
};
