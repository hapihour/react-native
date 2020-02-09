import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Appbar, Avatar, useTheme } from "react-native-paper";

import { BottomTabs } from "./bottomTabs";
import { RootStackParamList } from "./types";
import { AuthContext } from "./context/Auth";
import {NewEventScreen} from "./screens/NewEventScreen";
import {CheckInScreen} from "./screens/CheckInScreen";
import {ProfilePreviewScreen} from "./screens/ProfilePreviewScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  const theme = useTheme();

  const { algoliaUser } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Appbar.Header
              theme={{ colors: { primary: theme.colors.surface } }}
            >
              {previous ? (
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  color={theme.colors.primary}
                />
              ) : (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => {
                    ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();
                  }}
                >
                  <Avatar.Image
                    size={40}
                    source={{
                      uri: `${algoliaUser.photoUrl}?height=200`
                    }}
                  />
                </TouchableOpacity>
              )}
              <Appbar.Content
                title={title}
                titleStyle={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: theme.colors.primary
                }}
              />
            </Appbar.Header>
          );
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={({ route }) => {
          // console.log("!@# options", { route });
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : "Feed";
          return { headerTitle: routeName };
        }}
      />
      <Stack.Screen
        name="NewEvent"
        component={NewEventScreen}
        options={{ headerTitle: 'Find your pub'}}
      />
      <Stack.Screen
        name="CheckIn"
        component={CheckInScreen}
        options={{ headerTitle: 'Check In' }}
      />
      <Stack.Screen
        name="ProfilePreview"
        component={ProfilePreviewScreen}
        options={{ headerTitle: 'Preview' }}
      />
    </Stack.Navigator>
  );
};
