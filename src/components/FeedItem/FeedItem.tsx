import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Surface,
  Title,
  Caption,
  Text,
  Avatar,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import color from 'color';
import {AlgoliaEvent} from '../../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

interface FeedProps {
  algoliaEvent: AlgoliaEvent,
  onPress: (id: string) => void;
}

export const FeedItem = ({ algoliaEvent, onPress }: FeedProps) => {
  const theme = useTheme();

  const contentColor = color(theme.colors.text)
    .alpha(0.8)
    .rgb()
    .string();

  const formattedCreatedAt = dayjs(algoliaEvent.createdAtTimestamp).fromNow();

  return (
    <TouchableRipple onPress={() => onPress(algoliaEvent.id)}>
      <Surface style={styles.container}>
        <View style={styles.leftColumn}>
          <Avatar.Image source={{ uri: `${algoliaEvent.userPhotoUrl}?height=200` }} size={60} />
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.topRow}>
            <Title style={styles.name}>{algoliaEvent.userName}</Title>
            <Caption>{formattedCreatedAt}</Caption>
          </View>
          <Text style={{ color: contentColor }}>{algoliaEvent.placeName}</Text>
        </View>
      </Surface>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15
  },
  leftColumn: {
    width: 80,
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginRight: 5
  },
  handle: {
    marginRight: 5,
  },
  dot: {
    fontSize: 3,
  },
});
