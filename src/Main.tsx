import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth";
import { RootNavigator } from "./RootNavigator";
import { LoginScreen } from "./screens/LoginScreen";
import firebase from "firebase";

export const Main = () => {
  const { setFirebaseUser, firebaseUser } = useContext(AuthContext);

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
  return isLoggedIn ? <RootNavigator /> : <LoginScreen />;
};
