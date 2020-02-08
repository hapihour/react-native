import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Portal, FAB, useTheme } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { HomeScreen } from "./screens/HomeScreen";
import overlay from "./overlay";

const Tab = createMaterialBottomTabNavigator();

type BottomTabsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FeedList"
>;

type Props = {
  navigation: BottomTabsNavigationProp;
};

export const BottomTabs = (props: Props) => {
  const theme = useTheme();

  // Get a name of current screen
  const routeName = props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : "Feed";

  const tabBarColor = theme.dark
    ? (overlay()(6, theme.colors.surface) as string)
    : theme.colors.surface;

  const isFocused = useIsFocused();

  let icon = "feather";

  switch (routeName) {
    case "Messages":
      icon = "email-plus-outline";
      break;
    default:
      icon = "feather";
      break;
  }

  return (
    <React.Fragment>
      <Tab.Navigator initialRouteName="Feed" shifting={true}>
        <Tab.Screen
          name="Feed"
          component={HomeScreen}
          options={{
            tabBarIcon: "home-account",
            tabBarColor
          }}
        />
        <Tab.Screen
          name="Feed2"
          component={HomeScreen}
          options={{
            tabBarIcon: "home-account",
            tabBarColor
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused}
          icon={icon}
          style={{
            position: "absolute",
            bottom: 100,
            right: 16
          }}
          color="white"
        />
      </Portal>
    </React.Fragment>
  );
};
