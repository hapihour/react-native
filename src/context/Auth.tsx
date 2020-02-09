import React, { useState, useEffect } from "react";
import { User, AlgoliaUser } from "./../types";
import firebase from "firebase";
import {fetchAlgoliaUser} from "../actions/users";

interface AuthContextInterface {
  // @ts-ignore
  fetchToken: () => Promise.resolve<string>;
  setFirebaseUser: (firebaseUser: firebase.User) => void;
  user: User,
  firebaseUser: firebase.User | undefined,
  algoliaUser: AlgoliaUser | undefined,
  refreshAlgoliaUser: () => void;
  setAlgoliaUser: (algoliaUser: AlgoliaUser) => void;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  fetchToken: () => Promise.resolve(""),
  setFirebaseUser: (_firebaseUser: firebase.User) => {},
  user: undefined,
  firebaseUser: undefined,
  algoliaUser: undefined,
  refreshAlgoliaUser: () => {},
  setAlgoliaUser: (_algoliaUser: AlgoliaUser) => {}
});


export const Auth: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | undefined>(undefined);
  const [algoliaUser, setAlgoliaUser] = useState<AlgoliaUser | undefined>(undefined);

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
        photoUrl: `${providerData.photoURL}`
      });
    } else {
      setUser(undefined);
    }
  }, [firebaseUser])

  useEffect(() => {
    refreshAlgoliaUser();
  }, [user]);

  const refreshAlgoliaUser = async () => {
    if (user) {
      const algliaUserToSet = await fetchAlgoliaUser(user.uid);

      if (algliaUserToSet) {
        setAlgoliaUser(algliaUserToSet);
      } else {
        setAlgoliaUser({
          id: user.uid,
          name: user.name,
          photoUrl: user.photoUrl,
          following: [],
          followers: []
        });
      }
    } else {
      setAlgoliaUser(undefined);
    }
  }

  const contextValue = {
    fetchToken,
    setFirebaseUser,
    user,
    firebaseUser,
    algoliaUser,
    refreshAlgoliaUser,
    setAlgoliaUser
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
