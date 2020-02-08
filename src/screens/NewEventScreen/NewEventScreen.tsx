import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { TextInput, List, Text } from "react-native-paper";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import useDebouncedEffect  from 'use-debounced-effect';

export const NewEventScreen = () => {
  const [locationText, setLocationText] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<Location.LocationData | undefined>(undefined);

  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      const newCurrentLocation = await Location.getCurrentPositionAsync({});
      console.log(newCurrentLocation);

      setCurrentLocation(newCurrentLocation);
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  useDebouncedEffect(()=>{
    setLocationText(locationInput);
  }, 500 ,[locationInput]);

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <TextInput
        label="Location"
        value={locationInput}
        onChangeText={(text) => setLocationInput(text)}
      />

      <Text>{locationText}</Text>

      <View>
        <List.Item
          title="First Item"
          description="Item description"
        />

        <List.Item
          title="First Item"
          description="Item description"
        />
      </View>
    </View>
  );
};
