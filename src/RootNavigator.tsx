import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { DrawerContent } from "./components/DrawerContent";
import { StackNavigator } from "./stack";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {setUserPushToken} from "./actions/auth";
import {AuthContext} from "./context/Auth";

const Drawer = createDrawerNavigator();

export const RootNavigator = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  const { fetchToken } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (status !== 'granted') {
        return;
      }

      const pushToken = await Notifications.getExpoPushTokenAsync();
      await setUserPushToken(await fetchToken(), pushToken);
    })();
  }, []);


  return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
