export interface User {
  uid: string, // Firebase ID
  facebookId: string,
  name: string,
  email: string,
  photoUrl: string
}

export type RootStackParamList = {
  Home: { };
};
