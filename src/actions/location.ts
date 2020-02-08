import { LocationData } from "expo-location";
import { googleConfig } from "../config";
import { Place, NearbySearchResult, FindPlaceFromTextSearchResult } from "../types";

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

const searchForPubsWithoutLocation = async (query: string): Promise<Place[]> => {
  const { apiKey } = googleConfig;
  const fields = "formatted_address,place_id,name,geometry,photo";
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=${fields}&key=${apiKey}`;

  const { candidates } = await((await fetch(url)).json())
  return candidates.map(convertFindPlaceFromTextToPlace);
}

const searchForPubsWithLocation = async (query: string, location: LocationData): Promise<Place[]> => {
  const { apiKey } = googleConfig;
  const locationText = `${location.coords.latitude},${location.coords.longitude}`;
  const radiusMeters = '1000';
  const placeType = 'bar'
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationText}&radius=${radiusMeters}&type=${placeType}&keyword=${query}&key=${apiKey}`;

  const { results } = await((await fetch(url)).json())
  return results.map(convertNearbySearchResultToPlace);
}

const convertFindPlaceFromTextToPlace = (result: FindPlaceFromTextSearchResult): Place => {
  const photoReference = ((result.photos || [])[0] || {}).photo_reference;

  return {
    placeId: result.place_id,
    name: result.name,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
    photoReference,
    address: result.formatted_address.split(',')[0],
  }
}

const convertNearbySearchResultToPlace = (result: NearbySearchResult): Place => {
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
  }
}
