import React, { useState } from "react";
import { User } from "./../types";
import firebase from "firebase";

const defaultUser: User = {
  uid: "",
  facebookId: "",
  firstName: "",
  lastName: "",
  email: "",
  photoUrl: ""
}

interface AuthContextInterface {
  // @ts-ignore
  fetchToken: () => Promise.resolve<string>;
  setUser: (user: User) => void;
  setFirebaseUser: (firebaseUser: firebase.User) => void;
  user: User,
  firebaseUser: firebase.User | undefined
}

export const AuthContext = React.createContext<AuthContextInterface>({
  fetchToken: () => Promise.resolve(""),
  setUser: (_user: User) => {},
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

  const contextValue = {
    fetchToken,
    setUser,
    setFirebaseUser,
    user,
    firebaseUser
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
