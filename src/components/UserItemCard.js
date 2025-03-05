import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";

 function UserItemCard({ item, onPress = () => {} }) {
  const { title = null, id } = item;
  const navigation = useNavigation();
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {title && (
        <Text>
          {id}: {title}
        </Text>
      )}
    </Pressable>
  );
}
export default memo(UserItemCard)
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
