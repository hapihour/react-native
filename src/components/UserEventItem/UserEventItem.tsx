import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Surface,
  Title,
  Caption,
  Text,
  Avatar,
  TouchableRipple,
  useTheme
} from "react-native-paper";
import color from "color";
import { AlgoliaEvent } from "../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface UserEventItemProps {
  algoliaEvent: AlgoliaEvent;
}

export const UserEventItem = ({ algoliaEvent }: UserEventItemProps) => {
  const theme = useTheme();

  const contentColor = color(theme.colors.text)
    .alpha(0.8)
    .rgb()
    .string();

  const formattedCreatedAt = dayjs(algoliaEvent.createdAtTimestamp).fromNow();

  return (
    <Surface style={styles.container}>
      <View style={styles.rightColumn}>
        <View style={styles.topRow}>
          <Title style={styles.name}>{algoliaEvent.placeName}</Title>
          <Caption>{formattedCreatedAt}</Caption>
        </View>
        <Text style={{ color: contentColor }}>{algoliaEvent.vicinity}</Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15
  },
  rightColumn: {
    flex: 1
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  name: {
    marginRight: 5
  },
  handle: {
    marginRight: 5
  },
  dot: {
    fontSize: 3
  }
});
