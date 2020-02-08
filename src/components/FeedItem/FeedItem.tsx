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

interface FeedProps {
  id: string,
  avatar: string,
  name: string;
  handle: string;
  date: string;
  content: string;
  onPress: (id: string) => void;
}

export const FeedItem = (props: FeedProps) => {
  const theme = useTheme();

  const contentColor = color(theme.colors.text)
    .alpha(0.8)
    .rgb()
    .string();

  return (
    <TouchableRipple onPress={() => props.onPress(props.id)}>
      <Surface style={styles.container}>
        <View style={styles.leftColumn}>
          <Avatar.Image source={{ uri: props.avatar }} size={60} />
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.topRow}>
            <Title style={styles.name}>{props.name}</Title>
            <Caption style={styles.handle}>{props.handle}</Caption>
            <Caption>{props.date}</Caption>
          </View>
          <Text style={{ color: contentColor }}>{props.content}</Text>
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
