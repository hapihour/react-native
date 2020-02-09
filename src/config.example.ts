type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

type GoogleConfig = {
  apiKey: string;
};

type ApiConfig = {
  apiHost: string;
};

type AlgoliaConfig = {
  appId: string;
  clientApiKey: string;
  userIndex: string;
  eventsIndex: string;
};

export const firebaseConfig: FirebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const googleConfig: GoogleConfig = {
  apiKey: ""
};

export const apiConfig: ApiConfig = {
  apiHost: ""
};

export const algoliaConfig: AlgoliaConfig = {
  appId: "",
  clientApiKey: "",
  userIndex: "",
  eventsIndex: ""
};
