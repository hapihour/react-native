import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { UserEvents } from "../../components/UserEvents";
import { ProfileHeaderCard } from "../../components/ProfileHeaderCard";
import { View } from "react-native";

export const ProfileScreen = () => {
  const { algoliaUser } = useContext(AuthContext);

  if (algoliaUser) {
    return (
      <View>
        <ProfileHeaderCard
          name={algoliaUser.name}
          photoUrl={`${algoliaUser.photoUrl}?height=200`}
          following={algoliaUser.following.length}
          followers={algoliaUser.followers.length}
        />
        <UserEvents userId={algoliaUser.id} />
      </View>
    );
  } else {
    return null;
  }
};
