import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { TextInput, List, Text } from "react-native-paper";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import useDebouncedEffect from "use-debounced-effect";
import { searchForPubs } from "../../actions/location";
import { Place } from "../../types";

export const NewEventScreen = () => {
  const [locationText, setLocationText] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<
    Location.LocationData | undefined
  >(undefined);

  const [places, setPlaces] = useState<Place[]>([]);
  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      const newCurrentLocation = await Location.getCurrentPositionAsync({});
      console.log(newCurrentLocation);

      setCurrentLocation(newCurrentLocation);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useDebouncedEffect(
    () => {
      const runQuery = async () => {
        setPlaces(await searchForPubs(locationInput, currentLocation));
      };

      runQuery();
    },
    500,
    [locationInput]
  );

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <TextInput
        label="Location"
        value={locationInput}
        onChangeText={text => setLocationInput(text)}
      />

      <ScrollView>
        {places.map(p => (
          <List.Item key={p.placeId} title={p.name} description={p.address} />
        ))}
      </ScrollView>
    </View>
  );
};
