import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { TextInput, List, Button } from "react-native-paper";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import useDebouncedEffect from "use-debounced-effect";
import { searchForPubs } from "../../actions/location";
import { Place, RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";

type BottomTabsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "NewEvent"
>;

type Props = {
  navigation: BottomTabsNavigationProp;
};

export const NewEventScreen = (props: Props) => {
  const [locationInput, setLocationInput] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<
    Location.LocationData | undefined
  >(undefined);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === "granted") {
        const newCurrentLocation = await Location.getCurrentPositionAsync({});
        setCurrentLocation(newCurrentLocation);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    setIsSearching(false);
  }, [places]);

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

  const locationInputOnChangeTextHandler = (text) => {
    if (!isSearching) {
      setIsSearching(true);
    }

    setLocationInput(text);
  }

  const placeItemOnPressHandler = (place: Place) => {
    console.log(place);
    props.navigation.push("CheckIn", { place });
  };

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <TextInput
        label="Location"
        value={locationInput}
        onChangeText={locationInputOnChangeTextHandler}
      />

      {isSearching ? (
        <Button loading={true} onPress={() => {}}>
          Searching
        </Button>
      ) : (
        <ScrollView>
          {places.map(p => (
            <List.Item
              key={p.placeId}
              title={p.name}
              description={p.address}
              onPress={() => placeItemOnPressHandler(p)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};
