import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';
import { Main } from "./src/Main";
import { Auth } from "./src/context/Auth";
import firebase from "firebase";

import { firebaseConfig } from "./firebaseConfig";
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <Auth>
          <Main />
        </Auth>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
