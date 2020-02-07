export interface User {
  uid: string, // Firebase ID
  facebookId: string,
  firstName: string,
  lastName: string,
  email: string,
  photoUrl: string
}

export interface TokenManager {
  apiKey: string,
  refreshToken: string,
  accessToken: string,
  expirationTime: number
}
