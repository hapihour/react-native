import React, { useContext } from "react";
import { View, StyleSheet, ScrollViewProps } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Button
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/Auth";
import { PreferencesContext } from "../../context/Preferences";
import firebase from "firebase";

declare type DrawerProps = ScrollViewProps & {
  children: React.ReactNode;
};

export const DrawerContent = (props: DrawerProps) => {
  const { algoliaUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(PreferencesContext);
  const signOutOnPressHandler = async () => {
    await firebase.auth().signOut();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: `${algoliaUser.photoUrl}?height=200`
            }}
            size={50}
          />
          <Title style={styles.title}>{algoliaUser.name}</Title>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                {algoliaUser.following.length}
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                {algoliaUser.followers.length}
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={theme === "dark"} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section>
          <TouchableRipple onPress={signOutOnPressHandler}>
            <View style={styles.preference}>
              <Text style={{ color: "red" }}>Sign Out</Text>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSection: {
    paddingLeft: 20
  },
  title: {
    marginTop: 20,
    fontWeight: "bold"
  },
  caption: {
    fontSize: 14,
    lineHeight: 14
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3
  },
  drawerSection: {
    marginTop: 15
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16
  }
});
