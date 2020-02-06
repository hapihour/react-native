import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { RootNavigator } from "./src/RootNavigator";

export default function App() {
  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
}
