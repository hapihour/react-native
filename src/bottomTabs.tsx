import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Portal, FAB } from "react-native-paper";
import { useIsFocused, RouteProp } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { FeedScreen } from "./screens/FeedScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen/NotificationsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

const Tab = createMaterialBottomTabNavigator();

type BottomTabsNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type BottomTabsRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: BottomTabsNavigationProp;
  route: BottomTabsRouteProp;
};

export const BottomTabs = (props: Props) => {
  // Get a name of current screen
  const routeName = props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : "Feed";

  const isFocused = useIsFocused();

  return (
    <React.Fragment>
      <Tab.Navigator initialRouteName="Feed" shifting={true}>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: "home-account"
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarIcon: "bell-outline"
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: "account"
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused}
          icon="glass-wine"
          style={{
            position: "absolute",
            bottom: 100,
            right: 16
          }}
          color="white"
          onPress={() => props.navigation.push("NewEvent")}
        />
      </Portal>
    </React.Fragment>
  );
};
