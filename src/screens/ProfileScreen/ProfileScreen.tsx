import React, { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { UserEvents } from "../../components/UserEvents";
import { ProfileHeaderCard } from "../../components/ProfileHeaderCard";
import { List, Text } from "react-native-paper";
import { View } from "react-native";

export const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <View>
      <ProfileHeaderCard name={user.name} photoUrl={user.photoUrl} />
      <UserEvents userId={user.uid} />
    </View>
  );
};
