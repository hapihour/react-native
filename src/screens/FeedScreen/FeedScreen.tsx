import React from "react";
import { useTheme } from "react-native-paper";
import { View, FlatList, StyleSheet } from "react-native";
import { FeedItem } from "../../components/FeedItem";

export const FeedScreen = () => {
  const feedItemOnPressHandler = (id: string) => { alert(id) };
  const imageUrl = "https://scontent.fsyd5-1.fna.fbcdn.net/v/t1.0-1/p320x320/46444409_10161045642955228_8461708287543345152_o.jpg?_nc_cat=100&_nc_ohc=4fTagFWlaY0AX9OWGTj&_nc_ht=scontent.fsyd5-1.fna&_nc_tp=6&oh=c9a15e8196ba8a7c3a2bff24084f7aea&oe=5EC00863";
  const theme = useTheme();

  const data = [
    { id: '1', avatar: imageUrl, name: "Janine", handle: "@janine", date: "2020-01-03", content: "Hello", onPress: feedItemOnPressHandler },
    { id: '2', avatar: imageUrl, name: "Janine", handle: "@janine", date: "2020-01-03", content: "Hello", onPress: feedItemOnPressHandler },
    { id: '3', avatar: imageUrl, name: "Janine", handle: "@janine", date: "2020-01-03", content: "Hello", onPress: feedItemOnPressHandler },
  ]


  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        style={{ backgroundColor: theme.colors.background }}
        data={data}
        renderItem={({ item }) => {
          return <FeedItem {...item} />
        }}
        keyExtractor={(item) => item.id.toString() }
        ItemSeparatorComponent={() => (
          <View style={{ height: 5 }} />
        )}
      />
    </View>
  );
};
