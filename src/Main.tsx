import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth";
import { RootNavigator } from "./RootNavigator";
import { LoginScreen } from "./screens/LoginScreen";
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
  Theme
} from "react-native-paper";
import firebase from "firebase";
import { Preferences, PreferencesContext } from "./context/Preferences";

export const Main = () => {
  const { setFirebaseUser, firebaseUser } = useContext(AuthContext);
  const { theme } = useContext(PreferencesContext);

  let paperProviderTheme: Theme;

  if (theme === "light") {
    paperProviderTheme = {
      ...DefaultTheme,
      colors: { ...DefaultTheme.colors, primary: "#1ba1f2" }
    };
  } else {
    paperProviderTheme = {
      ...DarkTheme,
      colors: { ...DarkTheme.colors, primary: "#1ba1f2" }
    };
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user?: firebase.User) => {
      if (user) {
        // Helpful for debugging API calls
        const token = await firebase.auth().currentUser.getIdToken();
        console.log(token);

        setFirebaseUser(user);
      } else {
        setFirebaseUser(undefined);
      }
    });
  }, []);

  const isLoggedIn = !!firebaseUser;

  return isLoggedIn ? (
    <Preferences>
      <PaperProvider theme={paperProviderTheme}>
        <RootNavigator />
      </PaperProvider>
    </Preferences>
  ) : (
    <LoginScreen />
  );
};
