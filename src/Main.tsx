import React, { useContext, useEffect, useState } from "react";
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
import { PreferencesContext } from "./context/Preferences";

export const Main = () => {
  const { setFirebaseUser, firebaseUser } = useContext(AuthContext);
  const { isDark } = useContext(PreferencesContext);
  const [paperProviderTheme, setPaperProviderTheme] = useState<Theme>(DefaultTheme);

  useEffect(() => {
    if (isDark) {
      setPaperProviderTheme({
        ...DarkTheme,
        colors: { ...DarkTheme.colors, primary: "#1ba1f2", accent: '#ffc107' }
      })
    } else {
      setPaperProviderTheme({
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, primary: "#1ba1f2", accent: '#ffc107' } 
      })
    }
  }, [isDark])

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
    <PaperProvider theme={paperProviderTheme}>
      <RootNavigator />
    </PaperProvider>
  ) : (
    <LoginScreen />
  );
};
