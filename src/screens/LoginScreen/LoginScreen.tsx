import React, { useState, useContext } from "react";
import { View, ImageBackground } from "react-native";
import { Button, Snackbar, Text, Colors } from "react-native-paper";
import * as Facebook from "expo-facebook";
import firebase from "firebase";
import Constants from "expo-constants";
import { AuthContext } from "../../context/Auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const LoginScreen = () => {
  const { appId, appName } = Constants.manifest.extra.facebook;
  const [error, setError] = useState<string>("");
  const { setFirebaseUser } = useContext(AuthContext);

  Facebook.initializeAsync(appId, appName);

  const signInWithFacebook = async () => {
    try {
      await signInWithOAuthCredential(await getFirebaseOAuthCredential());
    } catch (e) {
      setError(e.message);
    }
  };

  const signInWithOAuthCredential = async (
    credential: firebase.auth.OAuthCredential
  ) => {
    const { user } = await firebase.auth().signInWithCredential(credential);

    setFirebaseUser(user);
  };

  const getFirebaseOAuthCredential = async (): Promise<firebase.auth.OAuthCredential> => {
    const options = {
      permissions: ["public_profile", "email"]
    };
    // @ts-ignore
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      options
    );

    if (type === "success") {
      return firebase.auth.FacebookAuthProvider.credential(token);
    } else {
      throw new Error("Failed");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/login-screen-bg.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="facebook" color="white" size={20} />
          )}
          mode="contained"
          onPress={signInWithFacebook}
          contentStyle={{ height: 50 }}
          style={{ bottom: -200, backgroundColor: "#4267B2" }}
        >
          <Text style={{ color: "white" }}>Sign In With Facebook</Text>
        </Button>

        <Snackbar visible={!!error.length} onDismiss={() => setError("")}>
          {error}
        </Snackbar>
      </View>
    </ImageBackground>
  );
};
