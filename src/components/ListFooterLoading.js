import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ListFooterLoading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"green"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});
