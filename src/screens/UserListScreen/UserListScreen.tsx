import React, { useContext, useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import { AlgoliaUser, RootStackParamList } from "../../types";
import { fetchAlgoliaUsers, followUser } from "../../actions/users";
import { UserListItem } from "../../components/UserListItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "../../context/Auth";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "UserList">;
};

export const UserListScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const [users, setUsers] = useState<AlgoliaUser[]>([]);
  const { fetchToken, algoliaUser, setAlgoliaUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const newUsers = await fetchAlgoliaUsers();
      setUsers(newUsers);
    })();
  }, []);

  const onUserPreviewHandler = (userId: string) => {
    navigation.push("ProfilePreview", { userId });
  };

  const onUserFollowHandler = async (userIdToFollow: string) => {
    try {
      await followUser(await fetchToken(), userIdToFollow);
      const newFollowing = [...algoliaUser.following, userIdToFollow];

      console.log(newFollowing);
      setAlgoliaUser({...algoliaUser, following: newFollowing});
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        style={{ backgroundColor: theme.colors.background }}
        data={users}
        renderItem={({ item }) => {
          const notCurrentUser = algoliaUser.id !== item.id;
          const isFollowing = algoliaUser.following.indexOf(item.id) >= 0;

          return (
            <UserListItem
              user={item}
              onUserFollow={onUserFollowHandler}
              onUserPreview={onUserPreviewHandler}
              showFollowButton={notCurrentUser && !isFollowing}
              isFollowing={isFollowing}
            />
          );
        }}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
      />
    </View>
  );
};
