import React, { useContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { RootNavigator } from "./src/RootNavigator";
import { AuthContext } from "./src/context/Auth";
import { LoginScreen } from "./src/screens/LoginScreen/LoginScreen";

export default function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <PaperProvider>
      {isLoggedIn ? <RootNavigator /> : <LoginScreen />}
    </PaperProvider>
  );
}
