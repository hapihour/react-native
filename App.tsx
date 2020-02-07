import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Main } from "./src/Main";
import { Auth } from "./src/context/Auth";
import firebase from 'firebase';

import { firebaseConfig } from "./firebaseConfig";
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <PaperProvider>
      <Auth>
        <Main />
      </Auth>
    </PaperProvider>
  );
}
