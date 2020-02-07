import React, { useState, useEffect } from "react";
import {validateToken} from "../actions/auth";

interface AuthContextInterface {
  fetchToken: () => Promise.resolve<string>;
  isLoggedIn: boolean;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  fetchToken: () => Promise.resolve(""),
  isLoggedIn: false
});

export const Auth: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const fetchToken = async () => Promise.resolve(token);

  const fetchInitial = async () => {
    try {
      await validateToken(token)
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    fetchInitial();
  }, [])

  const contextValue = {
    fetchToken,
    isLoggedIn,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
};
