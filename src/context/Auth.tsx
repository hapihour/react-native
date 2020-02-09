import React, { useState, useEffect } from "react";
import { User } from "./../types";
import firebase from "firebase";

const defaultUser: User = {
  uid: "",
  facebookId: "",
  name: "",
  email: "",
  photoUrl: ""
}

interface AuthContextInterface {
  // @ts-ignore
  fetchToken: () => Promise.resolve<string>;
  setFirebaseUser: (firebaseUser: firebase.User) => void;
  user: User,
  firebaseUser: firebase.User | undefined
}

export const AuthContext = React.createContext<AuthContextInterface>({
  fetchToken: () => Promise.resolve(""),
  setFirebaseUser: (_firebaseUser: firebase.User) => {},
  user: defaultUser,
  firebaseUser: undefined
});


export const Auth: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | undefined>(undefined);

  const fetchToken = async () => {
    if (firebaseUser) {
      return await firebaseUser.getIdToken();
    } else {
      throw new Error('User not initialised');
    }
  }

  useEffect(() => {
    if (firebaseUser && firebaseUser.providerData) {
      const providerData = firebaseUser.providerData[0];
      setUser({
        uid: firebaseUser.uid,
        facebookId: providerData.uid,
        name: providerData.displayName,
        email: providerData.email,
        photoUrl: `${providerData.photoURL}?height=200`
      });
    }
  }, [firebaseUser])

  const contextValue = {
    fetchToken,
    setFirebaseUser,
    user,
    firebaseUser
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
