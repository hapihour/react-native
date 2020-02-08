export interface User {
  uid: string, // Firebase ID
  facebookId: string,
  name: string,
  email: string,
  photoUrl: string
}

export type RootStackParamList = {
  Home: {}
  NewEvent: {}
};

export interface FindPlaceFromTextSearchResult {
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  },
  name: string,
  photos?: {
    photo_reference: string
  }[],
  place_id: string,
  formatted_address: string
}

export interface NearbySearchResult {
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  },
  name: string,
  photos?: {
    photo_reference: string
  }[],
  place_id: string,
  price_level: number,
  rating: number,
  user_ratings_total: number,
  vicinity: string
}

export interface Place {
  placeId: string
  name: string,
  lat: number,
  lng: number,
  address: string,
  photoReference?: string
  priceLevel?: number,
  rating?: number,
  userRatingsTotal?: number
}
