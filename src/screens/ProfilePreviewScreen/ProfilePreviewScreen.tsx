import React, { useEffect, useState } from "react";
import { UserEvents } from "../../components/UserEvents";
import { RootStackParamList, User } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { View } from "react-native";
import { ProfileHeaderCard } from "../../components/ProfileHeaderCard";
import { fetchAlgoliaUser } from "../../actions/users";

type Props = {
  route: RouteProp<RootStackParamList, "ProfilePreview">;
};

export const ProfilePreviewScreen = ({ route }: Props) => {
  const { userId } = route.params;
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setUser(await fetchAlgoliaUser(userId));
    })();
  }, [userId]);

  if (user) {
    return (
      <View>
        <ProfileHeaderCard name={user.name} photoUrl={`${user.photoUrl}?height=200`} />
        <UserEvents userId={userId} />
      </View>
    );
  } else {
    return null;
  }
};
