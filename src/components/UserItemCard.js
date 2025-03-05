import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function UserItemCard({ item }) {
  const { title = null, id } = item;
  return (
    <View style={styles.container}>
      {title && (
        <Text>
          {id}: {title}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: "lightgreen",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
