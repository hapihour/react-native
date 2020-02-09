import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import { View, FlatList, RefreshControl } from "react-native";
import { FeedItem } from "../../components/FeedItem";
import { fetchAlgoliaEvents } from "../../actions/events";
import { AlgoliaEvent } from "../../types";

type UserEventsProps = {
  userId: string;
};

export const UserEvents = ({ userId }: UserEventsProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [algoliaEvents, setAlgoliaEvents] = useState<AlgoliaEvent[]>([]);
  const [page, setPage] = useState<number>(0);
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      console.log("refetching");
      const events = await fetchAlgoliaEvents({ page, userId });

      console.log(`events ${events.length}, userId: ${userId}, page: ${page}`);
      setAlgoliaEvents(events);
    })();
  }, []);

  useEffect(() => {
    setRefreshing(false);
  }, [algoliaEvents]);

  const onRefreshHandler = async () => {
    setRefreshing(true);
    const newAlgoliaEvents = await fetchAlgoliaEvents({ page: 0, userId });
    setAlgoliaEvents(newAlgoliaEvents);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        style={{ backgroundColor: theme.colors.background }}
        data={algoliaEvents}
        renderItem={({ item }) => {
          return <FeedItem algoliaEvent={item} onPress={() => {}} />;
        }}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshHandler}
          />
        }
      />
    </View>
  );
};
