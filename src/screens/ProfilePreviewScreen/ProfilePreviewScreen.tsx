import React, { useEffect, useState } from "react";
import { UserEvents } from "../../components/UserEvents";
import { RootStackParamList, AlgoliaUser } from "../../types";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";
import { ProfileHeaderCard } from "../../components/ProfileHeaderCard";
import { fetchAlgoliaUser } from "../../actions/users";

type Props = {
  route: RouteProp<RootStackParamList, "ProfilePreview">;
};

export const ProfilePreviewScreen = ({ route }: Props) => {
  const { userId } = route.params;
  const [user, setUser] = useState<AlgoliaUser | undefined>(undefined);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        setUser(await fetchAlgoliaUser(userId));
      })();
    }, [])
  );

  if (user) {
    return (
      <View>
        <ProfileHeaderCard
          name={user.name}
          photoUrl={`${user.photoUrl}?height=200`}
          following={user.following.length}
          followers={user.followers.length}
        />
        <UserEvents userId={userId} />
      </View>
    );
  } else {
    return null;
  }
};
