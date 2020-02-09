import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { Card, Button, Text } from "react-native-paper";
import { getPhotoUrl } from "../../actions/location";
import { RouteProp } from "@react-navigation/native";
import { AuthContext } from "../../context/Auth";
import { createEvent } from "../../actions/events";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CheckIn">;
  route: RouteProp<RootStackParamList, "CheckIn">;
};

export const CheckInScreen = ({ navigation, route }: Props) => {
  const { fetchToken } = useContext(AuthContext);
  const { place } = route.params;
  const [isCheckingIn, setIsCheckingIn] = useState<boolean>(false);
  const photoUrl = getPhotoUrl(place.photoReference);
  const checkInOnPressHandler = async () => {
    setIsCheckingIn(true);
    const token = await fetchToken();
    try {
      await createEvent(token, place.placeId);
      navigation.popToTop();
    } catch (e) {
      alert(e.message);
    }
    setIsCheckingIn(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={place.name} />
        <Card.Cover source={{ uri: photoUrl }} />
      </Card>

      <Button mode="contained" onPress={checkInOnPressHandler} loading={isCheckingIn}>
        <Text>Check In</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1
  },
  card: {
    marginBottom: 15
  }
});
