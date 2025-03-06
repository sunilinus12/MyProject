import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";

function UserItemCard({ item, onPress = () => {} }) {
  const { title = null, id } = item;
  const onPagePress = () => {
    onPress(id);
  };
  return (
    <Pressable onPress={onPagePress} style={styles.container}>
      {title && (
        <Text style={styles.text}>
          {id}: {title}
        </Text>
      )}
    </Pressable>
  );
}
export default memo(UserItemCard);
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: "lightgreen",
    marginBottom: 5,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text:{
    textTransform:"capitalize"
  }
});
