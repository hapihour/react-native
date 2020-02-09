import React, { useContext } from "react";
import { UserEvents } from "../../components/UserEvents";
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type Props = {
  route: RouteProp<RootStackParamList, "ProfilePreview">;
};

export const ProfilePreviewScreen = ({ route }: Props) => {
  const { userId } = route.params;
  console.log(userId);
  return <UserEvents userId={userId} />;
};
