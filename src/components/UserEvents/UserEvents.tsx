import React, { useState, useEffect } from "react";
import { useTheme, Text } from "react-native-paper";
import { View, FlatList, RefreshControl } from "react-native";
import { FeedItem } from "../../components/FeedItem";
import { fetchAlgoliaEvents } from "../../actions/events";
import { AlgoliaEvent } from "../../types";
import {UserEventItem} from "../UserEventItem";

type UserEventsProps = {
  userId: string;
};

export const UserEvents = ({ userId }: UserEventsProps) => {
  const [algoliaEvents, setAlgoliaEvents] = useState<AlgoliaEvent[]>([]);
  const [page, setPage] = useState<number>(0);
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      const events = await fetchAlgoliaEvents({ page, userId });

      setAlgoliaEvents(events);
    })();
  }, [userId]);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        style={{ backgroundColor: theme.colors.background }}
        data={algoliaEvents}
        renderItem={({ item }) => <UserEventItem algoliaEvent={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    </View>
  );
};
