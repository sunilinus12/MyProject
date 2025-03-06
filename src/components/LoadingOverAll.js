import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

export default function LoadingOverAll({ withBackdrop = false }) {
  return (
    <View style={[styles.container, withBackdrop && styles.overlay]}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // ✅ Only applied if `withBackdrop` is true
  },
  loaderBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
