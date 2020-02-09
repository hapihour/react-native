import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Surface, Title, Avatar, Badge, useTheme } from "react-native-paper";
import { AlgoliaUser } from "../../types";

interface Props {
  user: AlgoliaUser;
  onUserPreview: (userId: string) => void;
  onUserFollow: (userId: string) => void;
  showFollowButton: boolean;
  isFollowing: boolean;
}

export const UserListItem = ({
  user,
  onUserPreview,
  onUserFollow,
  showFollowButton,
  isFollowing
}: Props) => {
  const theme = useTheme();

  return (
    <Surface style={styles.container}>
      <View style={styles.leftColumn}>
        <TouchableOpacity onPress={() => onUserPreview(user.id)}>
          <Avatar.Image
            source={{ uri: `${user.photoUrl}?height=100` }}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => onUserPreview(user.id)}>
            <Title style={styles.name}>{user.name}</Title>
          </TouchableOpacity>

          {showFollowButton && (
            <TouchableOpacity onPress={() => onUserFollow(user.id)}>
              <Badge
                visible={true}
                style={{
                  ...styles.badge,
                  backgroundColor: theme.colors.primary,
                  color: "white"
                }}
              >
                follow
              </Badge>
            </TouchableOpacity>
          )}

          {isFollowing && (
            <Badge
              visible={true}
              style={{
                ...styles.badge,
                backgroundColor: 'grey',
                color: "white"
              }}
            >
              following
            </Badge>
          )}
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10
  },
  leftColumn: {
    width: 30,
    alignItems: "center",
    marginRight: 10
  },
  rightColumn: {
    flex: 1
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  badge: {
    marginBottom: 5,
    width: 50
  },
  name: {
    marginRight: 5
  }
});
