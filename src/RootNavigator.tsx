import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./components/DrawerContent";
import { HomeScreen } from "./screens/HomeScreen";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

const DrawerNavigator = createDrawerNavigator();

export const RootNavigator = (props: any) => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <DrawerNavigator.Navigator drawerContent={() => <DrawerContent {...props}/>}>
        <DrawerNavigator.Screen name="Home" component={HomeScreen} />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
};
