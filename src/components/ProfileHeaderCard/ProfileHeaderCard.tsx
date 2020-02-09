import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text, Card, Title, Subheading, Caption, Paragraph, Surface } from "react-native-paper";
import { getPhotoUrl } from "../../actions/location";
import { useTheme } from "@react-navigation/native";

type Props = {
  name: string;
  photoUrl: string;
};

export const ProfileHeaderCard = (props: Props) => {
  const theme = useTheme();
  return (
    <Surface
      style={{ ...styles.container, elevation: 4 }}
    >
      <View style={styles.topRow}>
        <Avatar.Image
          source={{ uri: props.photoUrl }}
          size={80}
          style={styles.avatar}
        />
        <Title style={styles.name}>{props.name}</Title>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.section}>
          <Paragraph style={styles.paragraph}>202</Paragraph>
          <Caption>Following</Caption>
        </View>
        <View style={styles.section}>
          <Paragraph style={styles.paragraph}>159</Paragraph>
          <Caption>Followers</Caption>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    margin: 30,
    padding: 20
  },
  topRow: {
    alignItems: "center",
    width: '100%',
    marginBottom: 30
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30
  },
  name: {
    marginTop: 40,
  },
  avatar: {
    top: -60,
    position: 'absolute',
    marginBottom: 10
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3
  },
  section: {
    alignItems: "center"
  },
});
