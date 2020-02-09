import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import { View, FlatList, StyleSheet } from "react-native";
import { FeedItem } from "../../components/FeedItem";
import { fetchAlgoliaEvents } from "../../actions/events";
import { AlgoliaEvent } from "../../types";

export const FeedScreen = () => {
  const [algoliaEvents, setAlgoliaEvents] = useState<AlgoliaEvent[]>([]);
  const [page, setPage] = useState<number>(0);

  const feedItemOnPressHandler = (id: string) => {
    alert(id);
  };
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      setAlgoliaEvents(await fetchAlgoliaEvents({ page }))
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        style={{ backgroundColor: theme.colors.background }}
        data={algoliaEvents}
        renderItem={({ item }) => {
          return <FeedItem algoliaEvent={item} onPress={feedItemOnPressHandler} />;
        }}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    </View>
  );
};
